// src/navigations/RootNavigation.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../hooks/useAuth";



// drawers/stacks (after login)
import AdminDrawer from "./AfterLogin/AdminDrawer";
import UserDrawer from "./AfterLogin/UserDrawer";
import RegisterScreen from "./BeforeLogin/RegisterScreen";
import LoginScreen from "./BeforeLogin/LoginScreen";
import HomeScreen from "./BeforeLogin/HomeScreen";
import SplashScreen from "./BeforeLogin/SplashScreen";
// import MapPickerScreen from "../screens/Survey/MapPickerScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { user, loading } = useAuth();

  // while auth is loading, show splash (or spinner)
  if (loading) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Public / Common screens */}
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      {/* <Stack.Screen name="MapPickerScreen" component={MapPickerScreen} /> */}

      {/* If logged in, add drawer entry that becomes the main area */}
      {user && user.role === "admin" && (
        <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
      )}

      {user && user.role !== "admin" && (
        <Stack.Screen name="UserDrawer" component={UserDrawer} />
      )}
    </Stack.Navigator>
  );
}
