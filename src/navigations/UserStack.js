// src/navigations/UserStack.js
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screens
import HomeScreen from "./BeforeLogin/HomeScreen";
import RequestSurvey from "./BeforeLogin/RequestSurvey";
import AppointmentScreen from "./BeforeLogin/ScheduleScreen";
import NotificationsScreen from "../screens/Home/NotificationScreen";
import ScheduleScreen from "./BeforeLogin/ScheduleScreen";
import MapPickerScreen from "../screens/Survey/MapPickerScreen";
import WalletScreen from "../screens/Wallet/WalletScreen";
import CardDetails from "../screens/Wallet/CardDetails";
import SurveyBookingScreen from "../screens/Survey/SurveyBookingScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import EditProfileScreen from "../screens/Profile/EditProfileScreen";
import ChangePasswordScreen from "../screens/Profile/ChangePasswordScreen";
import AdminProfileScreen from "../screens/Profile/AdminProfileScreen";
import AppTabs from "./AppTabs";
import RazorpayWeb from "../screens/RazorpayWeb";

const Stack = createNativeStackNavigator();

export default function UserStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
     <Stack.Screen name="HomeScreen" component={HomeScreen} />
           <Stack.Screen name="UserTabs" component={AppTabs} />
     
<Stack.Screen
  name="RequestSurvey"
  component={RequestSurvey}
  options={{ freezeOnBlur: true }}
/>
      <Stack.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Stack.Screen name="Notifications" component={NotificationsScreen} />
      <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
      <Stack.Screen name="MapPickerScreen" component={MapPickerScreen} />
      <Stack.Screen name="Wallet" component={WalletScreen} />
      <Stack.Screen name="CardDetails" component={CardDetails} />
      <Stack.Screen
        name="SurveyBookingScreen"
        component={SurveyBookingScreen}
      />
      <Stack.Screen name="RazorpayWeb" component={RazorpayWeb} options={{ headerShown: false }} />

      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
      <Stack.Screen name="AdminProfile" component={AdminProfileScreen} />
    </Stack.Navigator>
  );
}
