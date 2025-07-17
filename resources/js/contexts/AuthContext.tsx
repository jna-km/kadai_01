import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User } from '../types/user';
import { Operator } from '../types/operator';
import { AuthContextType } from '../types';

axios.defaults.withCredentials = true; // ✅ Cookieを送信する

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

  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsLoading(true);
      try {
        await axios.get('/sanctum/csrf-cookie');
        // ✅ まずオペレーター確認
        const { data: opData } = await axios.get('/api/operator/me');
        setAuthState(null, opData.data ?? opData, 'operator');
      } catch (operatorError) {
        try {
          // ✅ 次にユーザー確認
          const { data: userData } = await axios.get('/api/me');
          setAuthState(userData.data ?? userData, null, 'user');
        } catch (userError) {
          console.log('Not authenticated as user or operator');
          setAuthState(null, null, null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, operator, role, isLoading, setAuthState }}>
      {children}
    </AuthContext.Provider>
  );
};
