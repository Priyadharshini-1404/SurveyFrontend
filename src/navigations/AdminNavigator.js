import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminDashboard from '../screens/Auth/AdminDashboard';
import ManageUsers from '../screens/Admin/ManageUsers';
import ManageSurveys from '../screens/Admin/ManageSurveys';
import ManageAppointments from '../screens/Admin/ManageAppointments';
import ManagePayments from '../screens/Admin/ManagePayments';

const Stack = createNativeStackNavigator();

export default function AdminNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      <Stack.Screen name="ManageUsers" component={ManageUsers} />
      <Stack.Screen name="ManageSurveys" component={ManageSurveys} />
      <Stack.Screen name="ManageAppointments" component={ManageAppointments} />
      <Stack.Screen name="ManagePayments" component={ManagePayments} />
    </Stack.Navigator>
  );
}
