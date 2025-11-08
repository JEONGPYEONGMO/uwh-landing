// src/pages/LearningFirebase.jsx - Firebase 버전
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Image, Video, Search, Download, Eye, Loader } from 'lucide-react';
import {
  getAllMaterials,
  increaseViews,
  increaseDownloads
} from '../firebase/learningService';

const LearningFirebase = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedType, setSelectedType] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['전체', '규칙', '전략', '연습방법', '기타'];
  const types = ['전체', '문서', '그림', '비디오', '기타'];

  // 데이터 불러오기
  useEffect(() => {
    loadMaterials();
  }, []);

  const loadMaterials = async () => {
    setLoading(true);
    try {
      const data = await getAllMaterials();
      setMaterials(data);
    } catch (error) {
      console.error('Failed to load materials:', error);
      alert('❌ 자료를 불러오지 못했습니다: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const filteredMaterials = materials.filter(m => {
    const matchesCategory = selectedCategory === '전체' || m.category === selectedCategory;
    const matchesType = selectedType === '전체' || m.type === selectedType;
    const matchesSearch = m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         m.author.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesType && matchesSearch;
  });

  const getTypeIcon = (type) => {
    switch(type) {
      case '문서': return <FileText className="w-5 h-5" />;
      case '그림': return <Image className="w-5 h-5" />;
      case '비디오': return <Video className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  // 조회수 증가
  const handleView = async (materialId) => {
    try {
      await increaseViews(materialId);
      // 로컬 상태도 업데이트
      setMaterials(materials.map(m => 
        m.id === materialId ? { ...m, views: (m.views || 0) + 1 } : m
      ));
    } catch (error) {
      console.error('Failed to increase views:', error);
    }
  };

  // 다운로드
  const handleDownload = async (material) => {
    if (!material.fileUrl) {
      alert('⚠️ 다운로드 가능한 파일이 없습니다.');
      return;
    }

    try {
      // 다운로드 수 증가
      await increaseDownloads(material.id);
      
      // 로컬 상태 업데이트
      setMaterials(materials.map(m => 
        m.id === material.id ? { ...m, downloads: (m.downloads || 0) + 1 } : m
      ));

      // 새 탭에서 파일 열기
      window.open(material.fileUrl, '_blank');
    } catch (error) {
      console.error('Download error:', error);
      alert('❌ 다운로드 실패: ' + error.message);
    }
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="text-6xl mb-6">📚</div>
          <h1 className="text-5xl font-bold mb-6">학습자료</h1>
          <p className="text-xl mb-2">수중하키 실력 향상을 위한 모든 자료</p>
          <p className="text-sm opacity-80 mb-6">Firebase 클라우드 저장소 · 실시간 동기화</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 검색 및 필터 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="자료 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
              />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-4 py-3 rounded-xl border bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
            >
              {types.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <p className="text-gray-600 dark:text-gray-400">
              <span className="font-bold text-blue-500">{filteredMaterials.length}</span>개의 자료
            </p>
            <button
              onClick={loadMaterials}
              className="flex items-center gap-2 text-blue-500 hover:text-blue-600 font-semibold"
            >
              {loading ? <Loader className="w-4 h-4 animate-spin" /> : '🔄 새로고침'}
            </button>
          </div>
        </div>

        {/* 자료 목록 */}
        {loading ? (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-20 text-center">
            <Loader className="w-12 h-12 animate-spin text-blue-500 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400">자료를 불러오는 중...</p>
          </div>
        ) : filteredMaterials.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">자료를 찾을 수 없습니다</h3>
            <p className="text-gray-600 dark:text-gray-400">다른 필터를 선택해보세요</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">제목</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">카테고리</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">유형</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">작성자</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">날짜</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">조회</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900 dark:text-white">액션</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredMaterials.map(material => (
                    <tr key={material.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="text-3xl">{material.icon}</div>
                          <span className="font-semibold text-gray-900 dark:text-white">{material.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm">
                          {material.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                          {getTypeIcon(material.type)}
                          <span>{material.type}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{material.author}</td>
                      <td className="px-6 py-4 text-gray-600 dark:text-gray-400">{material.date}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                          <Eye className="w-4 h-4" />
                          <span>{material.views?.toLocaleString() || 0}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => handleView(material.id)}
                            className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all"
                            title="조회수 증가"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          {material.fileUrl && (
                            <button 
                              onClick={() => handleDownload(material)}
                              className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-all"
                              title="다운로드"
                            >
                              <Download className="w-5 h-5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningFirebase;
