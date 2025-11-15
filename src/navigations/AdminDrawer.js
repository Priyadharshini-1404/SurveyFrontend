// src/navigations/AdminDrawer.js
import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

// Screens
import AppTabs from './AppTabs'; // Admin home tabs
import ManageUsers from '../screens/Admin/ManageUser';
import AddUser from '../screens/Admin/AddUser';
import AddStaff from '../screens/Admin/AddStaff';
import UsersList from '../screens/Admin/UserList';
import RequestSurvey from '../screens/Survey/RequestSurvey';
import ScheduleScreen from '../screens/Survey/ScheduleScreen';
import LogoutScreen from '../screens/Home/Logout';
const Drawer = createDrawerNavigator();

export default function AdminDrawer() {
  return (
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="HomeTabs" component={AppTabs} />
      <Drawer.Screen name="ManageUsers" component={ManageUsers} />
      <Drawer.Screen name="AddUser" component={AddUser} />
      <Drawer.Screen name="AddStaff" component={AddStaff} />
      <Drawer.Screen name="UsersList" component={UsersList} />
      <Drawer.Screen name="Logout" component={LogoutScreen}/>

      


      
    </Drawer.Navigator>
  );
}
