interface CitationLegendProps {}

export function CitationLegend({}: CitationLegendProps) {
  return (
    <div className="legend">
      <div className="legend-title">출처 신뢰도 (Accuracy)</div>
      <div className="legend-item">
        <div className="legend-box high"></div>
        <span>80% 이상 매칭 (매우 높음)</span>
      </div>
      <div className="legend-item">
        <div className="legend-box mid"></div>
        <span>60% 이상 매칭 (보통)</span>
      </div>
      <div className="legend-item">
        <div className="legend-box low"></div>
        <span>60% 미만 매칭 (낮음)</span>
      </div>
    </div>
  );
}
