
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from 'react-native';
import { useHomeViewModel } from '../viewmodels/HomeViewModel';

const HomeScreen = () => {
  const { welcomeMessage, isLoading, refreshData } = useHomeViewModel();

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refreshData} />
      }
      testID="home-screen"
    >
      <View style={styles.centerContainer}>
        <Text style={styles.welcomeText} testID="welcome-message">
          {welcomeMessage}
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  contentContainer: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default HomeScreen;
