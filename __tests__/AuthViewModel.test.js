
import { renderHook, act } from '@testing-library/react-native';
import { useAuthViewModel } from '../src/viewmodels/AuthViewModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../src/services/ApiService';

// Mock dependencies
jest.mock('@react-native-async-storage/async-storage');
jest.mock('../src/services/ApiService');

describe('useAuthViewModel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useAuthViewModel());

    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.isAuthenticated).toBe(false);
  });

  it('should handle successful login', async () => {
    const mockResponse = {
      data: {
        accessToken: 'token123',
        refreshToken: 'refresh123',
        user: { id: 1, name: 'John' },
      },
    };

    ApiService.login.mockResolvedValue(mockResponse);
    AsyncStorage.multiSet.mockResolvedValue();

    const { result } = renderHook(() => useAuthViewModel());

    await act(async () => {
      const success = await result.current.login('test@test.com', 'password');
      expect(success).toBe(true);
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.error).toBe(null);
    expect(AsyncStorage.multiSet).toHaveBeenCalledWith([
      ['accessToken', 'token123'],
      ['refreshToken', 'refresh123'],
      ['user', JSON.stringify({ id: 1, name: 'John' })],
    ]);
  });

  it('should handle login failure', async () => {
    const errorMessage = 'Login failed';
    ApiService.login.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useAuthViewModel());

    await act(async () => {
      const success = await result.current.login('test@test.com', 'password');
      expect(success).toBe(false);
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.error).toBe(errorMessage);
  });

  it('should handle logout', async () => {
    ApiService.clearTokens.mockResolvedValue();
    AsyncStorage.removeItem.mockResolvedValue();

    const { result } = renderHook(() => useAuthViewModel());

    await act(async () => {
      await result.current.logout();
    });

    expect(result.current.isAuthenticated).toBe(false);
    expect(ApiService.clearTokens).toHaveBeenCalled();
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('user');
  });
});
