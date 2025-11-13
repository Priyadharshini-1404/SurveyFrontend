// src/navigations/AdminDrawer.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

// Screens
import AppTabs from "../navigations/AppTabs";
import ManageUsers from "../screens/Admin/ManageUser";
import AddStaff from "../screens/Admin/AddStaff";
// import Reports from "../screens/Admin/Reports";
import LogoutScreen from "../screens/Drawer/Logout";
import AboutUs from "../screens/Drawer/AboutUs";
import ContactUs from "../screens/Drawer/ContactUs";

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#0a74da",
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={AppTabs}
        options={{
          title: "Dashboard",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="speedometer-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ManageUsers"
        component={ManageUsers}
        options={{
          title: "Manage Users",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="AddStaff"
        component={AddStaff}
        options={{
          title: "Add Staff Member",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-add-outline" size={size} color={color} />
          ),
        }}
      />
      {/* <Drawer.Screen
        name="Reports"
        component={Reports}
        options={{
          title: "Reports",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="bar-chart-outline" size={size} color={color} />
          ),
        }}
      /> */}
      <Drawer.Screen
        name="AboutUs"
        component={AboutUs}
        options={{
          title: "About Us",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          title: "Contact Us",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="call-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Logout"
        component={LogoutScreen}
        options={{
          title: "Logout",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
