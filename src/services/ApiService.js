
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ApiService {
  constructor() {
    this.baseURL = 'https://api.example.com';
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
    });

    this.setupInterceptors();
  }

  setupInterceptors() {
    // Request interceptor to add auth token
    this.api.interceptors.request.use(
      async (config) => {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor to handle errors and token refresh
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          
          try {
            const refreshToken = await AsyncStorage.getItem('refreshToken');
            if (refreshToken) {
              const response = await this.refreshToken(refreshToken);
              await AsyncStorage.setItem('accessToken', response.data.accessToken);
              originalRequest.headers.Authorization = `Bearer ${response.data.accessToken}`;
              return this.api(originalRequest);
            }
          } catch (refreshError) {
            await this.clearTokens();
            throw new Error('Session expired. Please login again.');
          }
        }

        if (error.response?.status === 400) {
          throw new Error('Bad request. Please check your input.');
        }

        throw error;
      }
    );
  }

  async refreshToken(refreshToken) {
    return axios.post(`${this.baseURL}/auth/refresh`, {
      refreshToken,
    });
  }

  async clearTokens() {
    await AsyncStorage.multiRemove(['accessToken', 'refreshToken']);
  }

  async login(email, password) {
    // Fake API call - returns mock data
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          data: {
            accessToken: 'fake_access_token_123',
            refreshToken: 'fake_refresh_token_456',
            user: {
              id: 1,
              email,
              name: 'John Doe',
            },
          },
        });
      }, 1000);
    });
  }

  async get(endpoint) {
    return this.api.get(endpoint);
  }

  async post(endpoint, data) {
    return this.api.post(endpoint, data);
  }

  async put(endpoint, data) {
    return this.api.put(endpoint, data);
  }

  async delete(endpoint) {
    return this.api.delete(endpoint);
  }
}

export default new ApiService();
