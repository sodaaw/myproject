// Compare 페이지 (장소 비교)
// UI만 담당: 데이터는 placesService에서 가져옴
// 디자인 변경 포인트: className="compare-page" 스타일만 수정하면 됨

import { useEffect, useState } from 'react';
import { AppShell } from '../components/AppShell';
import { getAllPlaces } from '../services/placesService';
import type { Place } from '../mock/places';

export const Compare = () => {
  const [placeAId, setPlaceAId] = useState<string>('');
  const [placeBId, setPlaceBId] = useState<string>('');
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

  const placeA = places.find((p) => p.id === placeAId);
  const placeB = places.find((p) => p.id === placeBId);

  const renderComparisonRow = (label: string, getValue: (place: Place) => string | number) => {
    return (
      <tr className="compare-row">
        <td className="compare-label">{label}</td>
        <td className="compare-value">{placeA ? getValue(placeA) : '-'}</td>
        <td className="compare-value">{placeB ? getValue(placeB) : '-'}</td>
      </tr>
    );
  };

  if (loading) {
    return (
      <AppShell title="장소 비교" showBottomTabs={false}>
        <div className="compare-page">
          <p>로딩 중...</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell title="장소 비교" showBottomTabs={false}>
      <div className="compare-page">
        <h2 className="compare-title">장소 비교</h2>
        <div className="compare-selectors">
          <div className="compare-selector">
            <label htmlFor="place-a">장소 A</label>
            <select
              id="place-a"
              value={placeAId}
              onChange={(e) => setPlaceAId(e.target.value)}
              className="compare-select"
            >
              <option value="">선택하세요</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          </div>
          <div className="compare-selector">
            <label htmlFor="place-b">장소 B</label>
            <select
              id="place-b"
              value={placeBId}
              onChange={(e) => setPlaceBId(e.target.value)}
              className="compare-select"
            >
              <option value="">선택하세요</option>
              {places.map((place) => (
                <option key={place.id} value={place.id}>
                  {place.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {(placeA || placeB) && (
          <div className="compare-table-container">
            <table className="compare-table">
              <thead>
                <tr>
                  <th className="compare-header">항목</th>
                  <th className="compare-header">{placeA?.name || '장소 A'}</th>
                  <th className="compare-header">{placeB?.name || '장소 B'}</th>
                </tr>
              </thead>
              <tbody>
                {renderComparisonRow('이름', (p) => p.name)}
                {renderComparisonRow('지역', (p) => (p.area === 'school' ? '학교' : '동네'))}
                {renderComparisonRow('타입', (p) => p.type)}
                {renderComparisonRow('아이스 아메리카노 가격', (p) => (p.ice_americano_price === 0 ? '무료' : `₩${p.ice_americano_price.toLocaleString()}`))}
                {renderComparisonRow('소음 수준', (p) => (p.noise_level === 1 ? '조용함' : p.noise_level === 2 ? '보통' : '시끄러움'))}
                {renderComparisonRow('자리 안정성', (p) => (p.seat_reliability === 1 ? '항상 있음' : p.seat_reliability === 2 ? '보통' : '없을 때 많음'))}
                {renderComparisonRow('콘센트 점수', (p) => `${p.outlet_score}/5`)}
                {renderComparisonRow('와이파이 속도', (p) => `${p.wifi_speed} Mbps`)}
                {renderComparisonRow('비용 수준', (p) => (p.cost_level === 1 ? '저렴함' : p.cost_level === 2 ? '보통' : '비쌈'))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AppShell>
  );
};
