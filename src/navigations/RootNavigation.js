import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useAuth } from "../hooks/useAuth";

// Auth Screens
import Login from "../screens/Auth/LoginScreen";
import Register from "../screens/Auth/RegisterScreen";

// Drawers
import AdminDrawer from"../../src/navigations/AdminDrawer";
import UserDrawer from "../../src/navigations/UserDrawer"; // Your user drawer
import RequestSurvey from "../screens/Survey/RequestSurvey";
import NotificationsScreen from "../screens/Home/NotificationScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigation() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>

      {/* NOT LOGGED IN */}
      {!user ? (
        <>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Notifications" component={NotificationsScreen}/>
        </>
      ) : (
        <>
          {/* ADMIN ONLY */}
          {user.role === "admin" && (
            <Stack.Screen name="AdminDrawer" component={AdminDrawer} />
          )}

          {/* USER ONLY */}
          {user.role === "user" && (
            <Stack.Screen name="MainDrawer" component={UserDrawer} />
          )}
        </>
      )}
    </Stack.Navigator>
  );
}
