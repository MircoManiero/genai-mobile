
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../services/ApiService';

export const useAuthViewModel = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await ApiService.login(email, password);
      const { accessToken, refreshToken, user } = response.data;

      await AsyncStorage.multiSet([
        ['accessToken', accessToken],
        ['refreshToken', refreshToken],
        ['user', JSON.stringify(user)],
      ]);

      setIsAuthenticated(true);
      return true;
    } catch (err) {
      setError(err.message || 'Login failed');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await ApiService.clearTokens();
    await AsyncStorage.removeItem('user');
    setIsAuthenticated(false);
  };

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem('accessToken');
    setIsAuthenticated(!!token);
  };

  return {
    isLoading,
    error,
    isAuthenticated,
    login,
    logout,
    checkAuthStatus,
  };
};
