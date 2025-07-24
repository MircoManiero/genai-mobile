
import React from 'react';
import { render } from '@testing-library/react-native';
import HomeScreen from '../src/screens/HomeScreen';

// Mock the HomeViewModel
jest.mock('../src/viewmodels/HomeViewModel', () => ({
  useHomeViewModel: () => ({
    welcomeMessage: 'Welcome to GenAI Mobile!',
    isLoading: false,
    refreshData: jest.fn(),
  }),
}));

describe('HomeScreen', () => {
  it('should render correctly', () => {
    const { getByTestId, getByText } = render(<HomeScreen />);

    expect(getByTestId('home-screen')).toBeTruthy();
    expect(getByTestId('welcome-message')).toBeTruthy();
    expect(getByText('Welcome to GenAI Mobile!')).toBeTruthy();
  });

  it('should display welcome message', () => {
    const { getByTestId } = render(<HomeScreen />);

    const welcomeMessage = getByTestId('welcome-message');
    expect(welcomeMessage.props.children).toBe('Welcome to GenAI Mobile!');
  });
});
