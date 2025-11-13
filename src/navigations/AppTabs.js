// src/navigations/AppTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Screens
import HomeScreen from '../screens/Home/HomeScreen';
import ScheduleScreen from '../screens/Survey/ScheduleScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#0a74da',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0.5,
          borderTopColor: '#ccc',
          height: 60,
          paddingBottom: 8,
        },
        tabBarIcon: ({ color, size, focused }) => {
          let iconName;
          if (route.name === 'Home') iconName = focused ? 'home' : 'home-outline';
          else if (route.name === 'Survey') iconName = focused ? 'clipboard' : 'clipboard-outline';
          else if (route.name === 'Profile') iconName = focused ? 'person' : 'person-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Survey" component={ScheduleScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
