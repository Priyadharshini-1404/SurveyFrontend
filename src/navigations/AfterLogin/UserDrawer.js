import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import UserStack from "../UserStack";
import AboutUs from "../../screens/Drawer/AboutUs";
import ContactUs from "../../screens/Drawer/ContactUs";
import LogoutScreen from "../../screens/Home/Logout";
import PrivacyPolicy from "../../screens/Drawer/Privacy";
import TermsAndConditions from "../../screens/Drawer/TermsScreen";

const Drawer = createDrawerNavigator();

export default function UserDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="UserStack" component={UserStack} />
      <Drawer.Screen name="AboutUs" component={AboutUs} />
      <Drawer.Screen name="ContactUs" component={ContactUs} />
      <Drawer.Screen name="Terms" component={TermsAndConditions} />
      <Drawer.Screen name="Privacy" component={PrivacyPolicy} />
      <Drawer.Screen name="Logout" component={LogoutScreen} />
    </Drawer.Navigator>
  );
}
