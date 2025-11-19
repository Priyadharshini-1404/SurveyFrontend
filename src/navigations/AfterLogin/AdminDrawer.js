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

      <Drawer.Screen name="ManageUsers" component={ManageUser} />
      <Drawer.Screen name="AddUser" component={AddUser} />
      <Drawer.Screen name="AddStaff" component={AddStaff} />
      <Drawer.Screen name="UsersList" component={UsersList} />
      <Drawer.Screen name="AboutUs" component={AboutUs} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
      <Drawer.Screen name="Terms" component={TermsAndConditions} />
      <Drawer.Screen name="Privacy" component={PrivacyPolicy} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}
