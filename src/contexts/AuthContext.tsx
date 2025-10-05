import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import type { AuthContextType, UserLoginPayload, UserSignupPayload, UserLoginResponse } from '@/types/auth';
import { apiClient } from '@/api/client';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('currentUser');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: UserLoginPayload): Promise<void> => {
    const { data } = await apiClient.post<UserLoginResponse>('/user/login', credentials);

    localStorage.setItem('authToken', data.jwt);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    setUser(data.user);
  };

  const signup = async (signupCredentials: UserSignupPayload): Promise<void> => {
    await apiClient.post('/user/signup', signupCredentials);
  };

  const logout = async (): Promise<void> => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
