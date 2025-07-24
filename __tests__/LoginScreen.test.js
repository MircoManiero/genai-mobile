
import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../src/screens/LoginScreen';

// Mock the AuthViewModel
jest.mock('../src/viewmodels/AuthViewModel', () => ({
  useAuthViewModel: () => ({
    isLoading: false,
    error: null,
    isAuthenticated: false,
    login: jest.fn(),
  }),
}));

const MockedNavigationContainer = ({ children }) => (
  <NavigationContainer>{children}</NavigationContainer>
);

describe('LoginScreen', () => {
  const mockNavigation = {
    replace: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByText, getByTestId } = render(
      <MockedNavigationContainer>
        <LoginScreen navigation={mockNavigation} />
      </MockedNavigationContainer>
    );

    expect(getByText('GenAI Mobile')).toBeTruthy();
    expect(getByTestId('email-input')).toBeTruthy();
    expect(getByTestId('password-input')).toBeTruthy();
    expect(getByTestId('login-button')).toBeTruthy();
  });

  it('should update email input', () => {
    const { getByTestId } = render(
      <MockedNavigationContainer>
        <LoginScreen navigation={mockNavigation} />
      </MockedNavigationContainer>
    );

    const emailInput = getByTestId('email-input');
    fireEvent.changeText(emailInput, 'test@example.com');

    expect(emailInput.props.value).toBe('test@example.com');
  });

  it('should update password input', () => {
    const { getByTestId } = render(
      <MockedNavigationContainer>
        <LoginScreen navigation={mockNavigation} />
      </MockedNavigationContainer>
    );

    const passwordInput = getByTestId('password-input');
    fireEvent.changeText(passwordInput, 'password123');

    expect(passwordInput.props.value).toBe('password123');
  });

  it('should show alert when fields are empty', () => {
    const alertSpy = jest.spyOn(require('react-native').Alert, 'alert');
    
    const { getByTestId } = render(
      <MockedNavigationContainer>
        <LoginScreen navigation={mockNavigation} />
      </MockedNavigationContainer>
    );

    const loginButton = getByTestId('login-button');
    fireEvent.press(loginButton);

    expect(alertSpy).toHaveBeenCalledWith('Error', 'Please fill in all fields');
  });
});
