// src/components/MapComponent.jsx
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const MapComponent = ({ clubs, userLocation, selectedClub, onClubSelect }) => {
  const [activeMarker, setActiveMarker] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // API 키 체크
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  // 지도 스타일
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    borderRadius: '1rem'
  };

  // 지도 기본 중심 (사용자 위치 또는 서울)
  const center = userLocation 
    ? { lat: userLocation.lat, lng: userLocation.lng }
    : { lat: 37.5665, lng: 126.9780 };

  // 지도 옵션
  const mapOptions = {
    disableDefaultUI: false,
    zoomControl: true,
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      }
    ]
  };

  const handleMarkerClick = (club) => {
    setActiveMarker(club.id);
    onClubSelect(club);
  };

  // API 키가 없으면 플레이스홀더 표시
  if (!apiKey) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 h-full overflow-hidden">
        <div className="h-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-800 dark:to-gray-900">
          <div className="text-8xl mb-4">🗺️</div>
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            지도 준비 중
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
            {clubs.length}개의 클럽 위치
          </p>
          <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-300 dark:border-yellow-700 rounded-lg p-4 max-w-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 text-center">
              💡 Google Maps API 키를 <code className="bg-yellow-200 dark:bg-yellow-800 px-2 py-1 rounded">.env</code> 파일에 추가하면 실제 지도가 표시됩니다!
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <LoadScript 
      googleMapsApiKey={apiKey}
      onLoad={() => setMapLoaded(true)}
      onError={() => console.error('Google Maps 로드 실패')}
    >
      {mapLoaded ? (
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
          options={mapOptions}
        >
          {/* 사용자 위치 마커 */}
          {userLocation && window.google && (
            <Marker
              position={{ lat: userLocation.lat, lng: userLocation.lng }}
              icon={{
                path: window.google.maps.SymbolPath.CIRCLE,
                scale: 10,
                fillColor: '#3B82F6',
                fillOpacity: 1,
                strokeColor: '#ffffff',
                strokeWeight: 3
              }}
              title="내 위치"
            />
          )}

          {/* 클럽 마커들 */}
          {clubs.map((club) => (
            <Marker
              key={club.id}
              position={{ lat: club.lat, lng: club.lng }}
              onClick={() => handleMarkerClick(club)}
              icon={
                window.google ? {
                  url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
                    <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="20" cy="20" r="18" fill="${selectedClub?.id === club.id ? '#06B6D4' : '#10B981'}" stroke="white" stroke-width="3"/>
                      <text x="20" y="26" text-anchor="middle" font-size="20" fill="white">🏒</text>
                    </svg>
                  `),
                  scaledSize: new window.google.maps.Size(40, 40)
                } : undefined
              }
            />
          ))}

          {/* 정보 창 */}
          {activeMarker && (
            <InfoWindow
              position={{
                lat: clubs.find(c => c.id === activeMarker).lat,
                lng: clubs.find(c => c.id === activeMarker).lng
              }}
              onCloseClick={() => setActiveMarker(null)}
            >
              <div className="p-2">
                <h3 className="font-bold text-lg mb-1">
                  {clubs.find(c => c.id === activeMarker).name}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {clubs.find(c => c.id === activeMarker).address}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  👥 {clubs.find(c => c.id === activeMarker).members}명
                </p>
                <p className="text-sm text-gray-600">
                  📞 {clubs.find(c => c.id === activeMarker).phone}
                </p>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      ) : (
        <div className="h-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-2xl">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 dark:text-gray-400">지도 로딩 중...</p>
          </div>
        </div>
      )}
    </LoadScript>
  );
};

export default MapComponent;