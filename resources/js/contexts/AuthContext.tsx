import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import { User, AuthContextType } from '../types';

export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const { data } = await axios.get('/api/me');
        setUser(data.data);
      } catch (error) {
        console.log('Not authenticated');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
