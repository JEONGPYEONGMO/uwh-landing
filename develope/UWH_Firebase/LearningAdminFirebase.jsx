// src/pages/LearningAdminFirebase.jsx - Firebase 버전
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Upload, Download, RefreshCw, Eye, ArrowLeft, Loader } from 'lucide-react';
import {
  addMaterial,
  getAllMaterials,
  updateMaterial,
  deleteMaterial,
  getStats
} from '../firebase/learningService';

const LearningAdminFirebase = () => {
  const [materials, setMaterials] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    documents: 0,
    images: 0,
    videos: 0,
    totalViews: 0,
    totalDownloads: 0
  });
  const [loading, setLoading] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [newMaterial, setNewMaterial] = useState({
    title: '',
    category: '규칙',
    type: '문서',
    author: '',
    description: '',
    icon: '📄'
  });
  const [selectedFile, setSelectedFile] = useState(null);

  // 데이터 불러오기
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [materialsData, statsData] = await Promise.all([
        getAllMaterials(),
        getStats()
      ]);
      setMaterials(materialsData);
      setStats(statsData);
    } catch (error) {
      alert('❌ 데이터 불러오기 실패: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 자료 추가
  const handleAddMaterial = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      alert('⚠️ 파일을 선택해주세요.');
      return;
    }

    // 파일 크기 체크 (100MB)
    if (selectedFile.size > 100 * 1024 * 1024) {
      alert('⚠️ 파일 크기는 100MB 이하여야 합니다.');
      return;
    }

    setLoading(true);
    setUploadProgress(10);

    try {
      setUploadProgress(30);
      
      const materialData = {
        title: newMaterial.title,
        category: newMaterial.category,
        type: newMaterial.type,
        author: newMaterial.author,
        description: newMaterial.description,
        icon: newMaterial.icon,
        date: new Date().toISOString().split('T')[0]
      };

      setUploadProgress(50);
      
      await addMaterial(materialData, selectedFile);
      
      setUploadProgress(100);
      
      alert('✅ 학습자료가 추가되었습니다!');
      setShowAddForm(false);
      resetForm();
      loadData();
    } catch (error) {
      alert('❌ 추가 실패: ' + error.message);
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  // 자료 수정
  const handleEditMaterial = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    
    try {
      const updates = {
        title: editingMaterial.title,
        category: editingMaterial.category,
        type: editingMaterial.type,
        author: editingMaterial.author,
        description: editingMaterial.description,
        icon: editingMaterial.icon,
        filePath: editingMaterial.filePath // 기존 파일 경로
      };

      await updateMaterial(editingMaterial.id, updates, selectedFile);
      
      alert('✅ 수정되었습니다!');
      setEditingMaterial(null);
      setSelectedFile(null);
      loadData();
    } catch (error) {
      alert('❌ 수정 실패: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 자료 삭제
  const handleDelete = async (material) => {
    if (!window.confirm(`"${material.title}"을(를) 삭제하시겠습니까?`)) {
      return;
    }

    setLoading(true);
    
    try {
      await deleteMaterial(material.id, material.filePath);
      alert('✅ 삭제되었습니다.');
      loadData();
    } catch (error) {
      alert('❌ 삭제 실패: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // 파일 다운로드
  const handleDownload = (material) => {
    if (!material.fileUrl) {
      alert('⚠️ 다운로드 가능한 파일이 없습니다.');
      return;
    }

    // 새 탭에서 다운로드 URL 열기
    window.open(material.fileUrl, '_blank');
  };

  // 파일 선택
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 크기 체크
    if (file.size > 100 * 1024 * 1024) {
      alert('⚠️ 파일 크기는 100MB 이하여야 합니다.');
      e.target.value = '';
      return;
    }

    setSelectedFile(file);
  };

  const resetForm = () => {
    setNewMaterial({
      title: '',
      category: '규칙',
      type: '문서',
      author: '',
      description: '',
      icon: '📄'
    });
    setSelectedFile(null);
  };

  const categories = ['규칙', '전략', '연습방법', '기타'];
  const types = ['문서', '그림', '비디오', '기타'];

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-5xl font-bold mb-6">학습자료 관리</h1>
          <p className="text-xl mb-2">Firebase 클라우드 저장소 사용</p>
          <p className="text-sm opacity-80 mb-6">무제한 용량 · 실시간 동기화 · 안전한 저장</p>
          
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
            disabled={loading}
            className="flex items-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-5 h-5" />
            자료 추가
          </button>
          <button
            onClick={loadData}
            disabled={loading}
            className="flex items-center gap-2 bg-purple-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-purple-600 transition-all disabled:opacity-50"
          >
            {loading ? <Loader className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
            새로고침
          </button>
        </div>

        {/* 로딩 바 */}
        {uploadProgress > 0 && (
          <div className="mb-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-900 dark:text-white">업로드 중...</span>
              <span className="text-blue-500 font-bold">{uploadProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
              <div 
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${uploadProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* 자료 목록 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            학습자료 목록 ({materials.length})
          </h2>

          {loading && materials.length === 0 ? (
            <div className="text-center py-20">
              <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
              <p className="text-gray-600 dark:text-gray-400">데이터를 불러오는 중...</p>
            </div>
          ) : materials.length === 0 ? (
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
                            {material.views || 0}
                          </span>
                          <span className="flex items-center gap-1">
                            <Download className="w-4 h-4" />
                            {material.downloads || 0}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setEditingMaterial(material);
                              setSelectedFile(null);
                            }}
                            className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg"
                            disabled={loading}
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
                            onClick={() => handleDelete(material)}
                            className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg"
                            disabled={loading}
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
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">
                  파일 업로드 * (최대 100MB)
                </label>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {selectedFile ? selectedFile.name : '파일 선택'}
                    </span>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.mov"
                      required
                    />
                  </label>
                </div>
                {selectedFile && (
                  <p className="text-xs text-gray-500 mt-2">
                    파일 크기: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                )}
                <p className="text-xs text-gray-500 mt-2">
                  지원 형식: PDF, Word, PPT, 이미지(JPG, PNG), 비디오(MP4, MOV)
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? '업로드 중...' : '추가하기'}
                </button>
                <button
                  type="button"
                  onClick={() => { setShowAddForm(false); resetForm(); }}
                  disabled={loading}
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
                <label className="block font-semibold mb-2 text-gray-900 dark:text-white">
                  파일 변경 (선택사항, 최대 100MB)
                </label>
                <div className="mb-2 p-3 bg-blue-50 dark:bg-blue-900/30 rounded-xl">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    📎 현재 파일: {editingMaterial.fileName || '없음'}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-900 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-all">
                    <Upload className="w-6 h-6 text-gray-400" />
                    <span className="text-gray-600 dark:text-gray-400">
                      {selectedFile ? selectedFile.name : '새 파일 선택'}
                    </span>
                    <input
                      type="file"
                      onChange={handleFileSelect}
                      className="hidden"
                      accept=".pdf,.doc,.docx,.ppt,.pptx,.jpg,.jpeg,.png,.gif,.mp4,.mov"
                    />
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition-all disabled:opacity-50"
                >
                  {loading ? '수정 중...' : '수정하기'}
                </button>
                <button
                  type="button"
                  onClick={() => { setEditingMaterial(null); setSelectedFile(null); }}
                  disabled={loading}
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

export default LearningAdminFirebase;
