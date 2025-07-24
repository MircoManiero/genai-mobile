
import { renderHook, act } from '@testing-library/react-native';
import { useHomeViewModel } from '../src/viewmodels/HomeViewModel';

describe('useHomeViewModel', () => {
  it('should initialize with correct default values', () => {
    const { result } = renderHook(() => useHomeViewModel());

    expect(result.current.welcomeMessage).toBe('Welcome to GenAI Mobile!');
    expect(result.current.isLoading).toBe(false);
  });

  it('should handle refresh data', async () => {
    const { result } = renderHook(() => useHomeViewModel());

    await act(async () => {
      const refreshPromise = result.current.refreshData();
      expect(result.current.isLoading).toBe(true);
      await refreshPromise;
    });

    expect(result.current.isLoading).toBe(false);
  });
});
