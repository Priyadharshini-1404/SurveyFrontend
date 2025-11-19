import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AppTabs from "./AppTabs"; // Admin tabs

import SurveyRequests from "../screens/Admin/SurveyRequestsScreenAdmin";
import ScheduledAppointments from "../screens/Admin/ScheduledAppointmentsScreenAdmin";
import PaymentTransactions from "../screens/Admin/PaymentTransactionsScreenAdmin";
import SurveyTracking from "../screens/Admin/SurveyTrackingScreenAdmin";

const Stack = createNativeStackNavigator();

export default function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminTabs" component={AppTabs} />
      <Stack.Screen name="SurveyRequests" component={SurveyRequests} />
      <Stack.Screen name="ScheduledAppointments" component={ScheduledAppointments} />
      <Stack.Screen name="PaymentTransactions" component={PaymentTransactions} />
      <Stack.Screen name="SurveyTracking" component={SurveyTracking} />
    </Stack.Navigator>
  );
}
