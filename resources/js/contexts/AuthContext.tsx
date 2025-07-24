import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types/user';
import { Operator } from '../types/operator';
import { AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);
  const [role, setRole] = useState<'user' | 'operator' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setAuthState = (
    userData: User | null,
    operatorData: Operator | null,
    userRole: 'user' | 'operator' | null
  ) => {
    setUser(userData);
    setOperator(operatorData);
    setRole(userRole);
  };

  const setUserAndRole = (
    data: User | Operator | null,
    userRole: 'user' | 'operator'
  ) => {
    if (userRole === 'user') {
      setAuthState(data as User, null, 'user');
    } else {
      setAuthState(null, data as Operator, 'operator');
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsLoading(true);

      try {
        const operatorToken = sessionStorage.getItem('operator_token');

        if (operatorToken) {
          // ✅ Authorizationヘッダーを設定
          axios.defaults.headers.common['Authorization'] = `Bearer ${operatorToken}`;

          try {
            const opRes = await axios.get('/api/operator/me');
            if (opRes.data?.data) {
              setAuthState(null, opRes.data.data, 'operator');
              setIsLoading(false);
              return;
            }
          } catch (error) {
            console.warn('オペレーター認証失敗、ユーザー確認へ');
          }
        }

        // ✅ ユーザー認証（Sanctumセッション利用）
        try {
          const userRes = await axios.get('/api/me', { withCredentials: true });
          if (userRes.data?.data) {
            setAuthState(userRes.data.data, null, 'user');
            setIsLoading(false);
            return;
          }
        } catch (error) {
          console.warn('ユーザー認証失敗');
        }

        // 認証失敗時
        setAuthState(null, null, null);
      } catch (error) {
        console.error('認証チェック中にエラー', error);
        setAuthState(null, null, null);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, operator, role, isLoading, setAuthState, setUserAndRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};
