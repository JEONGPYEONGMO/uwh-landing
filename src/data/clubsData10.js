// src/pages/Clubs.jsx
import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Users, Search, Navigation, Globe } from 'lucide-react';
import MapComponent from '../components/MapComponent';
import { clubsData, continents, getCountriesByContinent, countryFlags } from '../data/clubsData';

const Clubs = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [selectedContinent, setSelectedContinent] = useState('Asia');
  const [selectedCountry, setSelectedCountry] = useState('South Korea');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);

  // 실제 클럽 데이터 사용
  const clubs = clubsData;

  // 선택된 대륙의 국가 목록
  const countriesInContinent = getCountriesByContinent(selectedContinent);

  // 사용자 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            city: '서울' // 실제로는 reverse geocoding으로 도시 이름 가져오기
          });
        },
        (error) => {
          console.log('위치 정보를 가져올 수 없습니다', error);
          // 기본값 설정 (서울)
          setUserLocation({
            lat: 37.5665,
            lng: 126.9780,
            city: '서울'
          });
        }
      );
    } else {
      // 기본값 설정
      setUserLocation({
        lat: 37.5665,
        lng: 126.9780,
        city: '서울'
      });
    }
  }, []);

  // 국가 목록
  const koreaRegions = ['all', 'Seoul', 'Busan', 'Incheon', 'Daejeon', 'Gwangju'];
  const regionNames = {
    all: '전체',
    Seoul: '서울',
    Busan: '부산',
    Incheon: '인천',
    Daejeon: '대전',
    Gwangju: '광주'
  };

  // 필터링된 클럽
  const filteredClubs = clubs.filter(club => {
    const matchesContinent = club.continent === selectedContinent;
    const matchesCountry = club.country === selectedCountry;
    const matchesRegion = selectedRegion === 'all' || club.region === selectedRegion;
    const matchesSearch = club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          club.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          club.region.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesContinent && matchesCountry && matchesRegion && matchesSearch;
  });

  // 거리 계산 (간단한 유클리드 거리)
  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // 거리별로 정렬
  const sortedClubs = userLocation 
    ? filteredClubs.map(club => ({
        ...club,
        distance: calculateDistance(
          userLocation.lat, 
          userLocation.lng, 
          club.lat, 
          club.lng
        )
      })).sort((a, b) => a.distance - b.distance)
    : filteredClubs;

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">클럽 찾기</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            가까운 수중하키 클럽을 찾고 함께 플레이하세요
          </p>
          {userLocation && (
            <div className="mt-6 inline-flex items-center gap-2 bg-white bg-opacity-20 backdrop-blur px-6 py-3 rounded-full">
              <Navigation className="w-5 h-5" />
              <span className="font-semibold">현재 위치: {userLocation.city}</span>
            </div>
          )}
        </div>
      </div>

      {/* Search & Filter */}
      <div className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="클럽명 또는 지역 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Continent Filters */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">대륙</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {continents.map((continent) => (
                  <button
                    key={continent.id}
                    onClick={() => {
                      setSelectedContinent(continent.id);
                      const firstCountry = getCountriesByContinent(continent.id)[0];
                      setSelectedCountry(firstCountry);
                      setSelectedRegion('all');
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                      selectedContinent === continent.id
                        ? `bg-gradient-to-r ${continent.color} text-white shadow-lg`
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <span className="text-xl">{continent.emoji}</span>
                    {continent.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Country Filters */}
            <div>
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">국가</span>
              <div className="flex gap-2 overflow-x-auto pb-2">
                {countriesInContinent.map((country) => (
                  <button
                    key={country}
                    onClick={() => {
                      setSelectedCountry(country);
                      setSelectedRegion('all');
                    }}
                    className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                      selectedCountry === country
                        ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    {countryFlags[country]} {country}
                  </button>
                ))}
              </div>
            </div>

            {/* Region Filters (only for South Korea) */}
            {selectedCountry === 'South Korea' && (
              <div>
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block">지역</span>
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {koreaRegions.map((region) => (
                    <button
                      key={region}
                      onClick={() => setSelectedRegion(region)}
                      className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition-all ${
                        selectedRegion === region
                          ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {regionNames[region]}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map & Clubs */}
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Map with Real Google Maps */}
            <div className="lg:sticky lg:top-32 h-[600px]">
              <MapComponent 
                clubs={sortedClubs}
                userLocation={userLocation}
                selectedClub={selectedClub}
                onClubSelect={setSelectedClub}
              />
            </div>

            {/* Clubs List */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  클럽 목록 ({sortedClubs.length}개)
                </h2>
              </div>

              {sortedClubs.map((club) => (
                <div
                  key={club.id}
                  className={`bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all border-2 cursor-pointer ${
                    selectedClub?.id === club.id
                      ? 'border-blue-500'
                      : 'border-gray-200 dark:border-gray-700'
                  }`}
                  onClick={() => setSelectedClub(club)}
                >
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                            {club.name}
                          </h3>
                          <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-semibold">
                            {countryFlags[club.country]} {club.country}
                          </span>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">
                          {club.description}
                        </p>
                        {club.established && (
                          <p className="text-xs text-gray-500 dark:text-gray-500">
                            🏛️ 설립: {club.established}
                          </p>
                        )}
                      </div>
                      {club.distance && (
                        <div className="text-right ml-4">
                          <div className="text-2xl font-bold text-blue-500">
                            {club.distance.toFixed(1)}km
                          </div>
                          <div className="text-xs text-gray-500">거리</div>
                        </div>
                      )}
                    </div>

                    {/* Info Grid */}
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {club.address}
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Phone className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {club.phone}
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {club.schedule}
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Users className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {club.members}명 · {club.level}
                        </div>
                      </div>
                    </div>

                    {/* Facilities */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {club.facilities.map((facility, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium"
                          >
                            {facility}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <button className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-3 rounded-xl font-bold hover:shadow-lg transition-all">
                        연락하기
                      </button>
                      <button className="px-6 py-3 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-50 dark:hover:bg-gray-700 transition-all">
                        상세보기
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {sortedClubs.length === 0 && (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    검색 결과가 없습니다
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    다른 지역이나 검색어를 시도해보세요
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            클럽을 등록하고 싶으세요?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            여러분의 클럽을 UWH에 등록하고 더 많은 플레이어를 만나보세요!
          </p>
          <button className="bg-white text-blue-600 px-10 py-5 rounded-xl font-bold text-lg hover:shadow-2xl transition-all transform hover:scale-105">
            클럽 등록하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default Clubs;