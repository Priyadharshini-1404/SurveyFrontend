// src/navigations/UserDrawer.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import UserStack from "./UserStack"; // Stack of user screens
import DrawerNavigator from "../../src/navigations/DrawerNavigation";

const Drawer = createDrawerNavigator();

export default function UserDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false }}
    >
      <Drawer.Screen name="DrawerNavigator" component={DrawerNavigator}/>
      <Drawer.Screen name="HomeStack" component={UserStack} options={{ title: "Home" }} />
    </Drawer.Navigator>
  );
}
