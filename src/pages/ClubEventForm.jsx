// src/pages/ClubEventForm.jsx - 클럽 일정 등록 페이지
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, FileText, Send, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ClubEventForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    clubName: '',
    eventDate: '',
    startTime: '',
    endTime: '',
    location: '',
    poolName: '',
    description: '',
    maxParticipants: '',
    contactEmail: ''
  });

  const clubs = [
    'Baby Octopus Club',
    'Yongin UWH Club',
    'Seoul Marines',
    'Busan Sharks',
    'Tokyo Octopush',
    'Beijing Eight',
    'Singapore SUHC',
    '기타 (직접 입력)'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 기존 이벤트 가져오기
    const existingEvents = JSON.parse(localStorage.getItem('clubEvents') || '[]');
    
    // 새 이벤트 생성
    const newEvent = {
      id: Date.now(),
      title: `${formData.clubName} 정기 훈련`,
      club: formData.clubName,
      date: formData.eventDate,
      time: `${formData.startTime}-${formData.endTime}`,
      startTime: formData.startTime,
      endTime: formData.endTime,
      location: formData.location,
      poolName: formData.poolName,
      description: formData.description || '클럽 정기 훈련 세션',
      maxParticipants: formData.maxParticipants,
      contactEmail: formData.contactEmail,
      participants: 0,
      type: 'club',
      image: '🏊‍♂️',
      createdAt: new Date().toISOString(),
      note: formData.maxParticipants ? `최대 ${formData.maxParticipants}명` : '제한 없음'
    };
    
    // 로컬 스토리지에 저장
    const updatedEvents = [...existingEvents, newEvent];
    localStorage.setItem('clubEvents', JSON.stringify(updatedEvents));
    
    console.log('✅ 클럽 일정 등록 완료:', newEvent);
    
    // 성공 알림
    alert(`🎉 클럽 일정이 등록되었습니다!\n\n클럽: ${formData.clubName}\n날짜: ${formData.eventDate}\n시간: ${formData.startTime} - ${formData.endTime}\n장소: ${formData.location}\n\n※ 일정 페이지에서 확인하실 수 있습니다.`);
    
    // 폼 초기화
    setFormData({
      clubName: '',
      eventDate: '',
      startTime: '',
      endTime: '',
      location: '',
      poolName: '',
      description: '',
      maxParticipants: '',
      contactEmail: ''
    });
    
    // 일정 페이지로 이동
    setTimeout(() => {
      navigate('/events');
    }, 500);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <div className="text-6xl mb-6">📅</div>
          <h1 className="text-5xl font-bold mb-6">클럽 일정 등록</h1>
          <p className="text-xl">새로운 클럽 훈련 일정을 등록하세요</p>
          
          {/* 뒤로가기 버튼 */}
          <button
            onClick={() => navigate('/events')}
            className="mt-6 inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm px-6 py-3 rounded-xl font-semibold transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            일정 페이지로 돌아가기
          </button>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 클럽 선택 */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                클럽명 *
              </label>
              <select
                name="clubName"
                value={formData.clubName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="">클럽을 선택하세요</option>
                {clubs.map(club => (
                  <option key={club} value={club}>{club}</option>
                ))}
              </select>
            </div>

            {/* 날짜 */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                훈련 날짜 *
              </label>
              <input
                type="date"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 시간 */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  시작 시간 *
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  <Clock className="w-4 h-4 inline mr-2" />
                  종료 시간 *
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* 장소 */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                지역 *
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                placeholder="예: 용인시 처인구"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 수영장 */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                🏊 수영장명 *
              </label>
              <input
                type="text"
                name="poolName"
                value={formData.poolName}
                onChange={handleChange}
                required
                placeholder="예: 용인시민체육공원 수영장"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 설명 */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                <FileText className="w-4 h-4 inline mr-2" />
                일정 설명
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="훈련 내용, 준비물, 주의사항 등을 입력하세요"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            {/* 최대 참가자 */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                👥 최대 참가 인원
              </label>
              <input
                type="number"
                name="maxParticipants"
                value={formData.maxParticipants}
                onChange={handleChange}
                min="1"
                placeholder="제한 없음 (선택사항)"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 연락처 */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                📧 연락처 이메일 *
              </label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                placeholder="contact@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* 제출 버튼 */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                일정 등록하기
              </button>
            </div>
          </form>

          {/* 안내사항 */}
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <h3 className="font-bold text-gray-900 dark:text-white mb-3">📌 등록 안내</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li>• 등록된 일정은 일정 페이지의 캘린더에 자동으로 표시됩니다.</li>
              <li>• 다른 회원들이 참가 신청을 할 수 있습니다.</li>
              <li>• 일정 수정이 필요한 경우 관리자에게 문의해주세요.</li>
              <li>• 취소 시 최소 24시간 전에 알려주세요.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubEventForm;
