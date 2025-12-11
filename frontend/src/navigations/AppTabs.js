import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import ProfileScreen from "../screens/Profile/ProfileScreen";

import SurveyRequestsScreen from "../screens/Admin/SurveyRequestsScreenAdmin";
import ScheduledAppointmentsScreen from "../screens/Admin/ScheduledAppointmentsScreenAdmin";
import PaymentTransactionsScreen from "../screens/Admin/PaymentTransactionsScreenAdmin";
import SurveyTrackingScreen from "../screens/Admin/SurveyTrackingScreenAdmin";

import { useAuth } from "../hooks/useAuth";
import HomeScreen from "./BeforeLogin/HomeScreen";

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  const { user } = useAuth();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0a74da",
        tabBarInactiveTintColor: "#777",
        tabBarIcon: ({ color }) => {
          let icon;
          if (route.name === "Home") icon = "home-outline";
          if (route.name === "Profile") icon = "person-outline";
           if (route.name === "SurveyRequests") icon = "document-text-outline";
  if (route.name === "ScheduledAppointments") icon = "calendar-outline";
  if (route.name === "PaymentTransactions") icon = "wallet-outline";
  if (route.name === "SurveyTracking") icon = "analytics-outline";
          
          return <Ionicons name={icon} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

      {user?.role === "admin" && (
        <>
          <Tab.Screen name="SurveyRequests" component={SurveyRequestsScreen} />
          <Tab.Screen name="ScheduledAppointments" component={ScheduledAppointmentsScreen} />
          <Tab.Screen name="PaymentTransactions" component={PaymentTransactionsScreen} />
          <Tab.Screen name="SurveyTracking" component={SurveyTrackingScreen} />
        </>
      )}
    </Tab.Navigator>
  );
}
