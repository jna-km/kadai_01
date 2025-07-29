import { create } from 'zustand';
import { User } from '../types/user';
import { createAuthMethods } from './authMethods';

interface UserState {
  user: User | null;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;

  setAuthState: (user: User | null, operator: null, role: string | null) => void;
  setUserAndRole: (user: User | null, role: string | null) => void;
  checkLoginStatus: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => {
  const authMethods = createAuthMethods(set);

  return {
    user: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    reset: () => set({ user: null, isLoading: false, error: null }),

    ...authMethods,
  };
});
