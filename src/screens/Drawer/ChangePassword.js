import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { changePassword } from '../../services/authService';
import { Ionicons } from "@expo/vector-icons";

export default function ChangePasswordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    if (!email || !oldPassword || !newPassword) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    if (newPassword.length < 6) {
      Alert.alert('Error', 'New password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      const res = await changePassword(email, oldPassword, newPassword);

      if (res.success) {
        Alert.alert('Success', res.message || 'Password changed successfully');
        navigation.goBack();
      } else {
        Alert.alert('Error', res.message || 'Failed to change password');
      }
    } catch (error) {
      Alert.alert('Network Error', 'Please check your connection');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={styles.backButton}
            >
              <Ionicons name="arrow-back" size={26} color="#0e0f0fff" />
            </TouchableOpacity>
      <Text style={styles.title}>Change Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Current Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={oldPassword}
        onChangeText={setOldPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        placeholderTextColor="#888"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />

      <TouchableOpacity
        style={[styles.button, loading && { opacity: 0.6 }]}
        onPress={handleChangePassword}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Changing...' : 'Change Password'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 30,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4a90e2',
    paddingVertical: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
});
