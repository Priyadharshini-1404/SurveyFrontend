// src/hooks/useAuth.js
import React, { createContext, useContext, useEffect, useState, useRef } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();
const API_URL = "http://192.168.1.5:5000/api/auth"; // adjust if needed

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { id,name,email,role }
  const [loading, setLoading] = useState(true);
  const [redirectScreen, setRedirectScreen] = useState(null);

  // keep interval id in ref
  const refreshIntervalRef = useRef(null);

  useEffect(() => {
    // Attempt auto-login from stored tokens
    (async () => {
      try {
        const accessToken = await AsyncStorage.getItem("accessToken");
        if (!accessToken) {
          setLoading(false);
          return;
        }
        // call /me
        const res = await fetch(`${API_URL}/me`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });

        if (res.ok) {
          const profile = await res.json();
          setUser(profile);
          startAutoRefresh();
        } else {
          // try refresh once
          const refreshed = await tryRefresh();
          if (refreshed) {
            const newToken = await AsyncStorage.getItem("accessToken");
            const retry = await fetch(`${API_URL}/me`, {
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
            await clearAll();
          }
        }
      } catch (err) {
        console.log("Auto-login error:", err);
        await clearAll();
      } finally {
        setLoading(false);
      }
    })();
    // cleanup on unmount
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
    setUser(null);
    stopAutoRefresh();
  };

  // try refresh token; returns true if refreshed
  const tryRefresh = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (!refreshToken) return false;

      const res = await fetch(`${API_URL}/refresh-token`, {
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
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.message || "Login failed");
    }

    // backend returns accessToken, refreshToken, user
    const { accessToken, refreshToken, user: profile } = data;
    if (!accessToken || !refreshToken) {
      throw new Error("Invalid tokens from server");
    }

    await AsyncStorage.setItem("accessToken", accessToken);
    await AsyncStorage.setItem("refreshToken", refreshToken);

    // profile might be returned as data.user (object)
    const profileObj = profile || data.user || {
      id: data.id,
      name: data.name,
      email: data.email,
      role: data.role,
    };

    setUser(profileObj);
    startAutoRefresh();
    return profileObj;
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
        redirectScreen,
        setRedirectScreen,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
