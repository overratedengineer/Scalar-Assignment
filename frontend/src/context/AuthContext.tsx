import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../api';

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (token: string, userData: User) => void;
  logout: () => void;
  defaultLogin: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (token && token !== 'null' && token !== 'undefined') {
        try {
          const res = await api.get('/auth/me');
          setUser(res.data.data.user);
        } catch (error) {
          console.error("Token expired or invalid", error);
          logout();
        }
      }
      setIsLoading(false);
    };
    fetchUser();
  }, []);

  const defaultLogin = async () => {
    const email = import.meta.env.VITE_DEFAULT_LOGIN_EMAIL || 'thepulkitt@gmail.com';
    const password = import.meta.env.VITE_DEFAULT_LOGIN_PASSWORD || 'Park1290@';
    
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.data.token, res.data.data.user);
      api.defaults.headers.common['Authorization'] = `Bearer ${res.data.data.token}`;
    } catch (loginError) {
      try {
        const regRes = await api.post('/auth/register', { name: 'Pulkit', email, password });
        login(regRes.data.data.token, regRes.data.data.user);
        api.defaults.headers.common['Authorization'] = `Bearer ${regRes.data.data.token}`;
      } catch (regError) {
        console.error("Default login/register failed", regError);
      }
    }
  };

  const login = (newToken: string, userData: User) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, defaultLogin, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
