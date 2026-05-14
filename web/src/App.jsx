import { useCallback } from 'react';
import { fetchHealth, fetchVersion } from './api';
import { useFetch } from './hooks';
import { StatusCard, StatusIndicator } from './components/StatusCard';
import { DetailPanel } from './components/DetailPanel';
import { FeaturesGrid } from './components/FeaturesGrid';

function App() {
  const healthFn = useCallback(() => fetchHealth(), []);
  const versionFn = useCallback(() => fetchVersion(), []);

  const { data: health, loading: healthLoading, error: healthError, refetch: refetchHealth } = useFetch(healthFn, 10000);
  const { data: version, loading: versionLoading, error: versionError, refetch: refetchVersion } = useFetch(versionFn);

  const loading = healthLoading || versionLoading;
  const error = healthError || versionError;

  if (loading) {
    return (
      <div className="app">
        <div className="loading">
          <div className="spinner" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-state">
          <div className="error-state__icon">⚠️</div>
          <h2 className="error-state__title">Connection Error</h2>
          <p className="error-state__message">{error}</p>
          <button
            className="error-state__button"
            onClick={() => { refetchHealth(); refetchVersion(); }}
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header__badge">
          <span className="dot" />
          Go Starter Kit
        </div>
        <h1 className="header__title">Production Dashboard</h1>
        <p className="header__subtitle">
          Real-time system overview for your fullstack Go + React application
        </p>
      </header>

      {/* Status Cards */}
      <div className="status-grid">
        <StatusCard
          icon="♥"
          iconStyle="card__icon--green"
          label="Health Status"
          value={
            <StatusIndicator status={health?.status} />
          }
          meta={`Uptime: ${health?.uptime || '—'}`}
        />
        <StatusCard
          icon="◆"
          iconStyle="card__icon--purple"
          label="Version"
          value={version?.version || 'dev'}
          meta={version?.git_commit ? `${version.git_commit.substring(0, 8)}` : '—'}
        />
        <StatusCard
          icon="▲"
          iconStyle="card__icon--orange"
          label="Goroutines"
          value={health?.system?.goroutines || '—'}
          meta={`${health?.system?.cpus || '—'} CPUs`}
        />
        <StatusCard
          icon="■"
          iconStyle="card__icon--red"
          label="Memory"
          value={`${health?.system?.mem_alloc_mb?.toFixed(1) || '—'} MB`}
          meta={`Sys: ${health?.system?.mem_sys_mb?.toFixed(1) || '—'} MB`}
        />
      </div>

      {/* System Details */}
      <DetailPanel
        title="System Information"
        badge={<StatusIndicator status={health?.status} />}
        rows={[
          { label: 'Go Version', value: health?.system?.go_version || '—' },
          { label: 'Operating System', value: health?.system?.os || '—' },
          { label: 'Architecture', value: health?.system?.arch || '—' },
          { label: 'GC Cycles', value: health?.system?.gc_cycles?.toString() || '—' },
          { label: 'Total Requests', value: health?.stats?.total_requests?.toLocaleString() || '—' },
          { label: 'Server Time', value: health?.timestamp || '—' },
        ]}
      />

      {/* Build Information */}
      <DetailPanel
        title="Build Information"
        rows={[
          { label: 'Version', value: version?.version || '—' },
          { label: 'Git Commit', value: version?.git_commit || '—' },
          { label: 'Git Branch', value: version?.git_branch || '—' },
          { label: 'Build Time', value: version?.build_time || '—' },
          { label: 'Go Version', value: version?.go_version || '—' },
          { label: 'Target OS/Arch', value: `${version?.os || '—'}/${version?.arch || '—'}` },
        ]}
      />

      {/* Features */}
      <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--text-primary)' }}>
        Built-in Features
      </h2>
      <FeaturesGrid />

      {/* Footer */}
      <footer className="footer">
        <p className="footer__text">
          Built with Go + React &mdash;{' '}
          <a className="footer__link" href="https://github.com/bonheur/go-starter-kit" target="_blank" rel="noopener noreferrer">
            View on GitHub
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;
