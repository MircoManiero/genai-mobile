
import { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSettingsViewModel = () => {
  const [user, setUser] = useState(null);

  const loadUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('user');
      if (userData) {
        setUser(JSON.parse(userData));
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const getSettingsSections = () => [
    {
      id: 'profile',
      title: 'Profile',
      icon: '👤',
      subtitle: user?.name || 'Manage your profile',
    },
    {
      id: 'security',
      title: 'Security',
      icon: '🔒',
      subtitle: 'Password and authentication',
    },
    {
      id: 'privacy',
      title: 'Privacy',
      icon: '🛡️',
      subtitle: 'Data and privacy settings',
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: '🔔',
      subtitle: 'Manage notifications',
    },
    {
      id: 'about',
      title: 'About',
      icon: 'ℹ️',
      subtitle: 'App version and info',
    },
  ];

  return {
    user,
    loadUserData,
    getSettingsSections,
  };
};
