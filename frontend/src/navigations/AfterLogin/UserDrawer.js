import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import AppTabs from "../AppTabs";
import AboutUs from "../../screens/Drawer/AboutUs";
import ContactUs from "../../screens/Drawer/ContactUs";
import LogoutScreen from "../../screens/Home/Logout";
import PrivacyPolicy from "../../screens/Drawer/Privacy";
import TermsAndConditions from "../../screens/Drawer/TermsScreen";
import UserStack from "../UserStack";

const Drawer = createDrawerNavigator();

export default function UserDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      
      {/* Main app bottom tabs */}
      <Drawer.Screen 
        name="HomeTabs" 
        component={AppTabs}
        options={{ title: "Home" }}
      />
      <Drawer.Screen
  name="UserStack"
  component={UserStack}
  options={{
    title: "User Navigation",
    drawerItemStyle: { display: "none" }   // 🔥 HIDE FROM DRAWER
  }}
/>


      {/* Drawer Items */}
      <Drawer.Screen name="AboutUs" component={AboutUs} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
      <Drawer.Screen name="Terms" component={TermsAndConditions} />
      <Drawer.Screen name="Privacy" component={PrivacyPolicy} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />

    </Drawer.Navigator>
  );
}
