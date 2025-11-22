import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Ionicons } from "@expo/vector-icons";

import AdminStack from "../AdminStack";
import AddUser from "../../screens/Admin/AddUser";
import UsersList from "../../screens/Admin/UserList";
import AboutUs from "../../screens/Drawer/AboutUs";
import ContactUs from "../../screens/Drawer/ContactUs";
import TermsAndConditions from "../../screens/Drawer/TermsScreen";
import PrivacyPolicy from "../../screens/Drawer/Privacy";
import LogoutScreen from "../../screens/Home/Logout";
import AddStaff from "../../screens/Admin/AddStaff";
import ManageUser from "../../screens/Admin/ManageUser";

const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
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

     <Drawer.Screen
  name="ManageUsers"
  component={ManageUser}
  options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="settings-outline" size={size} color={color} />
    ),
  }}
/>

<Drawer.Screen
  name="AddUser"
  component={AddUser}
  options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="person-add-outline" size={size} color={color} />
    ),
  }}
/>

<Drawer.Screen
  name="AddStaff"
  component={AddStaff}
  options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="person-add-outline" size={size} color={color} />
    ),
  }}
/>

<Drawer.Screen
  name="UsersList"
  component={UsersList}
  options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="people-outline" size={size} color={color} />
    ),
  }}
/>

<Drawer.Screen
  name="AboutUs"
  component={AboutUs}
  options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="information-circle-outline" size={size} color={color} />
    ),
  }}
/>

<Drawer.Screen
  name="ContactUs"
  component={ContactUs}
  options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="chatbubble-ellipses-outline" size={size} color={color} />
    ),
  }}
/>

<Drawer.Screen
  name="Terms And Conditions"
  component={TermsAndConditions}
  options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="document-text-outline" size={size} color={color} />
    ),
  }}
/>

<Drawer.Screen
  name="Privacy And Policy"
  component={PrivacyPolicy}
  options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="shield-checkmark-outline" size={size} color={color} />
    ),
  }}
/>

<Drawer.Screen
  name="Logout"
  component={LogoutScreen}
  options={{
    drawerIcon: ({ color, size }) => (
      <Ionicons name="log-out-outline" size={size} color={color} />
    ),
  }}
/>

    </Drawer.Navigator>
  );
}
