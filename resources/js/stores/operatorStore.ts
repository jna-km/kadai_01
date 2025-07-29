import { create } from 'zustand';
import { Operator } from '../types/operator';
import { createAuthMethods } from './authMethods';

interface OperatorState {
  operator: Operator | null;
  isLoading: boolean;
  error: string | null;

  setOperator: (operator: Operator | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;

  setAuthState: (user: null, operator: Operator | null, role: string | null) => void;
  setUserAndRole: (user: null, role: string | null) => void;
  checkLoginStatus: () => Promise<void>;
}

export const useOperatorStore = create<OperatorState>((set) => {
  const authMethods = createAuthMethods(set);

  return {
    operator: null,
    isLoading: false,
    error: null,

    setOperator: (operator) => set({ operator }),
    setLoading: (loading) => set({ isLoading: loading }),
    setError: (error) => set({ error }),
    reset: () => set({ operator: null, isLoading: false, error: null }),

    ...authMethods,
  };
});
