// src/navigations/RootNavigation.js
import React, { useEffect, useRef } from "react";
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
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync } from "../notification";
import axios from "axios";
import baseApi from "../api/api";

const Stack = createNativeStackNavigator();
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export default function RootNavigation() {
  const { user, loading } = useAuth();


  console.log("user", user);

  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    // 1. Request permissions and get the token
    registerForPushNotificationsAsync().then(token => {
      // Send this token to your backend server
      console.log('Token to send to server: this is Rootnavigation', token);
      if (user) {
        try {
          const response = baseApi.post("/save-token", { pushToken: token, userId: user.id });
          console.log('Token registered:', response);
        } catch (error) {
          console.log('Error registering token:', error);
        }
      }
    });

    // 2. Listen for notifications received while app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      console.log('Notification received in foreground:', notification);
    });

    // 3. Listen for user tapping on a notification (opens app)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log('Notification tapped:', response);
      // You can navigate to a specific screen here based on response.notification.request.content.data
    });

    return () => {
      return () => {
        notificationListener.current?.remove();
        responseListener.current?.remove();
      };

    };
  }, [user]);
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
