// src/utils/eventStorage.js - 이벤트 데이터 관리 유틸리티

/**
 * 로컬 스토리지에서 클럽 이벤트 가져오기
 */
export const getClubEvents = () => {
  try {
    const saved = localStorage.getItem('clubEvents');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load club events:', error);
    return [];
  }
};

/**
 * 클럽 이벤트 추가
 */
export const addClubEvent = (eventData) => {
  try {
    const existingEvents = getClubEvents();
    
    const newEvent = {
      id: Date.now(),
      ...eventData,
      participants: 0,
      type: 'club',
      createdAt: new Date().toISOString()
    };
    
    const updatedEvents = [...existingEvents, newEvent];
    localStorage.setItem('clubEvents', JSON.stringify(updatedEvents));
    
    return { success: true, event: newEvent };
  } catch (error) {
    console.error('Failed to add club event:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 클럽 이벤트 삭제
 */
export const deleteClubEvent = (eventId) => {
  try {
    const existingEvents = getClubEvents();
    const updatedEvents = existingEvents.filter(event => event.id !== eventId);
    localStorage.setItem('clubEvents', JSON.stringify(updatedEvents));
    
    return { success: true };
  } catch (error) {
    console.error('Failed to delete club event:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 클럽 이벤트 수정
 */
export const updateClubEvent = (eventId, updatedData) => {
  try {
    const existingEvents = getClubEvents();
    const updatedEvents = existingEvents.map(event =>
      event.id === eventId
        ? { ...event, ...updatedData, updatedAt: new Date().toISOString() }
        : event
    );
    
    localStorage.setItem('clubEvents', JSON.stringify(updatedEvents));
    
    return { success: true };
  } catch (error) {
    console.error('Failed to update club event:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 특정 날짜의 이벤트 가져오기
 */
export const getEventsByDate = (date) => {
  const events = getClubEvents();
  return events.filter(event => event.date === date);
};

/**
 * 다가오는 이벤트 가져오기 (날짜순 정렬)
 */
export const getUpcomingEvents = (limit = null) => {
  const events = getClubEvents();
  const today = new Date().toISOString().split('T')[0];
  
  const upcomingEvents = events
    .filter(event => event.date >= today)
    .sort((a, b) => new Date(a.date) - new Date(b.date));
  
  return limit ? upcomingEvents.slice(0, limit) : upcomingEvents;
};

/**
 * 모든 데이터 초기화 (개발/테스트용)
 */
export const clearAllEvents = () => {
  try {
    localStorage.removeItem('clubEvents');
    return { success: true };
  } catch (error) {
    console.error('Failed to clear events:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 참가자 수 증가
 */
export const incrementParticipants = (eventId) => {
  try {
    const existingEvents = getClubEvents();
    const updatedEvents = existingEvents.map(event =>
      event.id === eventId
        ? { ...event, participants: (event.participants || 0) + 1 }
        : event
    );
    
    localStorage.setItem('clubEvents', JSON.stringify(updatedEvents));
    return { success: true };
  } catch (error) {
    console.error('Failed to increment participants:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 참가자 수 감소
 */
export const decrementParticipants = (eventId) => {
  try {
    const existingEvents = getClubEvents();
    const updatedEvents = existingEvents.map(event =>
      event.id === eventId
        ? { ...event, participants: Math.max((event.participants || 0) - 1, 0) }
        : event
    );
    
    localStorage.setItem('clubEvents', JSON.stringify(updatedEvents));
    return { success: true };
  } catch (error) {
    console.error('Failed to decrement participants:', error);
    return { success: false, error: error.message };
  }
};

/**
 * 이벤트 검색
 */
export const searchEvents = (searchTerm) => {
  const events = getClubEvents();
  const term = searchTerm.toLowerCase();
  
  return events.filter(event =>
    event.title?.toLowerCase().includes(term) ||
    event.club?.toLowerCase().includes(term) ||
    event.location?.toLowerCase().includes(term) ||
    event.description?.toLowerCase().includes(term)
  );
};

/**
 * 날짜 범위로 이벤트 필터링
 */
export const getEventsByDateRange = (startDate, endDate) => {
  const events = getClubEvents();
  
  return events.filter(event => 
    event.date >= startDate && event.date <= endDate
  ).sort((a, b) => new Date(a.date) - new Date(b.date));
};

/**
 * 통계 정보 가져오기
 */
export const getEventStats = () => {
  const events = getClubEvents();
  const today = new Date().toISOString().split('T')[0];
  
  return {
    total: events.length,
    upcoming: events.filter(e => e.date >= today).length,
    past: events.filter(e => e.date < today).length,
    totalParticipants: events.reduce((sum, e) => sum + (e.participants || 0), 0),
    clubs: [...new Set(events.map(e => e.club))].length
  };
};

// 기본 내보내기
export default {
  getClubEvents,
  addClubEvent,
  deleteClubEvent,
  updateClubEvent,
  getEventsByDate,
  getUpcomingEvents,
  clearAllEvents,
  incrementParticipants,
  decrementParticipants,
  searchEvents,
  getEventsByDateRange,
  getEventStats
};
