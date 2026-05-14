const API_BASE = '';

/**
 * Fetch health status from /healthz
 */
export async function fetchHealth() {
  const res = await fetch(`${API_BASE}/healthz`);
  if (!res.ok) throw new Error(`Health check failed: ${res.status}`);
  return res.json();
}

/**
 * Fetch version info from /version
 */
export async function fetchVersion() {
  const res = await fetch(`${API_BASE}/version`);
  if (!res.ok) throw new Error(`Version check failed: ${res.status}`);
  return res.json();
}

/**
 * Fetch readiness status from /readyz
 */
export async function fetchReadiness() {
  const res = await fetch(`${API_BASE}/readyz`);
  if (!res.ok) throw new Error(`Readiness check failed: ${res.status}`);
  return res.json();
}

/**
 * Sample API call to /api/hello
 */
export async function fetchHello(name = '') {
  const params = name ? `?name=${encodeURIComponent(name)}` : '';
  const res = await fetch(`${API_BASE}/api/hello${params}`);
  if (!res.ok) throw new Error(`API call failed: ${res.status}`);
  return res.json();
}
