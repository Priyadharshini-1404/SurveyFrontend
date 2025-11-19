import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetTo } from "../../navigations/RootNavigation";
// LogoutScreen.js
import { useAuth } from "../../hooks/useAuth";


export default function LogoutScreen({ navigation }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
const { logout } = useAuth();



  useEffect(() => {
    const logout = () => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          { text: "Cancel", style: "cancel" },
          {
            text: "Yes",
            onPress: async () => {
              setIsLoggingOut(true);
               await logout();
  navigation.reset({
    index: 0,
    routes: [{ name: "Home" }], // go to HomeScreen after logout
  });
            },
          },
        ],
        { cancelable: false }
      );
    };

    setTimeout(logout, 200);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoggingOut && <ActivityIndicator size="large" color="#0a74da" />}
    </View>
  );
}
