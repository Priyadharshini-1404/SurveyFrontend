import React, { useCallback, useState } from 'react';
import { View, ActivityIndicator, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

export default function LogoutScreen({ navigation }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useFocusEffect(
    useCallback(() => {
      // Run the alert *only* when this screen is focused
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
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              } catch (err) {
                console.log('Logout error:', err);
                setIsLoggingOut(false);
              }
            },
          },
        ],
        { cancelable: false }
      );
    }, [navigation])
  );

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {isLoggingOut ? (
        <ActivityIndicator size="large" color="#0a74da" />
      ) : null}
    </View>
  );
}
