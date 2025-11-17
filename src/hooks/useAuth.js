// hooks/useAuth.js
import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [redirectScreen, setRedirectScreen] = useState(null); // for protected navigation

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) setUser(JSON.parse(storedUser));
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("http://192.168.1.11:5000/api/auth/login", { email, password });
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
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || "Login error");
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, loading, redirectScreen, setRedirectScreen }}>
      {children}
    </AuthContext.Provider>
  );
};



  // 🔹 Register
  const register = async ({ name, email, password }) => {
    try {
      const res = await axios.post("http://192.168.1.11:5000/api/auth/register", { name, email, password });
      return res.data; // should return { success: true/false, message: "...", etc. }
    } catch (err) {
      throw new Error(err.response?.data?.message || err.message || "Registration error");
    }


  // 🔹 Logout
  const logout = async () => {
    try {
      await AsyncStorage.removeItem("user");
      setUser(null);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 🔹 Correct named export
export const useAuth = () => useContext(AuthContext);
