// src/hooks/useAuth.js
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

const AuthContext = createContext();
const BASE_URL = `${API_URL}/auth`; // adjust if needed

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id,name,email,role }
  const [loading, setLoading] = useState(true);
  const [redirectScreen, setRedirectScreen] = useState(null);

  // keep interval id in ref
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        // No refresh token = truly logged out
        if (!refreshToken) {
          setLoading(false);
          return;
        }

        const accessToken = await AsyncStorage.getItem("accessToken");

        if (accessToken) {
          // Try /me with existing access token
          const res = await fetch(`${BASE_URL}/me`, {
            headers: { Authorization: `Bearer ${accessToken}` },
          });

          if (res.ok) {
            const profile = await res.json();
            setUser(profile);
            startAutoRefresh();
            setLoading(false);
            return;
          }
        }

        // Access token missing or expired — try refresh
        const refreshed = await tryRefresh();

        if (refreshed) {
          const newToken = await AsyncStorage.getItem("accessToken");
          const retry = await fetch(`${BASE_URL}/me`, {
            headers: { Authorization: `Bearer ${newToken}` },
          });

          if (retry.ok) {
            const profile = await retry.json();
            setUser(profile);
            startAutoRefresh();
          } else {
            await clearAll();
          }
        } else {
          // Refresh failed — but don't clear, just send to login
          // Only clear if refresh token is truly invalid
          await clearAll();
        }

      } catch (err) {
        console.log("Auto-login error:", err);
        // Network error — don't clear tokens, user might be offline
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (refreshToken) {
          // Keep user logged in state, just couldn't verify
          const storedUser = await AsyncStorage.getItem("user");
          if (storedUser) setUser(JSON.parse(storedUser));
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => stopAutoRefresh();
  }, []);

  const startAutoRefresh = () => {
    stopAutoRefresh();
    // refresh every 14 minutes (tokens expire in 15m)
    refreshIntervalRef.current = setInterval(async () => {
      await tryRefresh();
    }, 14 * 60 * 1000);
  };

  const stopAutoRefresh = () => {
    if (refreshIntervalRef.current) {
      clearInterval(refreshIntervalRef.current);
      refreshIntervalRef.current = null;
    }
  };

  const clearAll = async () => {
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("user");
    setUser(null);
    stopAutoRefresh();
  };

  // try refresh token; returns true if refreshed
  const tryRefresh = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) return false;

      const res = await fetch(`${BASE_URL}/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: refreshToken }),
      });

      if (!res.ok) {
        await clearAll();
        return false;
      }

      const data = await res.json();
      if (data.accessToken) {
        await AsyncStorage.setItem("accessToken", data.accessToken);
        return true;
      }
      return false;
    } catch (err) {
      console.log("Refresh error:", err);
      await clearAll();
      return false;
    }
  };

  // LOGIN: store access + refresh tokens and set profile
  const login = async (email, password) => {
    console.log(email, password, BASE_URL)
    const res = await fetch(`${BASE_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Login failed");

    const { accessToken, refreshToken, user: profile } = data;
    if (!accessToken || !refreshToken) throw new Error("Invalid tokens from server");

    const profileObj = profile || {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);
    await AsyncStorage.setItem("user", JSON.stringify(profileObj)); // ← save user

    setUser(profileObj);
    startAutoRefresh();
    return profileObj;
  };

  const register = async ({ name, email, password, role = "user" }) => {
    const res = await fetch(`${BASE_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password, role }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Registration failed");

    return data; // { success, user }
  };


  const logout = async () => {
    await clearAll();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        logout,
        tryRefresh,
        register,
        redirectScreen,
        setRedirectScreen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
