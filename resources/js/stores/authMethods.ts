import axios from 'axios';
import { User } from '../types/user';
import { Operator } from '../types/operator';
import { ApiResponse } from '@/types/api';

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

export const createAuthMethods = (set: (partial: Partial<AuthState>) => void) => {
  const setAuthState = (user: User | null, operator: Operator | null, role: Role) => {
    if (role === 'operator' && operator) {
      sessionStorage.setItem('operator_token', operator.token ?? '');
      axios.defaults.headers.common['Authorization'] = `Bearer ${operator.token ?? ''}`;
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
  };

  const setUserAndRole = (user: User | Operator | null, role: Role) => {
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
  };

  const checkLoginStatus = async () => {
    set({ isLoading: true });
    try {
      await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

      // operator認証（tokenベース）
      const operatorToken = sessionStorage.getItem('operator_token');
      if (operatorToken) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${operatorToken}`;
        try {
          const opRes = await axios.get<ApiResponse<Operator>>('/api/operator');
          if (opRes.data?.data) {
            set({ user: null, operator: opRes.data.data, role: 'operator', isLoading: false });
            return;
          } else {
            sessionStorage.removeItem('operator_token');
            delete axios.defaults.headers.common['Authorization'];
          }
        } catch (opErr: any) {
          sessionStorage.removeItem('operator_token');
          delete axios.defaults.headers.common['Authorization'];
        }
      }

      // user認証（cookieベース）
      delete axios.defaults.headers.common['Authorization'];
      try {
        const userRes = await axios.get<ApiResponse<User>>('/api/user', { withCredentials: true });
        if (userRes.data?.data) {
          set({ user: userRes.data.data, operator: null, role: 'user', isLoading: false });
          return;
        }
      } catch (userErr: any) {
        // cookie失効
      }

      set({ user: null, operator: null, role: null, isLoading: false });
    } catch (error: any) {
      if (error.response?.status !== 401) {
        console.error(error);
      }
      set({ user: null, operator: null, role: null, isLoading: false });
    }
  };

  return {
    setAuthState,
    setUserAndRole,
    checkLoginStatus,
  };
};
