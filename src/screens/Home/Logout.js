import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LogoutScreen({ navigation }) {
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const showLogoutAlert = () => {
      Alert.alert(
        "Confirm Logout",
        "Are you sure you want to logout?",
        [
          {
            text: "Cancel",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
          {
            text: "Yes",
            onPress: async () => {
              setIsLoggingOut(true);

              try {
                await AsyncStorage.removeItem("user");
                await AsyncStorage.removeItem("userToken");
                await AsyncStorage.removeItem("userData");

                // 🔥 Correct Reset for your app structure
               navigation.getParent()?.getParent()?.reset({
  index: 0,
  routes: [{ name: "LoginScreen" }],
});


              } catch (err) {
                console.log("Logout error:", err);
                setIsLoggingOut(false);
              }
            },
          },
        ],
        { cancelable: false }
      );
    };

    setTimeout(showLogoutAlert, 300);
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isLoggingOut && <ActivityIndicator size="large" color="#0a74da" />}
    </View>
  );
}
