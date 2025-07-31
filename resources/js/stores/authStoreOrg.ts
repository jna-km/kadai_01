import { create } from 'zustand';
import axios from 'axios';
import { ApiResponse } from '../types/api';
import { User } from '../types/user';
import { Operator } from '../types/operator';

type Role = 'user' | 'operator' | null;

interface AuthState {
  user: User | null;
  operator: Operator | null;
  role: Role;
  isLoading: boolean;
  setAuthState: (user: User | null, operator: Operator | null, role: Role) => void;
  setUserAndRole: (user: User | Operator | null, role: Role) => void; // 修正
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
      set({ user, operator, role, isLoading: false });
    } else if (role === 'user' && user) {
      sessionStorage.removeItem('operator_token');
      delete axios.defaults.headers.common['Authorization'];
      set({ user, operator: null, role, isLoading: false });
    } else {
      sessionStorage.removeItem('operator_token');
      delete axios.defaults.headers.common['Authorization'];
      set({ user: null, operator: null, role: null, isLoading: false });
    }
  },
  setUserAndRole: (user, role) => {
    if (role === 'user' && user) {
      sessionStorage.removeItem('operator_token');
      delete axios.defaults.headers.common['Authorization'];
      set({ user: user as User, operator: null, role: 'user', isLoading: false });
    } else if (role === 'operator' && user) {
      const operator = user as Operator;
      sessionStorage.setItem('operator_token', operator.token ?? '');
      axios.defaults.headers.common['Authorization'] = `Bearer ${operator.token ?? ''}`;
      set({ user: null, operator, role: 'operator', isLoading: false });
    } else {
      sessionStorage.removeItem('operator_token');
      delete axios.defaults.headers.common['Authorization'];
      set({ user: null, operator: null, role: null, isLoading: false });
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
          const opRes = await axios.get<ApiResponse<Operator>>('/api/operator');
          if (opRes.data?.data) {
            set({ user: null, operator: opRes.data.data, role: 'operator', isLoading: false });
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
        const userRes = await axios.get<ApiResponse<User>>('/api/user', { withCredentials: true });
        if (userRes.data?.data) {
          set({ user: userRes.data.data, operator: null, role: 'user', isLoading: false });
          return;
        }
      } catch (userError: any) {
        if (userError.response?.status !== 401) {
          console.error(userError);
        }
      }

      // どちらも未認証
      set({ user: null, operator: null, role: null, isLoading: false });
    } catch (error: any) {
      set({ user: null, operator: null, role: null, isLoading: false });
      if (error.response?.status !== 401) {
        console.error(error);
      }
    }
  },
}));
