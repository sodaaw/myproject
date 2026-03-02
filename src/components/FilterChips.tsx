// 필터 칩 컴포넌트
// 디자인 변경 포인트: className="filter-chips" 스타일만 수정하면 됨

interface FilterChip {
  id: string;
  label: string;
}

interface FilterChipsProps {
  filters: FilterChip[];
  selectedIds: string[];
  onToggle: (id: string) => void;
}

export const FilterChips = ({ filters, selectedIds, onToggle }: FilterChipsProps) => {
  return (
    <div className="filter-chips">
      {filters.map((filter) => {
        const isSelected = selectedIds.includes(filter.id);
        return (
          <button
            key={filter.id}
            className={`filter-chip ${isSelected ? 'selected' : ''}`}
            onClick={() => onToggle(filter.id)}
            aria-label={`${filter.label} 필터 ${isSelected ? '해제' : '선택'}`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
};
