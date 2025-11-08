// src/pages/Travel.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Clock, MessageCircle, Plus, X, Send, User } from 'lucide-react';

const Travel = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [travelers, setTravelers] = useState([
    {
      id: 1,
      name: '김수영',
      startDate: '2025-11-15',
      endDate: '2025-11-20',
      country: '한국',
      city: '제주',
      region: '제주도',
      availableTimes: '오전 9:00-11:00, 오후 3:00-5:00',
      message: '제주도에서 수중하키 같이 하실 분 찾습니다! 초보도 환영합니다 😊',
      note: '장비 대여 가능합니다',
      color: '#3B82F6',
      comments: [
        { 
          id: 1, 
          author: '근처 클럽 추천', 
          text: '📍 제주에서 활동 중인 추천 클럽', 
          clubs: ['제주 마린스', 'Jeju Underwater Sports'],
          isAuto: true,
          timestamp: '자동' 
        },
        { id: 2, author: '박민준', text: '저도 그 기간에 제주 가는데 같이 해요!', timestamp: '2시간 전' }
      ]
    },
    {
      id: 2,
      name: '이서연',
      startDate: '2025-11-25',
      endDate: '2025-11-28',
      country: '한국',
      city: '부산',
      region: '부산',
      availableTimes: '저녁 6:00-8:00',
      message: '부산 출장 가는데 저녁시간에 운동하고 싶어요! 해운대 근처면 좋겠습니다.',
      note: '중급 이상 선호',
      color: '#10B981',
      comments: [
        { 
          id: 1, 
          author: '근처 클럽 추천', 
          text: '📍 부산에서 활동 중인 추천 클럽', 
          clubs: ['Busan Sharks', '해운대 UWH'],
          isAuto: true,
          timestamp: '자동' 
        }
      ]
    }
  ]);

  const [newTraveler, setNewTraveler] = useState({
    name: '',
    startDate: '',
    endDate: '',
    country: '',
    city: '',
    region: '',
    availableTimes: '',
    message: '',
    note: ''
  });

  const [commentInputs, setCommentInputs] = useState({});

  // 지나간 날짜의 여행자 자동 삭제
  useEffect(() => {
    const removeExpiredTravelers = () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // 시간을 00:00:00으로 설정
      const todayStr = today.toISOString().split('T')[0];

      setTravelers(prevTravelers => 
        prevTravelers.filter(traveler => traveler.endDate >= todayStr)
      );
    };

    // 컴포넌트 마운트 시 즉시 실행
    removeExpiredTravelers();

    // 매일 자정에 실행되도록 설정
    const now = new Date();
    const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    const timeUntilMidnight = tomorrow.getTime() - now.getTime();

    const midnightTimeout = setTimeout(() => {
      removeExpiredTravelers();
      
      // 이후 24시간마다 실행
      const dailyInterval = setInterval(removeExpiredTravelers, 24 * 60 * 60 * 1000);
      
      return () => clearInterval(dailyInterval);
    }, timeUntilMidnight);

    return () => clearTimeout(midnightTimeout);
  }, []);

  // 지역별 클럽 데이터베이스
  const clubsByRegion = {
    '일본-도쿄': ['Tokyo Octopush', 'Tokyo Underwater Hockey Club', 'Shibuya Aquatics'],
    '일본-오사카': ['Osaka UWH', 'Kansai Octopush'],
    '일본-후쿠오카': ['Fukuoka Dolphins', 'Kyushu UWH'],
    '싱가포르-싱가포르': ['Singapore SUHC', 'Marina Bay Octopush'],
    '중국-베이징': ['Beijing Eight', 'Capital UWH Club'],
    '중국-상하이': ['Shanghai Sharks', 'Pudong Octopush'],
    '한국-서울': ['Seoul Marines', 'Gangnam UWH'],
    '한국-용인': ['Yongin UWH Club'],
    '한국-부산': ['Busan Sharks', '해운대 UWH'],
    '한국-제주': ['제주 마린스', 'Jeju Underwater Sports'],
    '필리핀-마닐라': ['Manila Marlins', 'BGC Octopush'],
    '태국-방콕': ['Bangkok UWH', 'Siam Octopush']
  };

  // 자동 추천 클럽 가져오기
  const getRecommendedClubs = (country, city) => {
    const key = `${country}-${city}`;
    return clubsByRegion[key] || [];
  };

  // 캘린더 생성 (11월과 12월)
  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const november = generateCalendar(2025, 10);
  const december = generateCalendar(2025, 11);

  // 날짜에 해당하는 여행자 찾기
  const getTravelersForDate = (year, month, day) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayStr = today.toISOString().split('T')[0];
    
    return travelers.filter(t => {
      // endDate가 오늘 이후인 여행자만 표시
      return dateStr >= t.startDate && dateStr <= t.endDate && t.endDate >= todayStr;
    });
  };

  // 여행자 추가
  const handleAddTraveler = (e) => {
    e.preventDefault();
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    
    // 추천 클럽 가져오기
    const recommendedClubs = getRecommendedClubs(newTraveler.country, newTraveler.city);
    
    // 자동 추천 댓글 생성
    const autoComment = recommendedClubs.length > 0 ? [{
      id: 1,
      author: '근처 클럽 추천',
      text: `📍 ${newTraveler.city}에서 활동 중인 추천 클럽`,
      clubs: recommendedClubs,
      isAuto: true,
      timestamp: '자동'
    }] : [];
    
    const newTravelerData = {
      ...newTraveler,
      id: Date.now(),
      color: colors[travelers.length % colors.length],
      comments: autoComment
    };
    
    setTravelers([...travelers, newTravelerData]);
    setShowAddForm(false);
    setNewTraveler({
      name: '',
      startDate: '',
      endDate: '',
      country: '',
      city: '',
      region: '',
      availableTimes: '',
      message: '',
      note: ''
    });
    alert('여행자 정보가 등록되었습니다!');
  };

  // 댓글 추가
  const handleAddComment = (travelerId) => {
    const commentText = commentInputs[travelerId];
    if (!commentText || !commentText.trim()) return;

    setTravelers(travelers.map(t => {
      if (t.id === travelerId) {
        return {
          ...t,
          comments: [...t.comments, {
            id: t.comments.length + 1,
            author: '익명',
            text: commentText,
            timestamp: '방금 전'
          }]
        };
      }
      return t;
    }));

    setCommentInputs({ ...commentInputs, [travelerId]: '' });
  };

  const CalendarMonth = ({ year, month, monthName, days }) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
        {monthName}
      </h3>
      <div className="grid grid-cols-7 gap-2">
        {['일', '월', '화', '수', '목', '금', '토'].map(day => (
          <div key={day} className="text-center text-sm font-semibold text-gray-600 dark:text-gray-400 py-2">
            {day}
          </div>
        ))}
        {days.map((day, idx) => {
          if (day === null) {
            return <div key={`empty-${idx}`} className="aspect-square" />;
          }
          const dayTravelers = getTravelersForDate(year, month, day);
          return (
            <div
              key={day}
              className="aspect-square border border-gray-200 dark:border-gray-700 rounded-lg p-1 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all cursor-pointer relative"
            >
              <div className="text-sm font-semibold text-gray-900 dark:text-white">
                {day}
              </div>
              {dayTravelers.length > 0 && (
                <div className="mt-1 space-y-0.5">
                  {dayTravelers.map(traveler => (
                    <div
                      key={traveler.id}
                      className="text-xs px-1 py-0.5 rounded"
                      style={{ backgroundColor: traveler.color, color: 'white' }}
                      title={`${traveler.name} - ${traveler.country} ${traveler.city}`}
                    >
                      <div className="truncate font-semibold">{traveler.name}</div>
                      <div className="truncate text-[10px] opacity-90">
                        {traveler.country} {traveler.city}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <MapPin className="w-4 h-4" />
            여행하며 수중하키를!
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">UWH 여행자</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            여행지에서 수중하키를 함께할 동료를 찾아보세요
          </p>
        </div>
      </div>

      {/* Calendar Section */}
      <div className="py-12 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-2">
            <Calendar className="w-8 h-8 text-blue-500" />
            여행 일정
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <CalendarMonth year={2025} month={10} monthName="2025년 11월" days={november} />
            <CalendarMonth year={2025} month={11} monthName="2025년 12월" days={december} />
          </div>
        </div>
      </div>

      {/* Travelers Section */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            여행자 목록
          </h2>

          {/* Add Form Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    여행자 등록
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleAddTraveler} className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        이름 *
                      </label>
                      <input
                        type="text"
                        value={newTraveler.name}
                        onChange={(e) => setNewTraveler({ ...newTraveler, name: e.target.value })}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          국가 *
                        </label>
                        <input
                          type="text"
                          value={newTraveler.country}
                          onChange={(e) => setNewTraveler({ ...newTraveler, country: e.target.value })}
                          required
                          placeholder="예: 일본, 한국"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          도시 *
                        </label>
                        <input
                          type="text"
                          value={newTraveler.city}
                          onChange={(e) => setNewTraveler({ ...newTraveler, city: e.target.value })}
                          required
                          placeholder="예: 도쿄, 서울"
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        여행 지역 *
                      </label>
                      <input
                        type="text"
                        value={newTraveler.region}
                        onChange={(e) => setNewTraveler({ ...newTraveler, region: e.target.value })}
                        required
                        placeholder="상세 지역 (선택사항)"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          여행 시작일 *
                        </label>
                        <input
                          type="date"
                          value={newTraveler.startDate}
                          onChange={(e) => setNewTraveler({ ...newTraveler, startDate: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                          여행 종료일 *
                        </label>
                        <input
                          type="date"
                          value={newTraveler.endDate}
                          onChange={(e) => setNewTraveler({ ...newTraveler, endDate: e.target.value })}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      운동 가능 날짜/시간 *
                    </label>
                    <input
                      type="text"
                      value={newTraveler.availableTimes}
                      onChange={(e) => setNewTraveler({ ...newTraveler, availableTimes: e.target.value })}
                      required
                      placeholder="예: 오전 9:00-11:00, 오후 3:00-5:00"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      하고 싶은 말 *
                    </label>
                    <textarea
                      value={newTraveler.message}
                      onChange={(e) => setNewTraveler({ ...newTraveler, message: e.target.value })}
                      required
                      rows="3"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      기타 사항
                    </label>
                    <textarea
                      value={newTraveler.note}
                      onChange={(e) => setNewTraveler({ ...newTraveler, note: e.target.value })}
                      rows="2"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 resize-none"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
                  >
                    등록하기
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
            {/* Existing Travelers */}
            {travelers
              .filter(traveler => {
                // endDate가 오늘 이후인 여행자만 표시
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                const todayStr = today.toISOString().split('T')[0];
                return traveler.endDate >= todayStr;
              })
              .map((traveler) => (
              <div
                key={traveler.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border-t-4"
                style={{ borderTopColor: traveler.color }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                      style={{ backgroundColor: traveler.color }}
                    >
                      {traveler.name[0]}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {traveler.name}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {traveler.startDate} ~ {traveler.endDate}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          여행 지역
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {traveler.region}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <Clock className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          운동 가능 시간
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {traveler.availableTimes}
                        </div>
                      </div>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                        💬 하고 싶은 말
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {traveler.message}
                      </p>
                    </div>

                    {traveler.note && (
                      <div className="text-xs text-gray-500 dark:text-gray-500">
                        📌 {traveler.note}
                      </div>
                    )}
                  </div>

                  {/* Comments Section */}
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      💬 댓글 ({traveler.comments.length})
                    </div>

                    {traveler.comments.map(comment => (
                      <div 
                        key={comment.id} 
                        className={`mb-2 p-3 rounded-lg ${
                          comment.isAuto 
                            ? 'bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border border-blue-200 dark:border-blue-800' 
                            : 'bg-gray-50 dark:bg-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-sm font-semibold ${
                            comment.isAuto ? 'text-blue-600 dark:text-blue-400' : 'text-gray-900 dark:text-white'
                          }`}>
                            {comment.author}
                          </span>
                          <span className="text-xs text-gray-500">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {comment.text}
                        </p>
                        {comment.clubs && comment.clubs.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {comment.clubs.map((club, idx) => (
                              <span 
                                key={idx}
                                className="inline-flex items-center gap-1 px-3 py-1 bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-700 rounded-full text-xs font-medium text-blue-600 dark:text-blue-400"
                              >
                                🏊 {club}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    <div className="flex gap-2 mt-2">
                      <input
                        type="text"
                        placeholder="댓글을 입력하세요..."
                        value={commentInputs[traveler.id] || ''}
                        onChange={(e) => setCommentInputs({ ...commentInputs, [traveler.id]: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' && handleAddComment(traveler.id)}
                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                      />
                      <button
                        onClick={() => handleAddComment(traveler.id)}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
                      >
                        <Send className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Traveler Card */}
            <div
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-dashed border-blue-300 dark:border-blue-700 cursor-pointer group"
            >
              <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Plus className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  여행자 등록
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  여행 일정을 공유하고<br />
                  함께 운동할 동료를 찾아보세요!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Travel;
