// src/hooks/useAuth.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectScreen, setRedirectScreen] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (err) {
        console.log("Error loading user:", err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  // ---------------------------
  // LOGIN FUNCTION
  // ---------------------------
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://192.168.1.8:5000/api/auth/login", {
        email,
        password,
      });

      if (!res.data.success) throw new Error(res.data.message);

      const u = {
        id: res.data.id,
        name: res.data.name,
        email: res.data.email,
        role: res.data.role, // "admin" or "user"
        token: res.data.token,
      };

      await AsyncStorage.setItem("user", JSON.stringify(u));
      setUser(u);

      return u;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  };

  // ---------------------------
  // REGISTER FUNCTION
  // ---------------------------
  const register = async ({ name, email, password }) => {
    try {
      const res = await axios.post("http://192.168.1.8:5000/api/auth/register", {
        name,
        email,
        password,
      });

      return res.data;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Registration failed");
    }
  };

  // ---------------------------
  // LOGOUT FUNCTION
  // ---------------------------
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        register,
        loading,
        redirectScreen,
        setRedirectScreen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Access hook
export const useAuth = () => useContext(AuthContext);
