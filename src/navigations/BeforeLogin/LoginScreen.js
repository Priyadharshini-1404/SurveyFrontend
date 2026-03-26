// src/screens/Auth/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const { login, redirectScreen, setRedirectScreen } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) return Alert.alert("Validation", "Enter email and password");
    try {
      const loggedUser = await login(email.trim(), password);
      if (!loggedUser) throw new Error("No user returned");

      // Priority: if user clicked a protected screen before login, route them there
      if (redirectScreen) {
        // go to drawer first, then navigate into the nested stack screen
        if (loggedUser.role === "admin") {
          navigation.replace("AdminDrawer");
          // admin protected screens could be handled here if applicable
        } else {
          navigation.replace("UserDrawer");
          // small delay to ensure drawer mounted, then navigate nested
          setTimeout(() => {
            navigation.navigate("UserDrawer", { screen: "UserStack", params: { screen: redirectScreen } });
          }, 50);
        }
        setRedirectScreen(null);
        return;
      }

      // Normal role-based routing
      if (loggedUser.role === "admin") {
        navigation.replace("AdminDrawer");
      } else {
        navigation.replace("UserDrawer");
      }
    } catch (err) {
      Alert.alert("Login Failed", err.message || "Failed to login");
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 30 }}>Welcome Back!</Text>

      <TextInput placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 15, padding: 12, borderRadius: 8, backgroundColor: "#fff" }} />

      <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 8, marginBottom: 20, backgroundColor: "#fff" }}>
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry={!showPassword} style={{ flex: 1, padding: 12 }} />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 12 }}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleLogin} style={{ backgroundColor: "#0a74da", padding: 15, borderRadius: 8, marginBottom: 15 }}>
        <Text style={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}>Login</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "#0a74da", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
