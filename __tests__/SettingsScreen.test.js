
import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SettingsScreen from '../src/screens/SettingsScreen';

// Mock the SettingsViewModel
jest.mock('../src/viewmodels/SettingsViewModel', () => ({
  useSettingsViewModel: () => ({
    user: { name: 'John Doe' },
    loadUserData: jest.fn(),
    getSettingsSections: () => [
      {
        id: 'profile',
        title: 'Profile',
        icon: '👤',
        subtitle: 'Manage your profile',
      },
      {
        id: 'security',
        title: 'Security',
        icon: '🔒',
        subtitle: 'Password and authentication',
      },
    ],
  }),
}));

describe('SettingsScreen', () => {
  const mockNavigation = {
    navigate: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const { getByTestId, getByText } = render(
      <SettingsScreen navigation={mockNavigation} />
    );

    expect(getByTestId('settings-screen')).toBeTruthy();
    expect(getByText('Settings')).toBeTruthy();
    expect(getByText('Logged in as John Doe')).toBeTruthy();
  });

  it('should render settings sections', () => {
    const { getByText, getByTestId } = render(
      <SettingsScreen navigation={mockNavigation} />
    );

    expect(getByText('Profile')).toBeTruthy();
    expect(getByText('Security')).toBeTruthy();
    expect(getByTestId('setting-profile')).toBeTruthy();
    expect(getByTestId('setting-security')).toBeTruthy();
  });

  it('should navigate to settings detail when section is pressed', () => {
    const { getByTestId } = render(
      <SettingsScreen navigation={mockNavigation} />
    );

    const profileSetting = getByTestId('setting-profile');
    fireEvent.press(profileSetting);

    expect(mockNavigation.navigate).toHaveBeenCalledWith('SettingsDetail', {
      section: {
        id: 'profile',
        title: 'Profile',
        icon: '👤',
        subtitle: 'Manage your profile',
      },
    });
  });
});
