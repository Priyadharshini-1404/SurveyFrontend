// App.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";

// Auth Context
import { AuthProvider, useAuth } from "./src/hooks/useAuth";

// Screens
import SplashScreen from "./src/screens/Auth/SplashScreen";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import RegisterScreen from "./src/screens/Auth/RegisterScreen";

// Navigators
import AdminDrawer from "./src/navigations/AdminDrawer";
import MainDrawer from "./src/navigations/MainDrawer"; // normal user

const Stack = createNativeStackNavigator();

function RootNav() {
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  // Splash timer
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  // Show SplashScreen if app is loading user or splash timer is active
  if (loading || showSplash) {
    return <SplashScreen />; // <-- use your SplashScreen component directly
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Authentication flow */}
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : (
        <>
          {/* Role-based navigation */}
          {user.role === "admin" ? (
            <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
          ) : (
            <Stack.Screen name="MainDrawer" component={MainDrawer} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    </AuthProvider>
  );
}
