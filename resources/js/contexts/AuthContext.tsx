import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types/user';
import { Operator } from '../types/operator';
import { AuthContextType } from '../types';

// axios.defaults.withCredentials = true; // ✅ Cookieを送信する
// axios.defaults.withXSRFToken = true;

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
    // CSRF Cookie取得（Laravel Sanctum 用）
    await axios.get('/sanctum/csrf-cookie', { withCredentials: true });

    alert(role)
    console.log('Checking login status...',role);
    if (role === 'user') {

      // ユーザーログイン確認
      const userRes = await axios.get('/api/me', { withCredentials: true });
      if (userRes.data?.data) {
        setAuthState(userRes.data.data, null, 'user');
        return;
      }
    } else if (role === 'operator') {
      // オペレーターログイン確認
      const opRes = await axios.get('/api/operator/me', { withCredentials: true });
      if (opRes.data?.data) {
        setAuthState(null, opRes.data.data, 'operator');
        return;
      }
    } else {
      // どちらも認証されていない場合
      setAuthState(null, null, null);
    }



  } catch (err) {
    console.error('認証チェックエラー:', err);
    setAuthState(null, null, null);
  } finally {
    setIsLoading(false);
  }
};

    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, operator, role, isLoading, setAuthState, setUserAndRole }}>
      {children}
    </AuthContext.Provider>
  );
};
