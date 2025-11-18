import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import AdminStack from './AdminStack';  // <-- Important

import ManageUsers from '../screens/Admin/ManageUser';
import AddUser from '../screens/Admin/AddUser';
import AddStaff from '../screens/Admin/AddStaff';
import UsersList from '../screens/Admin/UserList';

import LogoutScreen from '../screens/Home/Logout';
import AboutUs from '../screens/Drawer/AboutUs';
import ContactUs from '../screens/Drawer/ContactUs';
import TermsScreen from '../screens/Drawer/TermsScreen';
import PrivacyScreen from '../screens/Drawer/Privacy';

import { Ionicons } from '@expo/vector-icons';

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>

      {/* Dashboard + Admin Stack */}
      <Drawer.Screen 
        name="AdminStack"
        component={AdminStack}
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="grid-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Other drawer items */}
      <Drawer.Screen 
        name="ManageUsers" 
        component={ManageUsers}
        options={{
          title: "Manage Users",
          drawerIcon: ({ color, size }) =>
            <Ionicons name="people-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen 
        name="AddUser" 
        component={AddUser}
        options={{
          title: "Add User",
          drawerIcon: ({ color, size }) =>
            <Ionicons name="person-add-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen 
        name="AddStaff" 
        component={AddStaff}
        options={{
          title: "Add Staff",
          drawerIcon: ({ color, size }) =>
            <Ionicons name="person-circle-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen 
        name="UsersList" 
        component={UsersList}
        options={{
          title: "User List",
          drawerIcon: ({ color, size }) =>
            <Ionicons name="list-outline" size={size} color={color} />,
        }}
      />

      {/* Footer items */}
      <Drawer.Screen 
        name="Logout" 
        component={LogoutScreen}
        options={{
          title: "Logout",
          drawerIcon: ({ color, size }) =>
            <Ionicons name="log-out-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: 'About Us',
          drawerIcon: ({ color, size }) =>
            <Ionicons name="information-circle-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          title: 'Contact Us',
          drawerIcon: ({ color, size }) =>
            <Ionicons name="call-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Terms"
        component={TermsScreen}
        options={{
          title: 'Terms & Conditions',
          drawerIcon: ({ color, size }) =>
            <Ionicons name="document-text-outline" size={size} color={color} />,
        }}
      />

      <Drawer.Screen
        name="Privacy"
        component={PrivacyScreen}
        options={{
          title: 'Privacy Policy',
          drawerIcon: ({ color, size }) =>
            <Ionicons name="lock-closed-outline" size={size} color={color} />,
        }}
      />

    </Drawer.Navigator>
  );
}
