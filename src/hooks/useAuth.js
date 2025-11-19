import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {id, role}
  const [redirectScreen, setRedirectScreen] = useState(null);

  const login = async (email, password, navigation) => {
    // ⛳ Fake API result for example
    const response = {
      id: 1,
      role: email === "admin@gmail.com" ? "admin" : "user",
    };

    setUser(response);

    if (redirectScreen) {
      navigation.replace(redirectScreen);
      setRedirectScreen(null);
      return;
    }

    if (response.role === "admin") {
      navigation.replace("AdminTabs");
    } else {
      navigation.replace("UserTabs");
    }
  };

  const logout = (navigation) => {
    setUser(null);
    navigation.replace("Home"); // 🟢 Return to HomeScreen
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, redirectScreen, setRedirectScreen }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
