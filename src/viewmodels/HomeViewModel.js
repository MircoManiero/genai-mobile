
import { useState } from 'react';

export const useHomeViewModel = () => {
  const [welcomeMessage] = useState('Welcome to GenAI Mobile!');
  const [isLoading, setIsLoading] = useState(false);

  const refreshData = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return {
    welcomeMessage,
    isLoading,
    refreshData,
  };
};
