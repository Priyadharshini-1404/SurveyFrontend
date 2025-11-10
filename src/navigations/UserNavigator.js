import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Home/HomeScreen';
import RequestSurvey from '../screens/Survey/RequestSurvey';
import SurveyBookingScreen from '../screens/Survey/SurveyBookingScreen';
import WalletScreen from '../screens/Wallet/WalletScreen';
import CardDetails from '../screens/Wallet/CardDetails';

const Stack = createNativeStackNavigator();

export default function UserNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="RequestSurvey" component={RequestSurvey} />
      <Stack.Screen name="SurveyBookingScreen" component={SurveyBookingScreen} />
      <Stack.Screen name="WalletScreen" component={WalletScreen} />
      <Stack.Screen name="CardDetails" component={CardDetails} />
    </Stack.Navigator>
  );
}
