// src/pages/LearningAdmin.jsx - 학습자료 관리자 페이지
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Upload, Download, RefreshCw, FileText, Image, Video, Eye, ArrowLeft } from 'lucide-react';

const LearningAdmin = () => {
  const [materials, setMaterials] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    category: '규칙',
    type: '문서',
    author: '',
    description: '',
    icon: '📄',
    fileUrl: '',
    fileName: ''
  });

  // 로컬 스토리지에서 데이터 불러오기
  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const saved = localStorage.getItem('learningMaterials');
      if (saved) {
        setMaterials(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    }
  };

  // 자료 추가
  const handleAddMaterial = (e) => {
    e.preventDefault();
    
    try {
      const materialData = {
        id: Date.now(),
        ...newMaterial,
        date: new Date().toISOString().split('T')[0],
        views: 0,
        downloads: 0,
        createdAt: new Date().toISOString()
      };
      
      const updated = [...materials, materialData];
      localStorage.setItem('learningMaterials', JSON.stringify(updated));
      setMaterials(updated);
      
      alert('✅ 학습자료가 추가되었습니다!');
      setShowAddForm(false);
      resetForm();
    } catch (error) {
      alert('❌ 추가 실패: ' + error.message);
    }
  };

  // 자료 수정
  const handleEditMaterial = (e) => {
    e.preventDefault();
    
    try {
      const updated = materials.map(m => 
        m.id === editingMaterial.id ? { ...editingMaterial } : m
      );
      
      localStorage.setItem('learningMaterials', JSON.stringify(updated));
      setMaterials(updated);
      
      alert('✅ 수정되었습니다!');
      setEditingMaterial(null);
    } catch (error) {
      alert('❌ 수정 실패: ' + error.message);
    }
  };

  // 자료 삭제
  const handleDelete = (id) => {
    if (window.confirm('이 자료를 삭제하시겠습니까?')) {
      try {
        const updated = materials.filter(m => m.id !== id);
        localStorage.setItem('learningMaterials', JSON.stringify(updated));
        setMaterials(updated);
        alert('✅ 삭제되었습니다.');
      } catch (error) {
        alert('❌ 삭제 실패: ' + error.message);
      }
    }
  };

  // 파일 업로드 처리
  const handleFileUpload = (e, isEditing = false) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 체크 (10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert('⚠️ 파일 크기는 10MB 이하여야 합니다.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const fileData = {
        fileName: file.name,
        fileUrl: event.target.result, // Base64 데이터
        fileSize: file.size,
        fileType: file.type
      };

      if (isEditing) {
        setEditingMaterial({
          ...editingMaterial,
          ...fileData
        });
      } else {
        setNewMaterial({
          ...newMaterial,
          ...fileData
        });
      }

      alert('✅ 파일이 업로드되었습니다!');
    };

    reader.onerror = () => {
      alert('❌ 파일 업로드 실패');
    };

    reader.readAsDataURL(file);
  };

  // 파일 다운로드
  const handleDownload = (material) => {
    if (!material.fileUrl) {
      alert('⚠️ 다운로드 가능한 파일이 없습니다.');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = material.fileUrl;
      link.download = material.fileName || `${material.title}.${material.fileType?.split('/')[1] || 'file'}`;
      link.click();

      // 다운로드 수 증가
      const updated = materials.map(m => 
        m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m
      );
      localStorage.setItem('learningMaterials', JSON.stringify(updated));
      setMaterials(updated);
    } catch (error) {
      alert('❌ 다운로드 실패: ' + error.message);
    }
  };

  // 데이터 내보내기
  const handleExport = () => {
    const data = {
      materials,
      exportedAt: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `learning-materials-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    alert('✅ 데이터가 내보내기되었습니다!');
  };

  // 데이터 가져오기
  const handleImport = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.materials) {
          const shouldMerge = window.confirm(
            '기존 데이터와 병합하시겠습니까?\n(취소를 누르면 기존 데이터를 완전히 교체합니다)'
          );

          const updated = shouldMerge 
            ? [...materials, ...data.materials]
            : data.materials;
          
          localStorage.setItem('learningMaterials', JSON.stringify(updated));
          setMaterials(updated);
          
          alert('✅ 데이터를 성공적으로 가져왔습니다!');
        } else {
          alert('❌ 올바른 형식의 파일이 아닙니다.');
        }
      } catch (error) {
        alert('❌ 파일 읽기 실패: ' + error.message);
      }
    };
    
    reader.readAsText(file);
    event.target.value = '';
  };

  // 데이터 초기화
  const handleReset = () => {
    if (window.confirm('⚠️ 모든 학습자료를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다!')) {
      if (window.confirm('정말로 삭제하시겠습니까?')) {
        localStorage.removeItem('learningMaterials');
        setMaterials([]);
        alert('✅ 모든 데이터가 삭제되었습니다.');
      }
    }
  };

  const resetForm = () => {
    setNewMaterial({
      title: '',
      category: '규칙',
      type: '문서',
      author: '',
      description: '',
      icon: '📄',
      fileUrl: '',
      fileName: ''
    });
  };

  const categories = ['규칙', '전략', '연습방법', '기타'];
  const types = ['문서', '그림', '비디오', '기타'];

  const stats = {
    total: materials.length,
    documents: materials.filter(m => m.type === '문서').length,
    images: materials.filter(m => m.type === '그림').length,
    videos: materials.filter(m => m.type === '비디오').length,
    totalViews: materials.reduce((sum, m) => sum + m.views, 0),
    totalDownloads: materials.reduce((sum, m) => sum + m.downloads, 0)
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-5xl font-bold mb-6">학습자료 관리</h1>
          <p className="text-xl mb-6">자료 업로드 및 관리</p>
          
          <Link 
            to="/learning"
            className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            학습자료 페이지로
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 통계 */}
        <div className="grid md:grid-cols-6 gap-4 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-blue-500">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">전체 자료</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-green-500">{stats.documents}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">문서</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-purple-500">{stats.images}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">그림</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-red-500">{stats.videos}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">비디오</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-orange-500">{stats.totalViews.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">총 조회수</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-cyan-500">{stats.totalDownloads.toLocaleString()}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">총 다운로드</div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-4 mb-8 flex-wrap">
          <button
            onClick={() => setShowAddForm(true)}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all"
          >
            <Plus className="w-5 h-5" />
            자료 추가
          </button>
          <button
            onClick={loadData}
            className="flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 transition-all"
          >
            <RefreshCw className="w-5 h-5" />
            새로고침
          </button>
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-600 transition-all"
          >
            <Download className="w-5 h-5" />
            내보내기
          </button>
          <label className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-orange-600 transition-all cursor-pointer">
            <Upload className="w-5 h-5" />
            가져오기
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 transition-all"
          >
            <Trash2 className="w-5 h-5" />
            데이터 초기화
          </button>
        </div>

        {/* 자료 목록 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            학습자료 목록 ({materials.length})
          </h2>

          {materials.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">📚</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">등록된 자료가 없습니다</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">첫 자료를 추가해보세요</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all"
              >
                자료 추가하기
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">제목</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">카테고리</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">유형</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">작성자</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">조회/다운로드</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {materials.map(material => (
                    <tr key={material.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{material.icon}</span>
                          <div>
                            <div className="font-semibold text-gray-900 dark:text-white">{material.title}</div>
                            {material.fileName && (
                              <div className="text-xs text-gray-500">📎 {material.fileName}</div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-xs">
                          {material.category}
                        </span>
                      </td>
                      <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{material.type}</td>
                      <td className="px-4 py-4 text-gray-600 dark:text-gray-400">{material.author}</td>
                      <td className="px-4 py-4 text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-3 text-sm">
                          <span className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {material.views}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {material.downloads}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingMaterial(material)}
                            className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          {material.fileUrl && (
                            <button
                              onClick={() => handleDownload(material)}
                              className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg"
                            >
                              <Download className="w-4 h-4" />
                            </button>
                          )}
                          <button
                            onClick={() => handleDelete(material.id)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* 자료 추가 모달 */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 my-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">학습자료 추가</h2>
            <form onSubmit={handleAddMaterial} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">제목 *</label>
                  <input
                    type="text"
                    required
                    value={newMaterial.title}
                    onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="예: 수중하키 공식 규칙 2024"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">작성자 *</label>
                  <input
                    type="text"
                    required
                    value={newMaterial.author}
                    onChange={(e) => setNewMaterial({...newMaterial, author: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    placeholder="예: 김코치"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">카테고리 *</label>
                  <select
                    required
                    value={newMaterial.category}
                    onChange={(e) => setNewMaterial({...newMaterial, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">유형 *</label>
                  <select
                    required
                    value={newMaterial.type}
                    onChange={(e) => setNewMaterial({...newMaterial, type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    {types.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">아이콘 (이모지)</label>
                <input
                  type="text"
                  value={newMaterial.icon}
                  onChange={(e) => setNewMaterial({...newMaterial, icon: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  placeholder="📄"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">설명</label>
                <textarea
                  value={newMaterial.description}
                  onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  rows="3"
                  placeholder="자료에 대한 간단한 설명"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">파일 업로드 (최대 10MB)</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {newMaterial.fileName || '파일 선택'}
                    </span>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, false)}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.mov"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  지원 형식: PDF, Word, PPT, 이미지(JPG, PNG), 비디오(MP4, MOV)
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all"
                >
                  추가하기
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddForm(false); resetForm(); }}
                  className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-xl font-bold hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 자료 수정 모달 */}
      {editingMaterial && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full p-8 my-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">학습자료 수정</h2>
            <form onSubmit={handleEditMaterial} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">제목 *</label>
                  <input
                    type="text"
                    required
                    value={editingMaterial.title}
                    onChange={(e) => setEditingMaterial({...editingMaterial, title: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">작성자 *</label>
                  <input
                    type="text"
                    required
                    value={editingMaterial.author}
                    onChange={(e) => setEditingMaterial({...editingMaterial, author: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">카테고리 *</label>
                  <select
                    required
                    value={editingMaterial.category}
                    onChange={(e) => setEditingMaterial({...editingMaterial, category: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold mb-2 text-gray-900 dark:text-white">유형 *</label>
                  <select
                    required
                    value={editingMaterial.type}
                    onChange={(e) => setEditingMaterial({...editingMaterial, type: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  >
                    {types.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">아이콘 (이모지)</label>
                <input
                  type="text"
                  value={editingMaterial.icon}
                  onChange={(e) => setEditingMaterial({...editingMaterial, icon: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">설명</label>
                <textarea
                  value={editingMaterial.description}
                  onChange={(e) => setEditingMaterial({...editingMaterial, description: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                  rows="3"
                ></textarea>
              </div>

              <div>
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">파일 변경 (최대 10MB)</label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {editingMaterial.fileName || '새 파일 선택'}
                    </span>
                    <input
                      type="file"
                      onChange={(e) => handleFileUpload(e, true)}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.mov"
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all"
                >
                  수정하기
                </button>
                <button
                  type="button"
                  onClick={() => setEditingMaterial(null)}
                  className="flex-1 bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white py-3 rounded-xl font-bold hover:bg-gray-400 dark:hover:bg-gray-600 transition-all"
                >
                  취소
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LearningAdmin;
