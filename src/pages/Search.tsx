// Search 페이지 (검색 및 필터)
// UI만 담당: 필터링 로직은 placesService와 useSearchStore에서 관리
// 디자인 변경 포인트: className="search-page" 스타일만 수정하면 됨

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppShell } from '../components/AppShell';
import { PlaceCard } from '../components/PlaceCard';
import { FilterChips } from '../components/FilterChips';
import { useSearchStore } from '../store/useSearchStore';
import { searchPlaces } from '../services/placesService';
import { AREA_FILTERS, TYPE_FILTERS, COST_FILTERS } from '../constants/filters';
import type { Place } from '../mock/places';

export const Search = () => {
  const navigate = useNavigate();
  const {
    query,
    selectedAreas,
    selectedTypes,
    selectedCosts,
    setQuery,
    toggleArea,
    toggleType,
    toggleCost,
  } = useSearchStore();

  const [filteredPlaces, setFilteredPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);

  // 필터 변경 시 검색 실행
  useEffect(() => {
    setLoading(true);
    searchPlaces({
      query: query || undefined,
      areas: selectedAreas.length > 0 ? selectedAreas : undefined,
      types: selectedTypes.length > 0 ? selectedTypes : undefined,
      costLevels: selectedCosts.length > 0 ? selectedCosts : undefined,
    })
      .then((places) => {
        setFilteredPlaces(places);
        setLoading(false);
      })
      .catch((error) => {
        console.error('검색 실패:', error);
        setLoading(false);
      });
  }, [query, selectedAreas, selectedTypes, selectedCosts]);

  return (
    <AppShell title="검색" showBottomTabs={true}>
      <div className="search-page">
        <div className="search-header">
          <input
            type="text"
            className="search-input"
            placeholder="장소 이름으로 검색..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="검색 입력"
          />
          <button
            className="search-compare-button"
            onClick={() => navigate('/compare')}
            aria-label="비교 페이지로 이동"
          >
            비교하기
          </button>
        </div>
        <div className="search-filters">
          <div className="search-filter-section">
            <h3 className="search-filter-title">지역</h3>
            <FilterChips
              filters={AREA_FILTERS}
              selectedIds={selectedAreas}
              onToggle={(id) => toggleArea(id as typeof selectedAreas[number])}
            />
          </div>
          <div className="search-filter-section">
            <h3 className="search-filter-title">타입</h3>
            <FilterChips
              filters={TYPE_FILTERS}
              selectedIds={selectedTypes}
              onToggle={(id) => toggleType(id as typeof selectedTypes[number])}
            />
          </div>
          <div className="search-filter-section">
            <h3 className="search-filter-title">비용</h3>
            <FilterChips
              filters={COST_FILTERS}
              selectedIds={selectedCosts.map(String)}
              onToggle={(id) => toggleCost(Number(id) as typeof selectedCosts[number])}
            />
          </div>
        </div>
        <div className="search-results">
          <h3 className="search-results-title">
            검색 결과 ({loading ? '...' : filteredPlaces.length}개)
          </h3>
          {loading ? (
            <p className="search-loading">검색 중...</p>
          ) : filteredPlaces.length > 0 ? (
            <div className="search-results-list">
              {filteredPlaces.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <p className="search-no-results">검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </AppShell>
  );
};
