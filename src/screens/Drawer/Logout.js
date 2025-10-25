import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function LogoutScreen({ navigation }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const showLogoutAlert = () => {
      Alert.alert(
        'Confirm Logout',
        'Are you sure you want to logout?',
        [
          {
            text: 'Cancel',
            onPress: () => navigation.goBack(),
            style: 'cancel',
          },
          {
            text: 'Yes',
            onPress: async () => {
              setIsLoggingOut(true);
              try {
                await AsyncStorage.removeItem('userToken');
                await AsyncStorage.removeItem('userData');
                // Reset navigation so user can't go back
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              } catch (error) {
                console.log('Logout error:', error);
                setIsLoggingOut(false);
              }
            },
          },
        ],
        { cancelable: false }
      );
    };

    // Run alert after small delay so screen fully mounts
    const timer = setTimeout(() => showLogoutAlert(), 300);

    return () => clearTimeout(timer);
  }, [navigation]);

  // Show spinner only while logging out
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoggingOut && <ActivityIndicator size="large" color="#0a74da" />}
    </View>
  );
}
