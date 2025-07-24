
import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useSettingsViewModel } from '../viewmodels/SettingsViewModel';

const SettingsScreen = ({ navigation }) => {
  const { user, loadUserData, getSettingsSections } = useSettingsViewModel();

  useEffect(() => {
    loadUserData();
  }, []);

  const handleSectionPress = (section) => {
    navigation.navigate('SettingsDetail', { section });
  };

  const renderSettingItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={styles.settingItem}
      onPress={() => handleSectionPress(item)}
      testID={`setting-${item.id}`}
    >
      <View style={styles.settingContent}>
        <Text style={styles.settingIcon}>{item.icon}</Text>
        <View style={styles.settingTextContainer}>
          <Text style={styles.settingTitle}>{item.title}</Text>
          <Text style={styles.settingSubtitle}>{item.subtitle}</Text>
        </View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} testID="settings-screen">
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Settings</Text>
          {user && (
            <Text style={styles.userInfo}>Logged in as {user.name}</Text>
          )}
        </View>

        <View style={styles.settingsContainer}>
          {getSettingsSections().map(renderSettingItem)}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  userInfo: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  settingsContainer: {
    marginTop: 20,
  },
  settingItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  settingContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },
});

export default SettingsScreen;
