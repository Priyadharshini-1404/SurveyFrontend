// src/screens/Home/Logout.js
import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import { useAuth } from "../../hooks/useAuth";

export default function LogoutScreen({ navigation }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout } = useAuth();

  useEffect(() => {
    const doLogout = () => {
      Alert.alert(
        "Logout",
        "Are you sure you want to logout?",
        [
          { text: "Cancel", style: "cancel", onPress: () => navigation.goBack() },
          {
            text: "Yes",
            onPress: async () => {
              setIsLoggingOut(true);
              await logout();
              setIsLoggingOut(false);
              // reset to Home public screen
              navigation.reset({
                index: 0,
                routes: [{ name: "Home" }],
              });
            },
          },
        ],
        { cancelable: true }
      );
    };
    // slight delay so UI shows
    const t = setTimeout(doLogout, 200);
    return () => clearTimeout(t);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoggingOut && <ActivityIndicator size="large" color="#0a74da" />}
    </View>
  );
}
