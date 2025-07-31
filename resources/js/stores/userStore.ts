import { create } from 'zustand';
import { User } from '../types/user';
import { Operator } from '../types/operator';
import { createAuthMethods } from './authMethods';

export type Role = 'user' | 'operator' | null;

interface UserState {
  user: User | null;
  operator: Operator | null;
  role: Role;
  isLoading: boolean;
  error: string | null;

  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;

  setAuthState: (
    user: User | null,
    operator: Operator | null,
    role: Role,
    token?: string
  ) => void;
  setUserAndRole: (user: User | null, role: Role, token?: string) => void;
  checkLoginStatus: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => {
  const authMethods = createAuthMethods(set);

  return {
    user: null,
    operator: null,
    role: null,
    isLoading: false,
    error: null,

    setUser: (user) => set({ user }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    reset: () => set({ user: null, isLoading: false, error: null }),

    ...authMethods,
  };
});
