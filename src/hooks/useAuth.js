// src/hooks/useAuth.js
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectScreen, setRedirectScreen] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (err) {
        console.log("Error reading user from storage:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://192.168.1.7:5000/api/auth/login", { email, password });

      if (res.data.success) {
        const u = {
          id: res.data.id,
          name: res.data.name,
          email: res.data.email,
          role: res.data.role,
          token: res.data.token,
        };
        await AsyncStorage.setItem("user", JSON.stringify(u));
        setUser(u);
        return u;
      } else {
        throw new Error(res.data.message || "Login failed");
      }
    } catch (error) {
      throw new Error(error.response?.data?.message || error.message || "Login error");
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (err) {
      console.log("Error during logout:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        loading,
        redirectScreen,
        setRedirectScreen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
