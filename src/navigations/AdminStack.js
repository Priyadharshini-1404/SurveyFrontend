import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SurveyRequestsScreen from '../screens/Admin/SurveyRequestsScreenAdmin';
import ScheduledAppointmentsScreen from '../screens/Admin/ScheduledAppointmentsScreenAdmin';
import PaymentTransactionsScreen from '../screens/Admin/PaymentTransactionsScreenAdmin';
import SurveyTrackingScreen from '../screens/Admin/SurveyTrackingScreenAdmin';

import AppTabs from './AppTabs';
import LoginScreen from '../screens/Auth/LoginScreen';
// import EditProfileScreen from '../screens/Profile/EditProfileScreen';
// import ChangePasswordScreen from '../screens/Drawer/ChangePassword';
// import AdminProfileScreen from '../screens/Profile/AdminProfileScreen';

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/* Admin Home Tabs */}
      <Stack.Screen name="AdminTabs" component={AppTabs} />

      {/* Admin Only Features */}
      <Stack.Screen name="SurveyRequests" component={SurveyRequestsScreen} />
      <Stack.Screen name="ScheduledAppointments" component={ScheduledAppointmentsScreen} />
      <Stack.Screen name="PaymentTransactions" component={PaymentTransactionsScreen} />
      <Stack.Screen name="SurveyTracking" component={SurveyTrackingScreen} />
      <Stack.Screen name="Login" component={LoginScreen}/>
{/* <Stack.Screen name="EditProfile" component={EditProfileScreen} />
<Stack.Screen name="ChangePassword" component={ChangePasswordScreen} />
<Stack.Screen name="AdminProfile" component={AdminProfileScreen} /> */}

    </Stack.Navigator>
  );
}
