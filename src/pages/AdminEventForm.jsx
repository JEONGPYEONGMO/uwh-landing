// src/pages/AdminEventForm.jsx
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Trophy, Tag, Clock, Globe, Save, X, Plus, Trash2 } from 'lucide-react';

const AdminEventForm = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    fullTitle: '',
    date: '',
    endDate: '',
    location: '',
    type: 'regional',
    teams: '',
    description: '',
    registrationDeadline: '',
    prize: '',
    website: '',
    organizer: '',
    divisions: ['']
  });

  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'CMAS Asia/Oceania',
      fullTitle: 'CMAS 1st Intercontinental Championship Asia/Oceania',
      date: '2025-08-02',
      endDate: '2025-08-09',
      location: 'Kuala Lumpur, Malaysia',
      type: 'intercontinental'
    },
    {
      id: 2,
      title: 'Korea National',
      fullTitle: 'Korea National Championship 2025',
      date: '2025-12-05',
      endDate: '2025-12-08',
      location: 'Seoul, South Korea',
      type: 'regional'
    }
  ]);

  // 관리자 인증
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      alert('관리자로 로그인되었습니다!');
    } else {
      alert('비밀번호가 틀렸습니다.');
    }
  };

  // 폼 입력 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 부문 추가
  const addDivision = () => {
    setFormData(prev => ({
      ...prev,
      divisions: [...prev.divisions, '']
    }));
  };

  // 부문 삭제
  const removeDivision = (index) => {
    setFormData(prev => ({
      ...prev,
      divisions: prev.divisions.filter((_, i) => i !== index)
    }));
  };

  // 부문 변경
  const handleDivisionChange = (index, value) => {
    setFormData(prev => ({
      ...prev,
      divisions: prev.divisions.map((div, i) => i === index ? value : div)
    }));
  };

  // 일정 등록
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newEvent = {
      id: events.length + 1,
      ...formData,
      divisions: formData.divisions.filter(d => d.trim() !== ''),
      teams: parseInt(formData.teams),
      status: 'upcoming'
    };

    setEvents([...events, newEvent]);
    alert('일정이 성공적으로 등록되었습니다!');
    
    // 폼 초기화
    setFormData({
      title: '',
      fullTitle: '',
      date: '',
      endDate: '',
      location: '',
      type: 'regional',
      teams: '',
      description: '',
      registrationDeadline: '',
      prize: '',
      website: '',
      organizer: '',
      divisions: ['']
    });
    setShowForm(false);
  };

  // 일정 삭제
  const handleDelete = (id) => {
    if (window.confirm('정말 이 일정을 삭제하시겠습니까?')) {
      setEvents(events.filter(event => event.id !== id));
      alert('일정이 삭제되었습니다.');
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'world': return '🌍 세계 대회';
      case 'intercontinental': return '🌏 대륙별 대회';
      case 'regional': return '🏆 지역 대회';
      default: return '기타';
    }
  };

  const getTypeColor = (type) => {
    switch(type) {
      case 'world': return 'from-red-500 to-orange-500';
      case 'intercontinental': return 'from-purple-500 to-pink-500';
      case 'regional': return 'from-blue-500 to-cyan-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  // 관리자 로그인 화면
  if (!isAdmin) {
    return (
      <div className="pt-16 min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-md mx-auto px-4 py-20">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                관리자 로그인
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                일정을 관리하려면 로그인하세요
              </p>
            </div>

            <form onSubmit={handleLogin}>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  관리자 비밀번호
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  required
                />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                  데모: admin123
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
              >
                로그인
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // 관리자 대시보드
  return (
    <div className="pt-16 min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              일정 관리
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              관리자님, 환영합니다! 등록된 일정: {events.length}개
            </p>
          </div>
          <button
            onClick={() => setIsAdmin(false)}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
          >
            로그아웃
          </button>
        </div>

        {/* Add Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mb-6 flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105"
        >
          {showForm ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
          {showForm ? '취소' : '새 일정 등록'}
        </button>

        {/* Event Form */}
        {showForm && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              일정 등록 폼
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* 짧은 제목 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    짧은 제목 (캘린더용) *
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="예: CMAS Asia"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* 전체 제목 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    전체 제목 *
                  </label>
                  <input
                    type="text"
                    name="fullTitle"
                    value={formData.fullTitle}
                    onChange={handleChange}
                    placeholder="예: CMAS 1st Intercontinental Championship Asia/Oceania"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* 시작일 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    시작일 *
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* 종료일 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <Calendar className="w-4 h-4 inline mr-1" />
                    종료일 *
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* 장소 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" />
                    개최 장소 *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="예: Seoul, South Korea"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                {/* 대회 유형 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <Globe className="w-4 h-4 inline mr-1" />
                    대회 유형 *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="regional">🏆 지역 대회</option>
                    <option value="intercontinental">🌏 대륙별 대회</option>
                    <option value="world">🌍 세계 대회</option>
                  </select>
                </div>

                {/* 팀 수 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <Users className="w-4 h-4 inline mr-1" />
                    참가 팀 수
                  </label>
                  <input
                    type="number"
                    name="teams"
                    value={formData.teams}
                    onChange={handleChange}
                    placeholder="예: 24"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* 등록 마감일 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    등록 마감일
                  </label>
                  <input
                    type="date"
                    name="registrationDeadline"
                    value={formData.registrationDeadline}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* 상금 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <Trophy className="w-4 h-4 inline mr-1" />
                    상금/보상
                  </label>
                  <input
                    type="text"
                    name="prize"
                    value={formData.prize}
                    onChange={handleChange}
                    placeholder="예: ₩5,000,000"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* 웹사이트 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    🌐 공식 웹사이트
                  </label>
                  <input
                    type="url"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://example.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>

                {/* 주최자 */}
                <div>
                  <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                    <Tag className="w-4 h-4 inline mr-1" />
                    주최 기관
                  </label>
                  <input
                    type="text"
                    name="organizer"
                    value={formData.organizer}
                    onChange={handleChange}
                    placeholder="예: 대한수중핀수영협회"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>

              {/* 설명 */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  대회 설명
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="대회에 대한 간단한 설명을 입력하세요"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 resize-none"
                ></textarea>
              </div>

              {/* 부문 */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  참가 부문
                </label>
                {formData.divisions.map((division, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={division}
                      onChange={(e) => handleDivisionChange(index, e.target.value)}
                      placeholder="예: Elite Men"
                      className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500"
                    />
                    <button
                      type="button"
                      onClick={() => removeDivision(index)}
                      className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addDivision}
                  className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                >
                  <Plus className="w-4 h-4" />
                  부문 추가
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
              >
                <Save className="w-5 h-5" />
                일정 등록하기
              </button>
            </form>
          </div>
        )}

        {/* Events List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            등록된 일정
          </h2>
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {event.fullTitle}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white bg-gradient-to-r ${getTypeColor(event.type)}`}>
                      {getTypeLabel(event.type)}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {event.date} ~ {event.endDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {event.location}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="ml-4 px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  삭제
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminEventForm;
