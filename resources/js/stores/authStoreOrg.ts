import { create } from 'zustand';
import axios from 'axios';
import { User } from '../types/user';
import { Operator } from '../types/operator';

type Role = 'user' | 'operator' | null;

interface AuthState {
  user: User | null;
  operator: Operator | null;
  role: Role;
  isLoading: boolean;
  setAuthState: (user: User | null, operator: Operator | null, role: Role) => void;
  setUserAndRole: (user: User | null, role: Role) => void;
  checkLoginStatus: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  operator: null,
  role: null,
  isLoading: true,
  setAuthState: (user, operator, role) => {
    // operator_tokenの管理
    if (role === 'operator' && operator) {
      sessionStorage.setItem('operator_token', operator.token || '');
      axios.defaults.headers.common['Authorization'] = `Bearer ${operator.token}`;
    } else {
      sessionStorage.removeItem('operator_token');
      delete axios.defaults.headers.common['Authorization'];
    }
    set({ user, operator, role });
  },
  setUserAndRole: (user, role) => {
    if (role === 'user') {
      set({ user, operator: null, role });
      sessionStorage.removeItem('operator_token');
      delete axios.defaults.headers.common['Authorization'];
    } else if (role === 'operator' && user) {
      // operatorとしてuserをoperatorにセット
      set({ user: null, operator: user as any, role });
      if ((user as any).token) {
        sessionStorage.setItem('operator_token', (user as any).token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${(user as any).token}`;
      }
    } else {
      set({ user: null, operator: null, role: null });
      sessionStorage.removeItem('operator_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  checkLoginStatus: async () => {
    set({ isLoading: true });
    try {
      await axios.get('/sanctum/csrf-cookie');

      // 1. operator認証チェック
      try {
        const operatorToken = sessionStorage.getItem('operator_token');
        if (operatorToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${operatorToken}`;
          const opRes = await axios.get('/api/operator/me');
          if (opRes.data?.data) {
            set({ user: null, operator: opRes.data.data, role: 'operator' });
            return;
          }
        }
      } catch (operatorError: any) {
        if (operatorError.response?.status !== 401) {
          console.error(operatorError);
        }
      }

      // 2. user認証チェック
      try {
        delete axios.defaults.headers.common['Authorization'];
        const userRes = await axios.get('/api/me', { withCredentials: true });
        if (userRes.data?.data) {
          set({ user: userRes.data.data, operator: null, role: 'user' });
          return;
        }
      } catch (userError: any) {
        if (userError.response?.status !== 401) {
          console.error(userError);
        }
      }

      // どちらも未認証
      set({ user: null, operator: null, role: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
