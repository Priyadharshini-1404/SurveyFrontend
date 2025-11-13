// src/screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../hooks/useAuth';

export default function LoginScreen({ navigation, route }) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Get redirect param if it exists
  const redirectTo = route.params?.redirectTo || null;

  const handleLogin = async () => {
    try {
      await login(email, password); // your login function
      if (redirectTo) {
        navigation.replace(redirectTo); // redirect after login
      }
    } catch (err) {
      Alert.alert('Login Failed', err.message);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 20 }}>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginBottom: 10, padding: 10 }}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={{ borderWidth: 1, marginBottom: 20, padding: 10 }}
      />
      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: '#0a74da', padding: 15, borderRadius: 8 }}
      >
        <Text style={{ color: '#fff', textAlign: 'center' }}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
