'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types/auth';
import { getCurrentUser, isAuthenticated as checkAuth, clearAuthData } from '@/lib/utils/auth';
import * as authApi from '@/lib/api/auth';
import { LoginRequest, RegisterRequest } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (data: LoginRequest) => Promise<void>;
  register: (data: RegisterRequest) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const loadUser = () => {
      if (checkAuth()) {
        const currentUser = getCurrentUser();
        setUser(currentUser);
      }
      setIsLoading(false);
    };
    
    loadUser();
  }, []);
  
  const login = async (data: LoginRequest) => {
    const response = await authApi.login(data);
    setUser(response.user);
  };
  
  const register = async (data: RegisterRequest) => {
    const response = await authApi.register(data);
    setUser(response.user);
  };
  
  const logout = () => {
    clearAuthData();
    setUser(null);
    authApi.logout();
  };
  
  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
