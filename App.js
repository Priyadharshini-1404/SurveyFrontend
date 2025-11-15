// App.js
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View } from "react-native";
import { navigationRef } from "./src/navigations/RootNavigation";

// Auth Context
import { AuthProvider, useAuth } from "./src/hooks/useAuth";
import { StaffProvider } from "./src/hooks/useStaff";

// Screens
import SplashScreen from "./src/screens/Auth/SplashScreen";
import LoginScreen from "./src/screens/Auth/LoginScreen";
import RegisterScreen from "./src/screens/Auth/RegisterScreen";

// Navigators
import AdminDrawer from "./src/navigations/AdminDrawer";
import DrawerNavigator from "./src/navigations/DrawerNavigation";
import UserDrawer from "./src/navigations/UserDrawer";
// import ScheduleScreen from './src/screens/Survey/ScheduleScreen';
// import RequestSurvey from './src/screens/Survey/RequestSurvey';

const Stack = createNativeStackNavigator();

function RootNav() {
  const { user, loading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  if (loading || showSplash) return <SplashScreen />;

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      ) : user.role === 'admin' ? (
        <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
      ) : (
        <Stack.Screen name="MainDrawer" component={UserDrawer} />
      )}
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <StaffProvider>
      <AuthProvider>
        <NavigationContainer ref={navigationRef}>
          <RootNav />
        </NavigationContainer>
      </AuthProvider>
    </StaffProvider>
  );
}
