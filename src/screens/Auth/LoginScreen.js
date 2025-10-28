// src/screens/Auth/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import useAuth from '../../hooks/useAuth'; // custom hook for auth
import Register from '../Auth/RegisterScreen';

export default function LoginScreen({ navigation }) {
  const { login } = useAuth(); // your auth hook
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
const handleLogin = async () => {
  setLoading(true);
  try {
    const res = await login(email, password);

    if (!res.token) {
      alert(res.message || 'Login failed');
      return;
    }

    // ✅ Get survey data if passed from AppointmentScreen
    const surveyData = navigation.getState()?.routes?.find(
      r => r.name === "Login"
    )?.params;

    // ✅ After login, navigate to SurveyBookingScreen with survey details
    navigation.replace("SurveyBookingScreen", {
      surveyType: surveyData?.surveyType,
      date: surveyData?.date,
      time: surveyData?.time,
      location: surveyData?.location,
    });

  } catch (err) {
    alert(err.message);
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Rockfort Surveys</Text>

      <TextInput
        placeholder="Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Logging in...' : 'Login'}</Text>
      </TouchableOpacity>

        <TouchableOpacity
              onPress={() => navigation.replace('Register')}>
        <Text style={{ marginTop: 12, textAlign: 'center' }}>
          Don’t have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginVertical: 8 },
  button: { backgroundColor: '#0a74da', padding: 14, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
