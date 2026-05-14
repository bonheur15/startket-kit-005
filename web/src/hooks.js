import { useState, useEffect, useCallback } from 'react';

/**
 * Custom hook for data fetching with loading/error states and auto-refresh.
 * @param {Function} fetchFn - Async function that returns data
 * @param {number} interval - Auto-refresh interval in ms (0 to disable)
 */
export function useFetch(fetchFn, interval = 0) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refetch = useCallback(async () => {
    try {
      setError(null);
      const result = await fetchFn();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [fetchFn]);

  useEffect(() => {
    refetch();

    if (interval > 0) {
      const id = setInterval(refetch, interval);
      return () => clearInterval(id);
    }
  }, [refetch, interval]);

  return { data, loading, error, refetch };
}
