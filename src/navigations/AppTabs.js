import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "../screens/Home/HomeScreen";
import ProfileScreen from "../screens/Profile/ProfileScreen";
import SurveyRequestsScreen from "../screens/Admin/SurveyRequestsScreenAdmin";
import ScheduledAppointmentsScreen from "../screens/Admin/ScheduledAppointmentsScreenAdmin";
import PaymentTransactionsScreen from "../screens/Admin/PaymentTransactionsScreenAdmin";
import SurveyTrackingScreen from "../screens/Admin/SurveyTrackingScreenAdmin";

import { useAuth } from "../hooks/useAuth";

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  const { user } = useAuth(); // get the logged-in user

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#0a74da",
        tabBarInactiveTintColor: "#777",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 0.5,
          borderTopColor: "#ccc",
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          switch (route.name) {
            case "Home":
              iconName = focused ? "home" : "home-outline"; break;
            case "Profile":
              iconName = focused ? "person" : "person-outline"; break;
            case "SurveyRequests":
              iconName = focused ? "list" : "list-outline"; break;
            case "ScheduledAppointments":
              iconName = focused ? "calendar" : "calendar-outline"; break;
            case "PaymentTransactions":
              iconName = focused ? "card" : "card-outline"; break;
            case "SurveyTracking":
              iconName = focused ? "navigate" : "navigate-outline"; break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      {/* USER TABS */}
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />

      {/* ADMIN TABS — Only show if user is admin */}
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
