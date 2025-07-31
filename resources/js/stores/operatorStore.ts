import { create } from 'zustand';
import { Operator } from '../types/operator';
import { createAuthMethods } from './authMethods';

type AuthMethods = ReturnType<typeof createAuthMethods>;

interface OperatorState {
  operator: Operator | null;
  isLoading: boolean;
  error: string | null;
  updateState: (state: Partial<OperatorState>) => void;
  reset: () => void;
  // authMethodsの型は展開でOK
  setAuthState: AuthMethods['setAuthState'];
  setUserAndRole: AuthMethods['setUserAndRole'];
  checkLoginStatus: AuthMethods['checkLoginStatus'];
}

export const useOperatorStore = create<OperatorState>((set) => {
  const authMethods = createAuthMethods(set);

  return {
    operator: null,
    isLoading: false,
    error: null,
    updateState: (state) => set(state),
    reset: () => set({ operator: null, isLoading: false, error: null }),
    ...authMethods,
  };
});
