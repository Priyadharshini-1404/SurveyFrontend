//UserDrawer.js
import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/Home/HomeScreen";
import RequestSurvey from "../screens/Survey/RequestSurvey";
import AppointmentScreen from "../screens/Survey/ScheduleScreen";
import NotificationsScreen from "../../src/screens/Home/NotificationScreen";
import ScheduleScreen from "../../src/screens/Survey/ScheduleScreen";
import MapPickerScreen from "../../src/screens/Survey/MapPickerScreen";
import DrawerNavigator from "../navigations/DrawerNavigation";
import WalletScreen from "../screens/Wallet/WalletScreen";
import CardDetails from "../screens/Wallet/CardDetails";
import SurveyBookingScreen from "../screens/Survey/SurveyBookingScreen";
import AppTabs from "../navigations/AppTabs";

const Drawer = createDrawerNavigator();

export default function UserDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="RequestSurvey" component={RequestSurvey} />
      <Drawer.Screen name="AppointmentScreen" component={AppointmentScreen} />
      <Drawer.Screen name="Notifications" component={NotificationsScreen} />
      <Drawer.Screen name="ScheduleScreen" component={ScheduleScreen} />
      <Drawer.Screen name="MapPickerScreen" component={MapPickerScreen} />
      <Drawer.Screen name="Drawer" component={DrawerNavigator} />
      <Drawer.Screen name="Wallet" component={WalletScreen}/>
      <Drawer.Screen name="CardDetails" component={CardDetails}/>
      <Drawer.Screen name="SurveyBookingScreen" component={SurveyBookingScreen}/>
      <Drawer.Screen name="AppTabs" component={AppTabs}/>
    </Drawer.Navigator>
  );
}
