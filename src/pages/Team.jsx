// src/pages/Team.jsx
import React, { useState } from 'react';
import { Users, Search, MapPin, Trophy, MessageCircle, UserPlus, Filter, Star, TrendingUp, Award, Plus, X, Trash2, ArrowRight } from 'lucide-react';

const Team = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [teams, setTeams] = useState([
    {
      id: 1,
      name: '서울 마린스',
      region: 'South Korea',
      city: '서울',
      level: 'advanced',
      members: 18,
      captain: '김태현',
      founded: 2018,
      wins: 45,
      achievements: ['2023 전국대회 우승', '아시안컵 준우승'],
      training: '화/목/토 19:00-21:00',
      pool: '올림픽공원 수영장',
      description: '서울 최고의 수중하키 팀. 열정적인 플레이어들이 모여 있습니다.',
      looking: true,
      positions: ['공격수', '수비수'],
      image: '🏆'
    },
    {
      id: 2,
      name: '부산 웨이브스',
      region: 'South Korea',
      city: '부산',
      level: 'intermediate',
      members: 15,
      captain: '박수진',
      founded: 2020,
      wins: 28,
      achievements: ['부산지역 리그 1위'],
      training: '수/금/일 18:00-20:00',
      pool: '해운대 스포츠센터',
      description: '부산을 대표하는 팀. 초중급 선수들에게 적합합니다.',
      looking: true,
      positions: ['골키퍼', '미드필더'],
      image: '🌊'
    }
  ]);

  const [newTeam, setNewTeam] = useState({
    name: '',
    region: 'South Korea',
    city: '',
    level: 'beginner',
    members: '',
    captain: '',
    founded: new Date().getFullYear(),
    wins: 0,
    achievements: [],
    training: '',
    pool: '',
    description: '',
    looking: true,
    positions: [''],
    image: '⭐'
  });

  const [application, setApplication] = useState({
    name: '',
    age: '',
    gender: 'male',
    phone: '',
    email: '',
    position: '',
    experience: 'beginner',
    message: ''
  });

  // 구인 공고
  const recruitments = [
    {
      id: 1,
      team: '서울 마린스',
      position: '공격수',
      level: '중급 이상',
      deadline: '2025-12-31',
      type: 'urgent'
    },
    {
      id: 2,
      team: '부산 웨이브스',
      position: '골키퍼',
      level: '초급 가능',
      deadline: '2025-12-25',
      type: 'normal'
    },
    {
      id: 3,
      team: '인천 샤크스',
      position: '전 포지션',
      level: '초보자 환영',
      deadline: '2026-01-15',
      type: 'normal'
    }
  ];

  const regions = ['all', 'South Korea', 'United States', 'United Kingdom', 'Australia', 'Canada', 'Japan', 'China', 'Singapore'];
  const regionLabels = {
    all: '🌍 전체',
    'South Korea': '🇰🇷 대한민국',
    'United States': '🇺🇸 미국',
    'United Kingdom': '🇬🇧 영국',
    'Australia': '🇦🇺 호주',
    'Canada': '🇨🇦 캐나다',
    'Japan': '🇯🇵 일본',
    'China': '🇨🇳 중국',
    'Singapore': '🇸🇬 싱가포르'
  };

  const categories = [
    { id: 'all', label: '전체', icon: '📋' },
    { id: 'beginner', label: '초급', icon: '🌱' },
    { id: 'intermediate', label: '중급', icon: '⚡' },
    { id: 'advanced', label: '고급', icon: '🏆' }
  ];

  const filteredTeams = teams.filter(team => {
    const matchesCategory = selectedCategory === 'all' || team.level === selectedCategory;
    const matchesRegion = selectedRegion === 'all' || team.region === selectedRegion;
    const matchesSearch = team.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          team.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesRegion && matchesSearch;
  });

  const getLevelLabel = (level) => {
    switch(level) {
      case 'beginner': return '🌱 초급';
      case 'intermediate': return '⚡ 중급';
      case 'advanced': return '🏆 고급';
      default: return level;
    }
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'beginner': return 'from-green-500 to-emerald-500';
      case 'intermediate': return 'from-blue-500 to-cyan-500';
      case 'advanced': return 'from-purple-500 to-pink-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  // 새 팀 추가 핸들러
  const handleAddTeam = (e) => {
    e.preventDefault();
    const newTeamData = {
      ...newTeam,
      id: teams.length + 1,
      members: parseInt(newTeam.members),
      positions: newTeam.positions.filter(p => p.trim() !== '')
    };
    setTeams([...teams, newTeamData]);
    alert('팀이 성공적으로 등록되었습니다!');
    setShowAddForm(false);
    // 폼 초기화
    setNewTeam({
      name: '',
      region: '서울',
      level: 'beginner',
      members: '',
      captain: '',
      founded: new Date().getFullYear(),
      wins: 0,
      achievements: [],
      training: '',
      pool: '',
      description: '',
      looking: true,
      positions: [''],
      image: '⭐'
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeam(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const addPosition = () => {
    setNewTeam(prev => ({
      ...prev,
      positions: [...prev.positions, '']
    }));
  };

  const removePosition = (index) => {
    setNewTeam(prev => ({
      ...prev,
      positions: prev.positions.filter((_, i) => i !== index)
    }));
  };

  const handlePositionChange = (index, value) => {
    setNewTeam(prev => ({
      ...prev,
      positions: prev.positions.map((pos, i) => i === index ? value : pos)
    }));
  };

  // 가입 신청 핸들러
  const handleApplicationSubmit = (e) => {
    e.preventDefault();
    alert(`${selectedTeam.name}에 가입 신청이 완료되었습니다!\n팀장님께서 검토 후 연락드릴 예정입니다.`);
    setShowApplicationForm(false);
    setApplication({
      name: '',
      age: '',
      gender: 'male',
      phone: '',
      email: '',
      position: '',
      experience: 'beginner',
      message: ''
    });
  };

  const handleApplicationChange = (e) => {
    const { name, value } = e.target;
    setApplication(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const openApplicationForm = (team) => {
    setSelectedTeam(team);
    setShowApplicationForm(true);
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Users className="w-4 h-4" />
            팀을 찾거나 팀원을 모집하세요
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">팀 빌딩</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            전국의 수중하키 팀을 찾고, 함께 플레이할 동료를 만나보세요
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-12 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">{teams.length}</div>
              <div className="text-gray-600 dark:text-gray-400">활동 팀</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {teams.reduce((sum, team) => sum + team.members, 0)}
              </div>
              <div className="text-gray-600 dark:text-gray-400">총 플레이어</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {teams.filter(t => t.looking).length}
              </div>
              <div className="text-gray-600 dark:text-gray-400">모집 중인 팀</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-2">
                {new Set(teams.map(t => t.region)).size}
              </div>
              <div className="text-gray-600 dark:text-gray-400">국가</div>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Recruitments */}
      <div className="py-12 bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-orange-500" />
            긴급 모집 공고
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {recruitments.map((rec) => (
              <div
                key={rec.id}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 border-2 ${
                  rec.type === 'urgent' ? 'border-red-500' : 'border-gray-200 dark:border-gray-700'
                } shadow-lg`}
              >
                {rec.type === 'urgent' && (
                  <div className="inline-block px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full mb-3">
                    🔥 긴급
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {rec.team}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Award className="w-4 h-4" />
                    <span>포지션: <strong className="text-gray-900 dark:text-white">{rec.position}</strong></span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <Star className="w-4 h-4" />
                    <span>레벨: {rec.level}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                    <MessageCircle className="w-4 h-4" />
                    <span>마감: {rec.deadline}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-lg font-semibold hover:shadow-lg transition-all">
                  지원하기
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="팀명 또는 설명으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>

            {/* Level Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <span>{cat.icon}</span>
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Region Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                    selectedRegion === region
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {regionLabels[region]}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Teams List */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              팀 목록 ({filteredTeams.length}개)
            </h2>
          </div>

          {/* Application Form Modal */}
          {showApplicationForm && selectedTeam && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        팀 가입 신청
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 mt-1">
                        {selectedTeam.name}에 가입 신청합니다
                      </p>
                    </div>
                    <button
                      onClick={() => setShowApplicationForm(false)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                    >
                      <X className="w-6 h-6 text-gray-500" />
                    </button>
                  </div>
                </div>

                <form onSubmit={handleApplicationSubmit} className="p-6 space-y-4">
                  {/* Team Info */}
                  <div className="bg-gradient-to-r from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-5xl">{selectedTeam.image}</div>
                      <div className="flex-1">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {selectedTeam.name}
                        </h4>
                        <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                          <div>📍 {selectedTeam.city ? `${selectedTeam.city}, ${selectedTeam.region}` : selectedTeam.region} · {selectedTeam.pool}</div>
                          <div>⏰ {selectedTeam.training}</div>
                          <div>👥 모집 포지션: {selectedTeam.positions.join(', ')}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    {/* 이름 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        이름 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={application.name}
                        onChange={handleApplicationChange}
                        required
                        placeholder="홍길동"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* 나이 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        나이 *
                      </label>
                      <input
                        type="number"
                        name="age"
                        value={application.age}
                        onChange={handleApplicationChange}
                        required
                        placeholder="25"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* 성별 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        성별 *
                      </label>
                      <select
                        name="gender"
                        value={application.gender}
                        onChange={handleApplicationChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="male">남성</option>
                        <option value="female">여성</option>
                        <option value="other">기타</option>
                      </select>
                    </div>

                    {/* 전화번호 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        전화번호 *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={application.phone}
                        onChange={handleApplicationChange}
                        required
                        placeholder="010-1234-5678"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* 이메일 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        이메일 *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={application.email}
                        onChange={handleApplicationChange}
                        required
                        placeholder="example@email.com"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* 희망 포지션 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        희망 포지션 *
                      </label>
                      <input
                        type="text"
                        name="position"
                        value={application.position}
                        onChange={handleApplicationChange}
                        required
                        placeholder="예: 공격수"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* 경력 */}
                    <div className="md:col-span-2">
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        수중하키 경력 *
                      </label>
                      <select
                        name="experience"
                        value={application.experience}
                        onChange={handleApplicationChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="beginner">🌱 초보자 (1년 미만)</option>
                        <option value="intermediate">⚡ 중급자 (1-3년)</option>
                        <option value="advanced">🏆 고급자 (3년 이상)</option>
                        <option value="none">처음 시작합니다</option>
                      </select>
                    </div>
                  </div>

                  {/* 자기소개 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      자기소개 및 가입 동기 *
                    </label>
                    <textarea
                      name="message"
                      value={application.message}
                      onChange={handleApplicationChange}
                      required
                      rows="4"
                      placeholder="자기소개와 팀에 가입하고 싶은 이유를 작성해주세요..."
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 resize-none"
                    ></textarea>
                  </div>

                  {/* 안내사항 */}
                  <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">💡</div>
                      <div className="flex-1 text-sm text-blue-900 dark:text-blue-200">
                        <p className="font-semibold mb-2">신청 안내</p>
                        <ul className="space-y-1 text-blue-700 dark:text-blue-300">
                          <li>• 신청 후 팀장님께서 연락처로 연락드립니다</li>
                          <li>• 검토에는 보통 2-3일이 소요됩니다</li>
                          <li>• 체험 훈련 참여 후 최종 가입이 결정됩니다</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105 flex items-center justify-center gap-2"
                  >
                    <UserPlus className="w-5 h-5" />
                    가입 신청하기
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Add Team Form Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    새 팀 등록
                  </h3>
                  <button
                    onClick={() => setShowAddForm(false)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6 text-gray-500" />
                  </button>
                </div>

                <form onSubmit={handleAddTeam} className="p-6 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* 팀명 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        팀명 *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={newTeam.name}
                        onChange={handleInputChange}
                        required
                        placeholder="예: 서울 마린스"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* 국가 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        국가 *
                      </label>
                      <select
                        name="region"
                        value={newTeam.region}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="South Korea">🇰🇷 대한민국</option>
                        <option value="United States">🇺🇸 미국</option>
                        <option value="United Kingdom">🇬🇧 영국</option>
                        <option value="Australia">🇦🇺 호주</option>
                        <option value="Canada">🇨🇦 캐나다</option>
                        <option value="Japan">🇯🇵 일본</option>
                        <option value="China">🇨🇳 중국</option>
                        <option value="Singapore">🇸🇬 싱가포르</option>
                      </select>
                    </div>

                    {/* 도시 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        도시
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={newTeam.city}
                        onChange={handleInputChange}
                        placeholder="예: 서울"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* 레벨 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        팀 레벨 *
                      </label>
                      <select
                        name="level"
                        value={newTeam.level}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      >
                        <option value="beginner">🌱 초급</option>
                        <option value="intermediate">⚡ 중급</option>
                        <option value="advanced">🏆 고급</option>
                      </select>
                    </div>

                    {/* 멤버 수 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        현재 멤버 수 *
                      </label>
                      <input
                        type="number"
                        name="members"
                        value={newTeam.members}
                        onChange={handleInputChange}
                        required
                        placeholder="예: 15"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* 팀장 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        팀장 이름 *
                      </label>
                      <input
                        type="text"
                        name="captain"
                        value={newTeam.captain}
                        onChange={handleInputChange}
                        required
                        placeholder="예: 홍길동"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* 창단 연도 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        창단 연도
                      </label>
                      <input
                        type="number"
                        name="founded"
                        value={newTeam.founded}
                        onChange={handleInputChange}
                        placeholder="2024"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* 훈련 일정 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        훈련 일정
                      </label>
                      <input
                        type="text"
                        name="training"
                        value={newTeam.training}
                        onChange={handleInputChange}
                        placeholder="예: 화/목/토 19:00-21:00"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>

                    {/* 수영장 */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        사용 수영장
                      </label>
                      <input
                        type="text"
                        name="pool"
                        value={newTeam.pool}
                        onChange={handleInputChange}
                        placeholder="예: 올림픽공원 수영장"
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {/* 팀 소개 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      팀 소개 *
                    </label>
                    <textarea
                      name="description"
                      value={newTeam.description}
                      onChange={handleInputChange}
                      required
                      rows="3"
                      placeholder="팀에 대한 간단한 소개를 작성해주세요"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500 resize-none"
                    ></textarea>
                  </div>

                  {/* 모집 포지션 */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-2">
                      모집 포지션
                    </label>
                    {newTeam.positions.map((position, index) => (
                      <div key={index} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={position}
                          onChange={(e) => handlePositionChange(index, e.target.value)}
                          placeholder="예: 공격수"
                          className="flex-1 px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-orange-500"
                        />
                        <button
                          type="button"
                          onClick={() => removePosition(index)}
                          className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addPosition}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-xl hover:bg-gray-300 dark:hover:bg-gray-600 transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      포지션 추가
                    </button>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105"
                  >
                    팀 등록하기
                  </button>
                </form>
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 기존 팀 카드들 */}
            {filteredTeams.map((team) => (
              <div
                key={team.id}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 overflow-hidden"
              >
                {/* Team Header */}
                <div className={`bg-gradient-to-r ${getLevelColor(team.level)} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-6xl">{team.image}</div>
                    <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                      team.looking ? 'bg-green-500' : 'bg-gray-500'
                    }`}>
                      {team.looking ? '✓ 모집중' : '모집 마감'}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{team.name}</h3>
                  <div className="text-sm opacity-90">{getLevelLabel(team.level)}</div>
                </div>

                {/* Team Info */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {team.description}
                  </p>

                  <div className="space-y-2 mb-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{team.city ? `${team.city}, ${team.region}` : team.region} · {team.pool}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Users className="w-4 h-4" />
                      <span>{team.members}명 · 팀장: {team.captain}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                      <Trophy className="w-4 h-4" />
                      <span>{team.wins}승 · 창단: {team.founded}년</span>
                    </div>
                  </div>

                  {/* Achievements */}
                  {team.achievements.length > 0 && (
                    <div className="mb-4">
                      <div className="text-xs font-semibold text-gray-900 dark:text-white mb-2">
                        🏆 주요 성과
                      </div>
                      <div className="space-y-1">
                        {team.achievements.map((ach, idx) => (
                          <div key={idx} className="text-xs text-gray-600 dark:text-gray-400">
                            • {ach}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Looking for */}
                  {team.looking && (
                    <div className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-xs font-semibold text-green-700 dark:text-green-400 mb-1">
                        👥 모집 포지션
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-300">
                        {team.positions.join(', ')}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button 
                      onClick={() => team.looking ? openApplicationForm(team) : null}
                      className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                    >
                      <UserPlus className="w-5 h-5" />
                      {team.looking ? '가입 신청' : '상세보기'}
                    </button>
                    <button className="px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                      <MessageCircle className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Add New Team Card */}
            <div
              onClick={() => setShowAddForm(true)}
              className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 border-dashed border-orange-300 dark:border-orange-700 overflow-hidden cursor-pointer group"
            >
              <div className="h-full flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Plus className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  새 팀 등록
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  여러분의 팀을 등록하고<br />
                  새로운 멤버를 모집하세요!
                </p>
                <div className="inline-flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold">
                  <span>팀 등록하기</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {filteredTeams.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                검색 결과가 없습니다
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                다른 필터나 검색어를 시도해보세요
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Team;
