import { create, StoreApi } from 'zustand';
import { createAuthMethods } from './authMethods';
import { useUserStore } from './userStore';
import { useOperatorStore } from './operatorStore';
import { User } from '../types/user';
import { Operator } from '../types/operator';

// 既存のauthStoreOrg.tsをfallback用にimport（requireでも可）
import { useAuthStore as useAuthStoreOrg } from './authStoreOrg';

type Role = 'user' | 'operator' | null;

interface AuthState {
  user: User | null;
  operator: Operator | null;
  role: Role;
  isLoading: boolean;
  setAuthState: (user: User | null, operator: Operator | null, role: Role, token?: string) => void;
  setUserAndRole: (user: User | Operator | null, role: Role, token?: string) => void;
  checkLoginStatus: () => Promise<void>;
}

// 新しいストアの初期化
let _useAuthStore;
try {
  _useAuthStore = create<AuthState>((set) => {
    const methods = createAuthMethods(set);
    return {
      user: null,
      operator: null,
      role: null,
      isLoading: true,
      setAuthState: methods.setAuthState,
      setUserAndRole: methods.setUserAndRole,
      checkLoginStatus: methods.checkLoginStatus,
    };
  });
  useUserStore.getState();
  useOperatorStore.getState();
} catch (e) {
  console.error('authStore新形式の初期化に失敗しました。org版を使用します。', e);
  _useAuthStore = useAuthStoreOrg;
}

export const useAuthStore = _useAuthStore;
