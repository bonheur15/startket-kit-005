export function StatusCard({ icon, iconStyle, label, value, meta }) {
  return (
    <div className="card">
      <div className="card__header">
        <div className={`card__icon ${iconStyle}`}>{icon}</div>
        <span className="card__label">{label}</span>
      </div>
      <div className="card__value">{value}</div>
      {meta && <div className="card__meta">{meta}</div>}
    </div>
  );
}

export function StatusIndicator({ status }) {
  const isOk = status === 'ok' || status === 'ready';
  return (
    <span className={`status-indicator ${isOk ? 'status-indicator--ok' : 'status-indicator--error'}`}>
      <span className="status-indicator__dot" />
      {isOk ? 'Operational' : 'Degraded'}
    </span>
  );
}
