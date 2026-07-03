import { create } from 'zustand';
import type { User } from '../types';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  init: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,
  isAuthenticated: false,
  login: (token, user) => {
    localStorage.setItem('moving_auth_token', token);
    set({ token, user, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem('moving_auth_token');
    set({ token: null, user: null, isAuthenticated: false });
  },
  init: () => {
    const token = localStorage.getItem('moving_auth_token');
    if (token) {
      // Validate token with /api/auth/me on app init if needed
      set({ token, user: { username: 'twmeric' }, isAuthenticated: true });
    }
  },
}));
