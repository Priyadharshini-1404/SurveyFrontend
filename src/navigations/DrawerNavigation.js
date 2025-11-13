// src/navigations/DrawerNavigator.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import AppTabs from './AppTabs';
import Appointment from '../screens/Drawer/Appoinment';
import AboutUs from '../screens/Drawer/AboutUs';
import ContactUs from '../screens/Drawer/ContactUs';
import TermsScreen from '../screens/Drawer/TermsScreen';
import PrivacyScreen from '../screens/Drawer/Privacy';
import ChangePasswordScreen from '../screens/Drawer/ChangePassword';
import LogoutScreen from '../screens/Drawer/Logout';

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#0a74da',
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={AppTabs}
        options={{
          title: 'Home',
          drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Appointments"
        component={Appointment}
        options={{
          title: 'Appointments',
          drawerIcon: ({ color, size }) => <Ionicons name="calendar-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'About Us',
          drawerIcon: ({ color, size }) => <Ionicons name="information-circle-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          title: 'Contact Us',
          drawerIcon: ({ color, size }) => <Ionicons name="call-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Terms"
        component={TermsScreen}
        options={{
          title: 'Terms & Conditions',
          drawerIcon: ({ color, size }) => <Ionicons name="document-text-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          title: 'Privacy Policy',
          drawerIcon: ({ color, size }) => <Ionicons name="lock-closed-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="ChangePassword"
        component={ChangePasswordScreen}
        options={{
          title: 'Change Password',
          drawerIcon: ({ color, size }) => <Ionicons name="key-outline" size={size} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          title: 'Logout',
          drawerIcon: ({ color, size }) => <Ionicons name="log-out-outline" size={size} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
}
