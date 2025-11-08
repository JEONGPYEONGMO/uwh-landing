// src/firebase/learningService.js
import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc,
  query,
  orderBy,
  increment,
  serverTimestamp 
} from 'firebase/firestore';
import { 
  ref, 
  uploadBytes, 
  getDownloadURL, 
  deleteObject 
} from 'firebase/storage';
import { db, storage } from './config';

const COLLECTION_NAME = 'learningMaterials';

// 파일 업로드 (Firebase Storage)
export const uploadFile = async (file, materialId) => {
  try {
    // 파일명 생성: materialId_timestamp_originalName
    const timestamp = Date.now();
    const fileName = `${materialId}_${timestamp}_${file.name}`;
    const storageRef = ref(storage, `learning-materials/${fileName}`);
    
    // 파일 업로드
    const snapshot = await uploadBytes(storageRef, file);
    
    // 다운로드 URL 가져오기
    const downloadURL = await getDownloadURL(snapshot.ref);
    
    return {
      fileName: file.name,
      filePath: snapshot.ref.fullPath,
      fileUrl: downloadURL,
      fileSize: file.size,
      fileType: file.type
    };
  } catch (error) {
    console.error('File upload error:', error);
    throw new Error('파일 업로드 실패: ' + error.message);
  }
};

// 파일 삭제 (Firebase Storage)
export const deleteFile = async (filePath) => {
  try {
    if (!filePath) return;
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
  } catch (error) {
    console.error('File delete error:', error);
    // 파일이 없어도 계속 진행
  }
};

// 자료 추가
export const addMaterial = async (materialData, file = null) => {
  try {
    // Firestore에 문서 추가
    const docRef = await addDoc(collection(db, COLLECTION_NAME), {
      ...materialData,
      views: 0,
      downloads: 0,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    
    // 파일이 있으면 업로드
    let fileData = null;
    if (file) {
      fileData = await uploadFile(file, docRef.id);
      
      // 파일 정보를 문서에 업데이트
      await updateDoc(doc(db, COLLECTION_NAME, docRef.id), {
        ...fileData,
        updatedAt: serverTimestamp()
      });
    }
    
    return {
      id: docRef.id,
      ...materialData,
      ...fileData,
      views: 0,
      downloads: 0
    };
  } catch (error) {
    console.error('Add material error:', error);
    throw new Error('자료 추가 실패: ' + error.message);
  }
};

// 모든 자료 가져오기
export const getAllMaterials = async () => {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      orderBy('createdAt', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    const materials = [];
    
    querySnapshot.forEach((doc) => {
      materials.push({
        id: doc.id,
        ...doc.data(),
        // Firestore Timestamp를 Date로 변환
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString?.() || new Date().toISOString(),
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString?.() || new Date().toISOString()
      });
    });
    
    return materials;
  } catch (error) {
    console.error('Get materials error:', error);
    throw new Error('자료 불러오기 실패: ' + error.message);
  }
};

// 자료 수정
export const updateMaterial = async (materialId, updates, newFile = null) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, materialId);
    
    // 새 파일이 있으면 업로드
    let fileData = {};
    if (newFile) {
      // 기존 파일 삭제 (있다면)
      if (updates.filePath) {
        await deleteFile(updates.filePath);
      }
      
      // 새 파일 업로드
      fileData = await uploadFile(newFile, materialId);
    }
    
    // 문서 업데이트
    await updateDoc(docRef, {
      ...updates,
      ...fileData,
      updatedAt: serverTimestamp()
    });
    
    return {
      id: materialId,
      ...updates,
      ...fileData
    };
  } catch (error) {
    console.error('Update material error:', error);
    throw new Error('자료 수정 실패: ' + error.message);
  }
};

// 자료 삭제
export const deleteMaterial = async (materialId, filePath) => {
  try {
    // 파일 삭제 (있다면)
    if (filePath) {
      await deleteFile(filePath);
    }
    
    // 문서 삭제
    await deleteDoc(doc(db, COLLECTION_NAME, materialId));
  } catch (error) {
    console.error('Delete material error:', error);
    throw new Error('자료 삭제 실패: ' + error.message);
  }
};

// 조회수 증가
export const increaseViews = async (materialId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, materialId);
    await updateDoc(docRef, {
      views: increment(1)
    });
  } catch (error) {
    console.error('Increase views error:', error);
  }
};

// 다운로드 수 증가
export const increaseDownloads = async (materialId) => {
  try {
    const docRef = doc(db, COLLECTION_NAME, materialId);
    await updateDoc(docRef, {
      downloads: increment(1)
    });
  } catch (error) {
    console.error('Increase downloads error:', error);
  }
};

// 통계 가져오기
export const getStats = async () => {
  try {
    const materials = await getAllMaterials();
    
    return {
      total: materials.length,
      documents: materials.filter(m => m.type === '문서').length,
      images: materials.filter(m => m.type === '그림').length,
      videos: materials.filter(m => m.type === '비디오').length,
      totalViews: materials.reduce((sum, m) => sum + (m.views || 0), 0),
      totalDownloads: materials.reduce((sum, m) => sum + (m.downloads || 0), 0)
    };
  } catch (error) {
    console.error('Get stats error:', error);
    return {
      total: 0,
      documents: 0,
      images: 0,
      videos: 0,
      totalViews: 0,
      totalDownloads: 0
    };
  }
};
