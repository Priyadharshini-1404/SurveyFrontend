import React, { createContext, useState } from 'react';
import * as SecureStore from 'expo-secure-store';
import { loginUser, registerUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const data = await loginUser(email, password);
    if (data.token) {
      await SecureStore.setItemAsync('token', data.token);
      setUser(data.user);
    }
    return data; // important for LoginScreen
  };

  const register = async ({ name, email, password }) => {
    return await registerUser({ name, email, password });
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
