// Map 페이지 (지도 Placeholder)
// UI만 담당: 데이터는 placesService에서 가져옴
// 디자인 변경 포인트: className="map-page" 스타일만 수정하면 됨

import { useEffect, useState } from 'react';
import { AppShell } from '../components/AppShell';
import { getAllPlaces } from '../services/placesService';
import type { Place } from '../mock/places';

export const Map = () => {
  const [selectedPlaceId, setSelectedPlaceId] = useState<string | null>(null);
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPlaces()
      .then((data) => {
        setPlaces(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('장소 목록 로드 실패:', error);
        setLoading(false);
      });
  }, []);

  const selectedPlace = places.find((p) => p.id === selectedPlaceId);

  if (loading) {
    return (
      <AppShell title="지도" showBottomTabs={true}>
        <div className="map-page">
          <p>로딩 중...</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="지도" showBottomTabs={true}>
      <div className="map-page">
        <div className="map-container">
          <div className="map-placeholder">
            <div className="map-placeholder-content">
              <p>🗺️ 지도 영역</p>
              <p className="map-placeholder-hint">마커는 여기 찍힐 예정</p>
              {selectedPlace && (
                <div className="map-placeholder-marker">
                  선택된 장소: {selectedPlace.name}
                </div>
              )}
            </div>
          </div>
          <div className="map-places-list">
            <h3 className="map-places-title">장소 목록</h3>
            {places.map((place) => (
              <div
                key={place.id}
                className={`map-place-item ${selectedPlaceId === place.id ? 'selected' : ''}`}
                onClick={() => setSelectedPlaceId(place.id)}
              >
                <h4>{place.name}</h4>
                <p>{place.area === 'school' ? '🏫 학교' : '🏙️ 동네'} · {place.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
};
