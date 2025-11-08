// src/pages/Learning.jsx - 학습자료 페이지
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, FileText, Image, Video, Filter, Search, Download, Eye } from 'lucide-react';

const Learning = () => {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [selectedType, setSelectedType] = useState('전체');
  const [searchTerm, setSearchTerm] = useState('');
  const [materials, setMaterials] = useState([]);
  const [userMaterials, setUserMaterials] = useState([]);

  // 기본 자료 데이터
  const defaultMaterials = [
    { id: 1, title: '수중하키 공식 규칙 2024', category: '규칙', type: '문서', author: 'CMAS', date: '2024-01-15', views: 1250, downloads: 340, icon: '📋' },
    { id: 2, title: '초보자를 위한 기본 포지션', category: '전략', type: '그림', author: '김코치', date: '2024-03-20', views: 890, downloads: 220, icon: '🗺️' },
    { id: 3, title: '드리블 기술 마스터하기', category: '연습방법', type: '비디오', author: '박선수', date: '2024-05-10', views: 2340, downloads: 0, icon: '🎥' },
    { id: 4, title: '팀 전술: 공격 패턴 5가지', category: '전략', type: '문서', author: '이감독', date: '2024-02-28', views: 1567, downloads: 450, icon: '📄' },
    { id: 5, title: '수중하키 장비 가이드', category: '기타', type: '그림', author: 'UWH Shop', date: '2024-04-05', views: 678, downloads: 156, icon: '🖼️' },
    { id: 6, title: '골키퍼 훈련 루틴', category: '연습방법', type: '비디오', author: '최GK', date: '2024-06-12', views: 1890, downloads: 0, icon: '🎬' },
    { id: 7, title: '파울 판정 기준', category: '규칙', type: '문서', author: '심판위원회', date: '2024-01-30', views: 920, downloads: 280, icon: '📝' },
    { id: 8, title: '수중 호흡법 가이드', category: '연습방법', type: '문서', author: '정코치', date: '2024-03-15', views: 1123, downloads: 390, icon: '📖' },
    { id: 9, title: '대회 준비 체크리스트', category: '기타', type: '문서', author: 'Team Korea', date: '2024-05-20', views: 567, downloads: 178, icon: '✅' },
    { id: 10, title: '방어 전술 완벽 가이드', category: '전략', type: '비디오', author: '강코치', date: '2024-04-18', views: 2100, downloads: 0, icon: '🎦' }
  ];

  // localStorage에서 사용자 추가 자료 불러오기
  useEffect(() => {
    try {
      const saved = localStorage.getItem('learningMaterials');
      if (saved) {
        setUserMaterials(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Failed to load materials:', error);
    }
  }, []);

  // 기본 자료 + 사용자 자료 통합
  useEffect(() => {
    setMaterials([...defaultMaterials, ...userMaterials]);
  }, [userMaterials]);

  const categories = ['전체', '규칙', '전략', '연습방법', '기타'];
  const types = ['전체', '문서', '그림', '비디오', '기타'];

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
  const increaseViews = (materialId) => {
    const updated = userMaterials.map(m => 
      m.id === materialId ? { ...m, views: m.views + 1 } : m
    );
    localStorage.setItem('learningMaterials', JSON.stringify(updated));
    setUserMaterials(updated);
  };

  // 다운로드
  const handleDownload = (material) => {
    if (!material.fileUrl) {
      alert('⚠️ 다운로드 가능한 파일이 없습니다.');
      return;
    }

    try {
      const link = document.createElement('a');
      link.href = material.fileUrl;
      link.download = material.fileName || `${material.title}.file`;
      link.click();

      // 다운로드 수 증가 (사용자 추가 자료만)
      if (userMaterials.find(m => m.id === material.id)) {
        const updated = userMaterials.map(m => 
          m.id === material.id ? { ...m, downloads: m.downloads + 1 } : m
        );
        localStorage.setItem('learningMaterials', JSON.stringify(updated));
        setUserMaterials(updated);
      }
    } catch (error) {
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
          <p className="text-xl mb-6">수중하키 실력 향상을 위한 모든 자료</p>
          
          {/* 관리자 페이지 링크 */}
          <Link 
            to="/learning-admin"
            className="inline-block bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all"
          >
            🛠️ 관리자 페이지
          </Link>
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
          </div>
        </div>

        {/* 자료 목록 */}
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
                        <span>{material.views.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => increaseViews(material.id)}
                          className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 rounded-lg transition-all"
                        >
                          <Eye className="w-5 h-5" />
                        </button>
                        {material.type !== '비디오' && material.fileUrl && (
                          <button 
                            onClick={() => handleDownload(material)}
                            className="p-2 text-green-500 hover:bg-green-50 dark:hover:bg-green-900 rounded-lg transition-all"
                          >
                            <Download className="w-5 h-5" />
                          </button>
                        )}
                        {material.type !== '비디오' && !material.fileUrl && (
                          <button 
                            onClick={() => alert('⚠️ 다운로드 가능한 파일이 없습니다.')}
                            className="p-2 text-gray-400 rounded-lg cursor-not-allowed"
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

        {filteredMaterials.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">자료를 찾을 수 없습니다</h3>
            <p className="text-gray-600 dark:text-gray-400">다른 필터를 선택해보세요</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Learning;
