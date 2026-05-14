const features = [
  {
    icon: '⚡',
    title: 'Zero Dependencies',
    desc: 'Pure Go stdlib — no external packages. Fast, lean, and secure.',
  },
  {
    icon: '🛡️',
    title: 'Security Headers',
    desc: 'CSP, XSS protection, clickjacking prevention out of the box.',
  },
  {
    icon: '📦',
    title: 'Single Binary',
    desc: 'Frontend embedded in the Go binary. Deploy anywhere instantly.',
  },
  {
    icon: '🔄',
    title: 'Graceful Shutdown',
    desc: 'Handles SIGINT/SIGTERM with in-flight request draining.',
  },
  {
    icon: '📊',
    title: 'Structured Logging',
    desc: 'slog-based logging with JSON/text formats and levels.',
  },
  {
    icon: '🚦',
    title: 'Rate Limiting',
    desc: 'Token bucket rate limiter per IP with configurable burst.',
  },
  {
    icon: '🗜️',
    title: 'Gzip Compression',
    desc: 'Pooled gzip writers for efficient response compression.',
  },
  {
    icon: '🏷️',
    title: 'Auto Versioning',
    desc: 'Git-tag based versioning with build-time injection via ldflags.',
  },
];

export function FeaturesGrid() {
  return (
    <div className="features-grid">
      {features.map((f, i) => (
        <div className="feature-card" key={i}>
          <div className="feature-card__icon">{f.icon}</div>
          <h3 className="feature-card__title">{f.title}</h3>
          <p className="feature-card__desc">{f.desc}</p>
        </div>
      ))}
    </div>
  );
}
