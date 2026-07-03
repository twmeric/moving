import { useState, useCallback, useEffect } from 'react';
import { useAuthStore } from '../store/authStore';

const API_BASE = '/api';

export function useAuth() {
  const { token, user, isAuthenticated, login, logout } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const doLogin = useCallback(
    async (username: string, password: string) => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_BASE}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password }),
        });
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error(data.error || 'Login failed');
        }
        const data = await res.json();
        login(data.token, { username: data.username });
        return true;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
        return false;
      } finally {
        setLoading(false);
      }
    },
    [login]
  );

  const doLogout = useCallback(() => {
    logout();
  }, [logout]);

  useEffect(() => {
    useAuthStore.getState().init();
  }, []);

  return { token, user, isAuthenticated, loading, error, login: doLogin, logout: doLogout };
}
