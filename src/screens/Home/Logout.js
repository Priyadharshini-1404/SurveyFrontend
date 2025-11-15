import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { resetTo } from "../../navigations/RootNavigation";

export default function LogoutScreen() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

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
              try {
                await AsyncStorage.clear();  // clear user token/data
                resetTo("Login");           // reset root navigation
              } catch (err) {
                console.log(err);
                setIsLoggingOut(false);
              }
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
