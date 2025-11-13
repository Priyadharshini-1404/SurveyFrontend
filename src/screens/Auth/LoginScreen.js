import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from "../../hooks/useAuth";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, redirectScreen, setRedirectScreen, login } = useAuth();

  const handleLogin = async () => {
    try {
      const u = await login(email, password);
      if (!u || !u.token) {
        alert("Login failed");
        return;
      }
      setUser(u);

      if (redirectScreen) {
        navigation.replace(redirectScreen);
        setRedirectScreen(null);
      } else if (u.role === "admin") {
        navigation.replace("AdminMain");
      } else {
        navigation.replace("UserMain");
      }
    } catch (err) {
      alert(err.message || "Error");
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

      {/* Password Input with Eye Icon */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder="Password"
          style={[styles.input, { flex: 1, borderWidth: 0 }]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
         <Ionicons
  name={showPassword ? 'eye-off' : 'eye'}
  size={22}
  color="#555"
  style={{ padding: 10 }}
/>

        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Logging in...' : 'Login'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.replace('Register')}>
        <Text style={{ marginTop: 12, textAlign: 'center' }}>
          Don’t have an account? Sign Up
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginVertical: 8,
  },
  button: {
    backgroundColor: '#0a74da',
    padding: 14,
    borderRadius: 8,
    marginTop: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});