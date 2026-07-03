import { useState, useEffect, useCallback } from 'react';
import type { CMSData } from '../types';

const API_BASE = '/api';

export function useCMS() {
  const [data, setData] = useState<CMSData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCMS = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/cms`);
      if (!res.ok) throw new Error('Failed to load CMS data');
      const json = await res.json();
      setData(json);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCMS();
  }, [fetchCMS]);

  const updateCMS = useCallback(
    async (partial: Partial<CMSData>, token: string) => {
      const res = await fetch(`${API_BASE}/cms`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(partial),
      });
      if (!res.ok) throw new Error('Failed to update CMS');
      const json = await res.json();
      setData(json);
      return json as CMSData;
    },
    []
  );

  return { data, loading, error, refetch: fetchCMS, updateCMS };
}
