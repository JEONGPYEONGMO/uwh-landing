// src/pages/Events.jsx - 일정 페이지 (수정본)
import React, { useState, useEffect } from 'react';
import { Calendar as CalIcon, MapPin, Users, Trophy, Clock, ExternalLink, UserPlus, LogIn, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Events = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showParticipateModal, setShowParticipateModal] = useState(false);
  const [showClubDetailModal, setShowClubDetailModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [participantName, setParticipantName] = useState('');
  const [participantCountry, setParticipantCountry] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [clubEventParticipants, setClubEventParticipants] = useState({});
  const [userClubEvents, setUserClubEvents] = useState([]);

  // 로컬 스토리지에서 사용자 등록 클럽 일정 불러오기
  const loadUserClubEvents = () => {
    try {
      const saved = localStorage.getItem('clubEvents');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Failed to load club events:', error);
      return [];
    }
  };

  // 컴포넌트 마운트 시 로컬 스토리지에서 데이터 로드
  useEffect(() => {
    setUserClubEvents(loadUserClubEvents());
    
    // 스토리지 이벤트 리스너 (다른 탭에서 변경 감지)
    const handleStorageChange = (e) => {
      if (e.key === 'clubEvents') {
        setUserClubEvents(loadUserClubEvents());
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 기본 클럽 일정 데이터
  const defaultClubEvents = [
    {
      id: 1,
      title: 'Baby Octopus Club 정기 연습',
      date: '2025-11-09',
      location: '용인시민체육공원',
      type: 'club',
      club: 'Baby Octopus Club',
      time: '17:00-20:00',
      participants: 12,
      image: '🏊‍♂️',
      poolName: '용인 인어다이브 수영장',
      description: '초보자부터 경험자까지 환영합니다! 매주 토요일 정기 훈련',
      note: '장비 대여 가능',
      contactEmail: 'yongin.uwh@example.com'
    },
    {
      id: 102,
      title: 'Tokyo Octopush 주말 훈련',
      date: '2025-11-10',
      location: 'Tokyo Sports Center',
      type: 'club',
      club: 'Tokyo Octopush',
      time: '14:00-17:00',
      participants: 28,
      image: '🗼',
      poolName: 'Tokyo Sports Center Pool',
      description: '도쿄 메인 클럽 주말 훈련 세션',
      note: '중급 이상 권장',
      contactEmail: 'tokyo.octopush@example.jp'
    },
    {
      id: 103,
      title: 'Singapore SUHC 정기 훈련',
      date: '2025-11-12',
      location: 'MOE Swimming Complex',
      type: 'club',
      club: 'Stirling UWH Club',
      time: '19:00-21:00',
      participants: 35,
      image: '🦁',
      poolName: 'MOE (Evans) Swimming Complex',
      description: '아시아 최대 국제 클럽의 정기 훈련',
      note: '모든 레벨 환영',
      contactEmail: 'info@suhc.org'
    },
    {
      id: 104,
      title: 'Beijing Eight 주중 훈련',
      date: '2025-11-15',
      location: 'Donggaodi Sports Center',
      type: 'club',
      club: 'Beijing Eight UWH Club',
      time: '19:00-21:00',
      participants: 20,
      image: '🏛️',
      poolName: 'Donggaodi Sports Center Pool',
      description: '베이징 엘리트 클럽 주중 훈련',
      note: '고급 레벨',
      contactEmail: 'beijing8@example.com'
    }
  ];

  // 사용자 등록 일정 + 기본 일정 합치기
  const clubEvents = [...defaultClubEvents, ...userClubEvents];

  // 대회 데이터 - 실제 CMAS 공식 일정 (미래 일정 우선)
  const tournaments = [
    {
      id: 4,
      title: '2026 CMAS World Championship Underwater Hockey Age Groups',
      date: '2026-07-16',
      endDate: '2026-07-23',
      location: 'TBA',
      type: 'tournament',
      organizer: 'CMAS',
      participants: 0,
      description: 'CMAS 공식 세계 선수권 대회 - 연령별 부문. 전 세계 국가 대표팀들이 참가하는 메이저 대회.',
      website: 'https://www.cmas.org/underwater-hockey-events.html',
      image: '🏆',
      status: '예정됨'
    },
    {
      id: 3,
      title: 'Argonauta Underwaterhockey Tournament Breda',
      date: '2025-09-20',
      endDate: '2025-09-21',
      location: 'Breda, Netherlands',
      type: 'tournament',
      organizer: 'Argonauta UWH Club',
      participants: 0,
      description: '브레다에서 개최되는 지역 수중하키 토너먼트',
      website: 'https://www.cmas.org/hockey/calendar.html',
      image: '🏒',
      status: '종료됨'
    },
    {
      id: 2,
      title: '2025 CMAS 1st Intercontinental Championship Europe/Africa',
      date: '2025-08-17',
      endDate: '2025-08-23',
      location: 'Dordrecht, Netherlands',
      type: 'tournament',
      organizer: 'CMAS',
      participants: 0,
      description: 'CMAS 공식 대륙간 챔피언십 - 유럽/아프리카 지역. 엘리트 및 마스터 부문 진행. 2026 세계 선수권 대회 예선전.',
      website: 'https://www.europeafricauwh2025.com/',
      image: '🇳🇱',
      status: '종료됨'
    },
    {
      id: 1,
      title: '2025 CMAS 1st Intercontinental Championship Asia/Oceania',
      date: '2025-08-03',
      endDate: '2025-08-09',
      location: 'Kuala Lumpur, Malaysia',
      type: 'tournament',
      organizer: 'CMAS / Malaysia UWH Association',
      participants: 0,
      description: 'CMAS 공식 대륙간 챔피언십 - 아시아/오세아니아 지역. 엘리트 및 마스터 부문 진행. 2026 세계 선수권 대회 예선전.',
      website: 'https://www.asiaoceaniauwh2025.com/',
      image: '🇲🇾',
      status: '종료됨'
    }
  ];

  const allEvents = [...tournaments, ...clubEvents];

  // 다가오는 클럽 일정들을 날짜순으로 정렬
  const upcomingClubEvents = clubEvents
    .filter(e => new Date(e.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  // 가장 가까운 클럽 일정 (메인)
  const upcomingClubEvent = upcomingClubEvents[0];
  
  // 다음 3개 클럽 일정
  const nextClubEvents = upcomingClubEvents.slice(1, 4);

  // 다가오는 대회들을 날짜 역순으로 정렬 (미래 먼저)
  const sortedTournaments = tournaments
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // 캘린더 생성 (11월)
  const generateCalendar = () => {
    const year = 2025;
    const month = 10;
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(i);
    return days;
  };

  const getEventsForDate = (day) => {
    const dateStr = `2025-11-${String(day).padStart(2, '0')}`;
    return allEvents.filter(e => e.date === dateStr || (e.endDate && dateStr >= e.date && dateStr <= e.endDate));
  };

  const handleParticipate = (event) => {
    setSelectedEvent(event);
    setShowParticipateModal(true);
  };

  const submitParticipation = (e) => {
    e.preventDefault();
    alert(`참가 신청 완료!\n이름: ${participantName}\n국가: ${participantCountry}\n대회: ${selectedEvent.title}`);
    setShowParticipateModal(false);
    setParticipantName('');
    setParticipantCountry('');
    selectedEvent.participants = (selectedEvent.participants || 0) + 1;
  };

  // 클럽 훈련 참가 (로그인된 사용자만)
  const handleClubEventParticipate = (eventId) => {
    if (!isLoggedIn) {
      alert('로그인이 필요합니다!');
      return;
    }
    
    setClubEventParticipants(prev => ({
      ...prev,
      [eventId]: !prev[eventId]
    }));
  };

  // 클럽 일정 상세보기
  const handleClubDetail = (event) => {
    setSelectedEvent(event);
    setShowClubDetailModal(true);
  };

  const getClubEventCount = (event) => {
    return event.participants + (clubEventParticipants[event.id] ? 1 : 0);
  };

  const calendar = generateCalendar();

  return (
    <div className="pt-16 min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">일정</h1>
          <p className="text-xl">대회 및 클럽 일정을 확인하세요</p>
        </div>
      </div>

      {/* 캘린더 */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <CalIcon className="w-8 h-8 text-blue-500" />
          2025년 11월
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
          <div className="grid grid-cols-7 gap-2">
            {['일', '월', '화', '수', '목', '금', '토'].map(day => (
              <div key={day} className="text-center font-bold text-lg py-3 text-gray-900 dark:text-white">{day}</div>
            ))}
            {calendar.map((day, idx) => {
              if (!day) return <div key={`empty-${idx}`} />;
              const events = getEventsForDate(day);
              return (
                <div key={day} className="min-h-[100px] border rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-700">
                  <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">{day}</div>
                  {events.map(e => (
                    <div key={e.id} className={`text-xs px-2 py-1 rounded mb-1 ${
                      e.type === 'tournament' ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300' : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                    }`}>
                      {e.title.length > 15 ? e.title.substring(0, 15) + '...' : e.title}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 클럽 일정 (최신 1개) - 참가 버튼 추가 */}
      {upcomingClubEvent && (
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">📅 다가오는 클럽 일정</h2>
            <Link
              to="/club-event-form"
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-bold hover:shadow-xl transition-all transform hover:scale-105 flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              클럽 일정 등록
            </Link>
          </div>
          
          {/* 메인 클럽 일정 */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl shadow-xl p-8 text-white mb-6">
            <div className="flex items-start gap-6">
              <div className="text-6xl">{upcomingClubEvent.image}</div>
              <div className="flex-1">
                <h3 className="text-3xl font-bold mb-4">{upcomingClubEvent.title}</h3>
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <CalIcon className="w-5 h-5" />
                    <span>{upcomingClubEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{upcomingClubEvent.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    <span>{upcomingClubEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{getClubEventCount(upcomingClubEvent)}명 참가</span>
                  </div>
                </div>
                <p className="text-lg opacity-90 mb-6">{upcomingClubEvent.club}</p>
                
                {/* 참가 버튼 */}
                <button 
                  onClick={() => handleClubEventParticipate(upcomingClubEvent.id)}
                  className={`px-8 py-3 rounded-xl font-bold text-lg transition-all ${
                    clubEventParticipants[upcomingClubEvent.id]
                      ? 'bg-green-600 hover:bg-green-700'
                      : 'bg-white text-blue-500 hover:bg-gray-100'
                  }`}
                >
                  {clubEventParticipants[upcomingClubEvent.id] ? '✓ 참가 완료' : '참가하기'}
                </button>
              </div>
            </div>
          </div>

          {/* 다음 3개 클럽 일정 - 간단 버전 */}
          {nextClubEvents.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4">
              {nextClubEvents.map(event => (
                <div key={event.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-3xl">{event.image}</div>
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white">{event.title}</h3>
                  </div>
                  
                  <div className="space-y-2 mb-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-2">
                      <CalIcon className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{event.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleClubDetail(event)}
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all"
                  >
                    상세
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 대회 목록 - 1개 컬럼으로 날짜순 정렬 */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-8">🏆 대회</h2>
        <div className="space-y-6">
          {sortedTournaments.map(event => (
            <div key={event.id} className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
              <div className="md:flex">
                {/* Left Side - Tournament Info */}
                <div className="bg-gradient-to-r from-red-500 to-orange-500 p-8 text-white md:w-2/5">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-6xl">{event.image}</div>
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                      <p className="opacity-90">{event.organizer}</p>
                    </div>
                  </div>
                  {event.status && (
                    <div className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-4 ${
                      event.status === '종료됨' ? 'bg-gray-700/70' : 'bg-green-600'
                    }`}>
                      {event.status}
                    </div>
                  )}
                  <div className="space-y-3 mt-6">
                    <div className="flex items-center gap-2">
                      <CalIcon className="w-5 h-5" />
                      <span>{event.date} ~ {event.endDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      <span>{event.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      <span>{event.participants > 0 ? `${event.participants}명 참가 예정` : '참가자 정보 확인 중'}</span>
                    </div>
                  </div>
                </div>
                
                {/* Right Side - Actions */}
                <div className="p-8 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">{event.description}</p>
                  </div>
                  
                  <div className="space-y-3">
                    {/* 공식 웹사이트 */}
                    <a href={event.website} target="_blank" rel="noopener noreferrer"
                      className="block w-full text-center bg-purple-500 text-white py-3 rounded-xl font-semibold hover:bg-purple-600 transition-all">
                      <ExternalLink className="w-5 h-5 inline mr-2" />
                      공식 웹사이트
                    </a>
                    
                    {/* 참가 버튼 */}
                    <button onClick={() => handleParticipate(event)}
                      className="w-full bg-blue-500 text-white py-3 rounded-xl font-semibold hover:bg-blue-600 transition-all">
                      <UserPlus className="w-5 h-5 inline mr-2" />
                      참가 예정
                    </button>
                    
                    {/* 팀빌딩 */}
                    <a href="/team"
                      className="block w-full text-center bg-green-500 text-white py-3 rounded-xl font-semibold hover:bg-green-600 transition-all">
                      <Users className="w-5 h-5 inline mr-2" />
                      팀빌딩
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 참가 신청 모달 */}
      {showParticipateModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowParticipateModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-8" onClick={e => e.stopPropagation()}>
            <h2 className="text-2xl font-bold mb-6">참가 예정</h2>
            <form onSubmit={submitParticipation} className="space-y-4">
              <div>
                <label className="block font-semibold mb-2">이름 *</label>
                <input type="text" required value={participantName} onChange={e => setParticipantName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900" placeholder="홍길동" />
              </div>
              <div>
                <label className="block font-semibold mb-2">국가 *</label>
                <select required value={participantCountry} onChange={e => setParticipantCountry(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border bg-white dark:bg-gray-900">
                  <option value="">선택하세요</option>
                  <option value="KR">🇰🇷 대한민국</option>
                  <option value="JP">🇯🇵 일본</option>
                  <option value="CN">🇨🇳 중국</option>
                  <option value="SG">🇸🇬 싱가포르</option>
                  <option value="PH">🇵🇭 필리핀</option>
                </select>
              </div>
              <div className="pt-4">
                <button type="submit" className="w-full bg-blue-500 text-white py-3 rounded-xl font-bold hover:bg-blue-600">
                  신청 완료
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 클럽 일정 상세보기 모달 */}
      {showClubDetailModal && selectedEvent && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowClubDetailModal(false)}>
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-500 to-cyan-500 p-6 text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="text-5xl">{selectedEvent.image}</div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
                    <p className="opacity-90">{selectedEvent.club}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowClubDetailModal(false)}
                  className="p-2 hover:bg-white/20 rounded-lg transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CalIcon className="w-5 h-5 text-blue-500 mt-1" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">날짜</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.date}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-green-500 mt-1" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">시간</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.time}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">위치</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.location}</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-500 mt-1" />
                  <div>
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">참가자</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">{getClubEventCount(selectedEvent)}명</div>
                  </div>
                </div>
              </div>

              {/* Pool Name */}
              {selectedEvent.poolName && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">🏊 수영장</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.poolName}</div>
                </div>
              )}

              {/* Description */}
              {selectedEvent.description && (
                <div className="p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">📝 일정 설명</div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.description}</p>
                </div>
              )}

              {/* Note */}
              {selectedEvent.note && (
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">💡 참고사항</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">{selectedEvent.note}</div>
                </div>
              )}

              {/* Contact */}
              {selectedEvent.contactEmail && (
                <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
                  <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">📧 문의</div>
                  <a href={`mailto:${selectedEvent.contactEmail}`} className="text-sm text-blue-600 dark:text-blue-400 hover:underline">
                    {selectedEvent.contactEmail}
                  </a>
                </div>
              )}

              {/* Action Button */}
              <div className="pt-4 border-t">
                <button 
                  onClick={() => {
                    handleClubEventParticipate(selectedEvent.id);
                    setShowClubDetailModal(false);
                  }}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${
                    clubEventParticipants[selectedEvent.id]
                      ? 'bg-green-600 hover:bg-green-700 text-white'
                      : 'bg-gradient-to-r from-blue-500 to-cyan-500 hover:shadow-xl text-white'
                  }`}
                >
                  {clubEventParticipants[selectedEvent.id] ? '✓ 참가 완료' : '참가하기'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Events;
