// src/pages/EventManager.jsx - 이벤트 관리 페이지 (개발/테스트용)
import React, { useState, useEffect } from 'react';
import { Trash2, RefreshCw, Download, Upload, Eye, EyeOff } from 'lucide-react';

const EventManager = () => {
  const [events, setEvents] = useState([]);
  const [showRawData, setShowRawData] = useState(false);

  const loadEvents = () => {
    try {
      const saved = localStorage.getItem('clubEvents');
      setEvents(saved ? JSON.parse(saved) : []);
    } catch (error) {
      console.error('Failed to load events:', error);
      setEvents([]);
    }
  };

  useEffect(() => {
    loadEvents();
  }, []);

  // 전체 삭제
  const handleClearAll = () => {
    if (window.confirm('⚠️ 모든 이벤트를 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다.')) {
      localStorage.removeItem('clubEvents');
      setEvents([]);
      alert('✅ 모든 이벤트가 삭제되었습니다.');
    }
  };

  // 개별 삭제
  const handleDeleteEvent = (eventId) => {
    if (window.confirm('이 이벤트를 삭제하시겠습니까?')) {
      const updatedEvents = events.filter(e => e.id !== eventId);
      localStorage.setItem('clubEvents', JSON.stringify(updatedEvents));
      setEvents(updatedEvents);
      alert('✅ 이벤트가 삭제되었습니다.');
    }
  };

  // 데이터 내보내기 (JSON)
  const handleExport = () => {
    const dataStr = JSON.stringify(events, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `club-events-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // 데이터 가져오기 (JSON)
  const handleImport = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedEvents = JSON.parse(event.target.result);
        if (Array.isArray(importedEvents)) {
          localStorage.setItem('clubEvents', JSON.stringify(importedEvents));
          setEvents(importedEvents);
          alert(`✅ ${importedEvents.length}개의 이벤트를 가져왔습니다.`);
        } else {
          alert('❌ 올바른 형식이 아닙니다.');
        }
      } catch (error) {
        alert('❌ 파일을 읽는 중 오류가 발생했습니다.');
      }
    };
    reader.readAsText(file);
  };

  // 통계
  const stats = {
    total: events.length,
    upcoming: events.filter(e => new Date(e.date) >= new Date()).length,
    past: events.filter(e => new Date(e.date) < new Date()).length,
    totalParticipants: events.reduce((sum, e) => sum + (e.participants || 0), 0)
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="text-6xl mb-6">🛠️</div>
          <h1 className="text-5xl font-bold mb-6">이벤트 관리</h1>
          <p className="text-xl">로컬 스토리지 데이터 관리 도구</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* 통계 */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-blue-500">{stats.total}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">전체 이벤트</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-green-500">{stats.upcoming}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">다가오는 이벤트</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-orange-500">{stats.past}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">지난 이벤트</div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="text-3xl font-bold text-purple-500">{stats.totalParticipants}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">총 참가자</div>
          </div>
        </div>

        {/* 액션 버튼 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">관리 도구</h2>
          <div className="grid md:grid-cols-5 gap-4">
            <button
              onClick={loadEvents}
              className="flex items-center justify-center gap-2 bg-blue-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all"
            >
              <RefreshCw className="w-5 h-5" />
              새로고침
            </button>

            <button
              onClick={handleExport}
              disabled={events.length === 0}
              className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              내보내기
            </button>

            <label className="flex items-center justify-center gap-2 bg-purple-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all cursor-pointer">
              <Upload className="w-5 h-5" />
              가져오기
              <input type="file" accept=".json" onChange={handleImport} className="hidden" />
            </label>

            <button
              onClick={() => setShowRawData(!showRawData)}
              className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-indigo-600 transition-all"
            >
              {showRawData ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              {showRawData ? 'JSON 숨기기' : 'JSON 보기'}
            </button>

            <button
              onClick={handleClearAll}
              disabled={events.length === 0}
              className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-3 rounded-xl font-semibold hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-5 h-5" />
              전체 삭제
            </button>
          </div>
        </div>

        {/* Raw JSON 데이터 */}
        {showRawData && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Raw JSON Data</h2>
            <pre className="bg-gray-100 dark:bg-gray-900 p-4 rounded-xl overflow-auto max-h-96 text-sm">
              {JSON.stringify(events, null, 2)}
            </pre>
          </div>
        )}

        {/* 이벤트 목록 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            등록된 이벤트 ({events.length})
          </h2>

          {events.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              등록된 이벤트가 없습니다.
            </div>
          ) : (
            <div className="space-y-4">
              {events.map((event) => (
                <div key={event.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-gray-900 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-3xl">{event.image}</span>
                        <div>
                          <h3 className="text-lg font-bold text-gray-900 dark:text-white">{event.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{event.club}</p>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-3 gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <div>📅 {event.date}</div>
                        <div>⏰ {event.time}</div>
                        <div>📍 {event.location}</div>
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        ID: {event.id} | 참가자: {event.participants}명
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteEvent(event.id)}
                      className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 사용 안내 */}
        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
          <h3 className="font-bold text-gray-900 dark:text-white mb-3">💡 사용 안내</h3>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>• <strong>새로고침</strong>: 로컬 스토리지에서 최신 데이터를 다시 불러옵니다.</li>
            <li>• <strong>내보내기</strong>: 모든 이벤트를 JSON 파일로 다운로드합니다.</li>
            <li>• <strong>가져오기</strong>: JSON 파일에서 이벤트를 불러옵니다 (기존 데이터는 덮어씌워집니다).</li>
            <li>• <strong>JSON 보기</strong>: 로컬 스토리지에 저장된 원본 데이터를 확인합니다.</li>
            <li>• <strong>전체 삭제</strong>: 모든 이벤트를 삭제합니다 (되돌릴 수 없음).</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EventManager;
