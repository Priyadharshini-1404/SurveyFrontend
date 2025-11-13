import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthProvider, useAuth } from './src/hooks/useAuth'; // ✅ import both from same file
import SplashScreen from './src/screens/Auth/SplashScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import AdminDrawer from './src/navigations/AdminDrawer';
import UserDrawer from './src/navigations/UserDrawer';
import HomeScreen from "./src/screens/Home/HomeScreen";
import NotificationsScreen from './src/screens/Home/NotificationScreen';
import RequestSurvey from './src/screens/Survey/RequestSurvey';
import ScheduleScreen from './src/screens/Survey/ScheduleScreen';
import MapPickerScreen from './src/screens/Survey/MapPickerScreen';
const Stack = createNativeStackNavigator();

function RootNav() {
  const { user } = useAuth();

  return (
    <Stack.Navigator screenOptions={{ headerShown:false }}>
      {!user ? (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="MainApp" component={HomeScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen}/>
          <Stack.Screen name="RequestSurvey" component={RequestSurvey}/>
          <Stack.Screen name="ScheduleScreen" component={ScheduleScreen}/>
          <Stack.Screen name="MapPickerScreen" component={MapPickerScreen}/>
          <Stack.Screen name="Home" component={HomeScreen}/>
        </>
      ) : user.role === 'admin' ? (
        <Stack.Screen name="AdminMain" component={AdminDrawer} />
      ) : (
        <Stack.Screen name="UserMain" component={UserDrawer} />
      )}
    </Stack.Navigator>
  );
}

export default function App(){ 
  return (
    <AuthProvider>
      <NavigationContainer>
        <RootNav />
      </NavigationContainer>
    </AuthProvider>
  );
}
