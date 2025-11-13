// src/navigations/MainDrawer.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useAuth } from "../hooks/useAuth";
import DrawerNavigator from "../navigations/DrawerNavigation";

// Admin Screens
import ManageUsers from "../screens/Admin/ManageUser";
import AddUser from "../screens/Admin/AddUser";
import AddStaff from "../screens/Admin/AddStaff";
import UsersList from "../screens/Admin/UserList";

const Drawer = createDrawerNavigator();

export default function MainDrawer() {
  const { user } = useAuth();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#0a74da",
        drawerLabelStyle: { fontSize: 16 },
      }}
    >
      {/* 👤 Regular User Drawer (Default DrawerNavigator) */}
      {user?.role !== "admin" && (
        <Drawer.Screen
          name="UserHomeDrawer"
          component={DrawerNavigator}
          options={{ title: "Home" }}
        />
      )}

      {/* 🧑‍💼 Admin-only Drawer */}
      {user?.role === "admin" && (
        <>
          <Drawer.Screen
            name="ManageUsers"
            component={ManageUsers}
            options={{ title: "Manage Users" }}
          />
          <Drawer.Screen
            name="AddUser"
            component={AddUser}
            options={{ title: "Add User" }}
          />
          <Drawer.Screen
            name="AddStaff"
            component={AddStaff}
            options={{ title: "Add Staff" }}
          />
          <Drawer.Screen
            name="UsersList"
            component={UsersList}
            options={{ title: "User List" }}
          />
        </>
      )}
    </Drawer.Navigator>
  );
}
