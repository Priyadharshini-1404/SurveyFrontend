import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../hooks/useAuth";

// Public Screens

// Private (after login)

import SplashScreen from "./BeforeLogin/SplashScreen";
import HomeScreen from "./BeforeLogin/HomeScreen";
import RequestSurvey from "./BeforeLogin/RequestSurvey";
import AppointmentScreen from "./BeforeLogin/ScheduleScreen";
import LoginScreen from "./BeforeLogin/LoginScreen";
import AdminDrawer from "./AfterLogin/AdminDrawer";
import UserDrawer from "./AfterLogin/UserDrawer";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* BEFORE LOGIN (Public) */}
      {!user ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="RequestSurvey" component={RequestSurvey} />
          <Stack.Screen name="Appointment" component={AppointmentScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </>
      ) : (
        <>
          {/* AFTER LOGIN → ADMIN */}
          {user.role === "admin" && (
            <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
          )}

          {/* AFTER LOGIN → USER */}
          {user.role === "user" && (
            <Stack.Screen name="UserDrawer" component={UserDrawer} />
          )}
        </>
      )}

    </Stack.Navigator>
  );
}
