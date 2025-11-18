// src/navigations/UserStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "../screens/Home/HomeScreen";
import RequestSurvey from "../screens/Survey/RequestSurvey";
import AppointmentScreen from "../screens/Survey/ScheduleScreen";
import NotificationsScreen from "../screens/Home/NotificationScreen";
import ScheduleScreen from "../screens/Survey/ScheduleScreen";
import MapPickerScreen from "../screens/Survey/MapPickerScreen";
import WalletScreen from "../screens/Wallet/WalletScreen";
import CardDetails from "../screens/Wallet/CardDetails";
import SurveyBookingScreen from "../screens/Survey/SurveyBookingScreen";
import LoginScreen from "../screens/Auth/LoginScreen";
const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="RequestSurvey" component={RequestSurvey} />
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
      <Stack.Screen name="MapPickerScreen" component={MapPickerScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="CardDetails" component={CardDetails} />
      <Stack.Screen name="LoginScreen" children={LoginScreen}/>
      <Stack.Screen
        name="SurveyBookingScreen"
        component={SurveyBookingScreen}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="AdminProfile" component={AdminProfileScreen} />
    </Stack.Navigator>
  );
}
