import { create } from 'zustand';
import axios from 'axios';
import { User } from '../types/user';
import { Operator } from '../types/operator';
import { ApiResponse } from '../types/api';

type Role = 'user' | 'operator' | null;

interface AuthState {
  user: User | null;
  operator: Operator | null;
  role: Role;
  isLoading: boolean;
  setAuthState: (user: User | null, operator: Operator | null, role: Role) => void;
  setUserAndRole: (user: User | Operator | null, role: Role) => void;
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
    set({ user, operator, role, isLoading: false });
  },
  setUserAndRole: (user, role) => {
    if (role === 'user') {
      set({ user: user as User, operator: null, role, isLoading: false });
      sessionStorage.removeItem('operator_token');
      delete axios.defaults.headers.common['Authorization'];
    } else if (role === 'operator' && user) {
      set({ user: null, operator: user as Operator, role, isLoading: false });
      if ((user as Operator).token) {
        sessionStorage.setItem('operator_token', (user as Operator).token ?? '');
        axios.defaults.headers.common['Authorization'] = `Bearer ${(user as Operator).token ?? ''}`;
      }
    } else {
      set({ user: null, operator: null, role: null, isLoading: false });
      sessionStorage.removeItem('operator_token');
      delete axios.defaults.headers.common['Authorization'];
    }
  },
  checkLoginStatus: async () => {
    set({ isLoading: true });
    try {
      await axios.get('/sanctum/csrf-cookie');

      // operator認証チェック
      try {
        const operatorToken = sessionStorage.getItem('operator_token');
        if (operatorToken) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${operatorToken}`;
          const opRes = await axios.get<ApiResponse<Operator>>('/api/operator/me');
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

      // user認証チェック
      try {
        delete axios.defaults.headers.common['Authorization'];
        const userRes = await axios.get<ApiResponse<User>>('/api/me', { withCredentials: true });
        if (userRes.data?.data) {
          set({ user: userRes.data.data, operator: null, role: 'user', isLoading: false });
          return;
        }
      } catch (userError: any) {
        if (userError.response?.status !== 401) {
          console.error(userError);
        }
      }

      set({ user: null, operator: null, role: null, isLoading: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));
