
import ApiService from '../src/services/ApiService';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  multiSet: jest.fn(),
  multiRemove: jest.fn(),
}));

// Mock axios
jest.mock('axios', () => ({
  create: jest.fn(() => ({
    interceptors: {
      request: { use: jest.fn() },
      response: { use: jest.fn() },
    },
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  })),
  post: jest.fn(),
}));

describe('ApiService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return mock login data', async () => {
      const email = 'test@example.com';
      const password = 'password123';

      const result = await ApiService.login(email, password);

      expect(result.data).toEqual({
        accessToken: 'fake_access_token_123',
        refreshToken: 'fake_refresh_token_456',
        user: {
          id: 1,
          email,
          name: 'John Doe',
        },
      });
    });
  });

  describe('clearTokens', () => {
    it('should remove access and refresh tokens', async () => {
      await ApiService.clearTokens();

      expect(AsyncStorage.multiRemove).toHaveBeenCalledWith([
        'accessToken',
        'refreshToken',
      ]);
    });
  });
});
