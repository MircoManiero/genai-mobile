
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

const SettingsDetailScreen = ({ route, navigation }) => {
  const { section } = route.params;

  const getDetailContent = () => {
    switch (section.id) {
      case 'profile':
        return [
          { title: 'Edit Profile', subtitle: 'Change your personal information' },
          { title: 'Profile Picture', subtitle: 'Update your avatar' },
          { title: 'Display Name', subtitle: 'How others see you' },
        ];
      case 'security':
        return [
          { title: 'Change Password', subtitle: 'Update your password' },
          { title: 'Two-Factor Authentication', subtitle: 'Enable 2FA' },
          { title: 'Login History', subtitle: 'See recent logins' },
        ];
      case 'privacy':
        return [
          { title: 'Data Usage', subtitle: 'How we use your data' },
          { title: 'Privacy Policy', subtitle: 'Read our privacy policy' },
          { title: 'Delete Account', subtitle: 'Permanently delete your account' },
        ];
      case 'notifications':
        return [
          { title: 'Push Notifications', subtitle: 'Enable/disable notifications' },
          { title: 'Email Notifications', subtitle: 'Manage email alerts' },
          { title: 'Sound Settings', subtitle: 'Notification sounds' },
        ];
      case 'about':
        return [
          { title: 'Version', subtitle: '1.0.0' },
          { title: 'Terms of Service', subtitle: 'Read our terms' },
          { title: 'Support', subtitle: 'Get help' },
        ];
      default:
        return [];
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} testID="settings-detail-screen">
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{section.title}</Text>
          <Text style={styles.headerSubtitle}>{section.subtitle}</Text>
        </View>

        <View style={styles.contentContainer}>
          {getDetailContent().map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.detailItem}
              testID={`detail-item-${index}`}
            >
              <View style={styles.detailContent}>
                <Text style={styles.detailTitle}>{item.title}</Text>
                <Text style={styles.detailSubtitle}>{item.subtitle}</Text>
              </View>
              <Text style={styles.arrow}>›</Text>
            </TouchableOpacity>
          ))}
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
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  contentContainer: {
    marginTop: 20,
  },
  detailItem: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  detailContent: {
    flex: 1,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },
  detailSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  arrow: {
    fontSize: 20,
    color: '#ccc',
  },
});

export default SettingsDetailScreen;
