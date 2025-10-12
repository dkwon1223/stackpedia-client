import { useState, useEffect, useCallback, type ReactNode } from 'react';
import type { AuthContextType, UserLoginPayload, UserSignupPayload, UserLoginResponse, UserDetails } from '@/types/auth';
import { apiClient } from '@/api/client';
import { AuthContext } from './authContextDefinition';
import { getCookie, deleteCookie } from '@/utils/cookieHelper';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthContextType['user']>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check localStorage first (traditional login)
    const token = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('currentUser');

    if (token && storedUser) {
      try {
        setUser(JSON.parse(storedUser));
        setIsLoading(false);
        return;
      } catch (error) {
        console.error('Failed to parse stored user:', error);
        localStorage.removeItem('authToken');
        localStorage.removeItem('currentUser');
      }
    }

    // Check cookies (OAuth2 login)
    const userInfoCookie = getCookie('userInfo');
    if (userInfoCookie) {
      try {
        // URL-decode the cookie value before parsing JSON
        const decodedUserInfo = decodeURIComponent(userInfoCookie);
        const userInfo = JSON.parse(decodedUserInfo);
        setUser(userInfo);
      } catch (error) {
        console.error('Failed to parse user info cookie:', error);
        deleteCookie('userInfo');
        deleteCookie('jwt');
      }
    }

    setIsLoading(false);
  }, []);

  const login = async (credentials: UserLoginPayload): Promise<void> => {
    const { data } = await apiClient.post<UserLoginResponse>('/api/user/login', credentials);

    localStorage.setItem('authToken', data.jwt);
    localStorage.setItem('currentUser', JSON.stringify(data.user));
    setUser(data.user);
  };

  const signup = async (signupCredentials: UserSignupPayload): Promise<void> => {
    await apiClient.post('/api/user/signup', signupCredentials);
  };

  const logout = async (): Promise<void> => {
    // Clear localStorage (traditional login)
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');

    // Clear cookies (OAuth2 login)
    deleteCookie('jwt');
    deleteCookie('userInfo');

    setUser(null);
  };

  const handleOAuthCallback = useCallback((): void => {
    // This function is called from the OAuth2Redirect component
    // to handle the OAuth2 callback after successful authentication
    const userInfoCookie = getCookie('userInfo');

    if (userInfoCookie) {
      try {
        // URL-decode the cookie value before parsing JSON
        const decodedUserInfo = decodeURIComponent(userInfoCookie);
        const userInfo: UserDetails = JSON.parse(decodedUserInfo);
        setUser(userInfo);
      } catch (error) {
        console.error('Failed to parse OAuth user info:', error);
        deleteCookie('userInfo');
        deleteCookie('jwt');
        throw new Error('Failed to parse user information');
      }
    } else {
      console.error('OAuth2 callback: userInfo cookie not found');
      console.error('Available cookies:', document.cookie);
      throw new Error('Authentication cookies not found. Please ensure your backend is setting the cookies correctly.');
    }
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    signup,
    handleOAuthCallback,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
