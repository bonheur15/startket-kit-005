export function DetailPanel({ title, badge, rows }) {
  return (
    <div className="detail-panel">
      <div className="detail-panel__header">
        <h2 className="detail-panel__title">{title}</h2>
        {badge && badge}
      </div>
      <div className="detail-panel__body">
        {rows.map((row, i) => (
          <div className="detail-row" key={i}>
            <span className="detail-row__label">{row.label}</span>
            <span className="detail-row__value">{row.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
