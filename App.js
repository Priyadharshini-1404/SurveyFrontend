// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SplashScreen from './src/screens/Auth/SplashScreen';
import LoginScreen from './src/screens/Auth/LoginScreen';
// import AdminDashboard from './src/screens/Auth/AdminDashboard';
// import UserDashboard from './src/screens/Auth/UserDashboard';
import RegisterScreen from './src/screens/Auth/RegisterScreen';
import CardDetails from './src/screens/Wallet/CardDetails'
// import SurveyMain from './src/screens/Survey/SurveyMain';
import RequestSurvey from './src/screens/Survey/RequestSurvey';
import ScheduleScreen from './src/screens/Survey/ScheduleScreen';
import DrawerNavigator from './src/navigations/DrawerNavigation';
import HomeScreen from './src/screens/Home/HomeScreen';
import NotificationsScreen from './src/screens/Home/NotificationScreen';
// Auth Provider
import { AuthProvider } from './src/auth/AuthContext';
import WalletScreen from './src/screens/Wallet/WalletScreen';
import SurveyBookingScreen from './src/screens/Survey/SurveyBookingScreen';
import MapPickerScreen from './src/screens/Survey/MapPickerScreen';
const Stack = createNativeStackNavigator();

// ----------------------
// Bottom Tabs (Main App)
// ----------------------
// function MainTabs() {
//   return (
//     <Tab.Navigator
//       screenOptions={({ route }) => ({
//         headerShown: false,
//         tabBarShowLabel: true,
//         tabBarActiveTintColor: '#0a74da',
//         tabBarInactiveTintColor: '#777',
//         tabBarStyle: {
//           backgroundColor: '#fff',
//           borderTopWidth: 0.5,
//           borderTopColor: '#ccc',
//           height: 60,
//           paddingBottom: 8,
//         },
//         tabBarIcon: ({ color, size }) => {
//           let iconName;
//           if (route.name === 'Home') iconName = 'home';
//           else if (route.name === 'Survey') iconName = 'clipboard';
//           else if (route.name === 'Wallet') iconName = 'wallet';
//           else if (route.name === 'Chat') iconName = 'chatbubbles';
//           else if (route.name === 'Profile') iconName = 'person';
//           return <Ionicons name={iconName} size={size} color={color} />;
//         },
//       })}
//     >
//       <Tab.Screen name="Home" component={HomeScreen} />
//       <Tab.Screen name="Survey" component={SurveyStack} options={{ headerShown: false, title: "Survey" }} />
//       <Tab.Screen name="CardDetails" component={CardDetails} />
//       <Tab.Screen name="Chat" component={RequestSurvey} />
//       <Tab.Screen name="Profile" component={ScheduleScreen} />
//     </Tab.Navigator>
//   );
// }

// ----------------------
// Main App Navigation
// ----------------------
export default function App() {
  return (
    <AuthProvider> {/* ✅ Wrap the app in AuthProvider */}
      <NavigationContainer>
            <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
              <Stack.Screen name="Splash" component={SplashScreen} />
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Register" component={RegisterScreen} />
              <Stack.Screen name="MainApp" component={DrawerNavigator} />
              {/* <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
              <Stack.Screen name="UserDashboard" component={UserDashboard} /> */}
              <Stack.Screen name="MapPickerScreen" component={MapPickerScreen}/>
              {/* <Stack.Screen name="SurveyMain" component={SurveyMain} /> */}
              <Stack.Screen name="RequestSurvey" component={RequestSurvey} />
              <Stack.Screen name="ScheduleScreen" component={ScheduleScreen} />
              <Stack.Screen name="Wallet" component={WalletScreen} />
              <Stack.Screen name="CardDetails" component={CardDetails}/>
              <Stack.Screen name="SurveyBookingScreen" component={SurveyBookingScreen}/>
              <Stack.Screen name="Home" component={HomeScreen}/>
              <Stack.Screen name="Notifications" component={NotificationsScreen} />

            </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
