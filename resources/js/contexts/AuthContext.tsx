import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User, Operator, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | Operator | null>(null);
  const [role, setRole] = useState<'user' | 'operator' | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const setUserAndRole = (userData: User | Operator | null, userRole: 'user' | 'operator' | null) => {
    setUser(userData);
    setRole(userRole);
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      setIsLoading(true);
      try {
        // まず一般ユーザーとしてログインしているか確認
        const { data } = await axios.get('/api/me');
        setUserAndRole(data.data, 'user');
      } catch (error) {
        // 一般ユーザーでなければ、オペレーターとしてログインしているか確認
        try {
          const { data } = await axios.get('/api/operator/me');
          setUserAndRole(data.data, 'operator');
        } catch (operatorError) {
          // どちらでもなければ未ログイン
          console.log('Not authenticated as user or operator');
          setUserAndRole(null, null);
        }
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, setUserAndRole, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
