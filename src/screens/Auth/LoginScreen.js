// src/screens/Auth/LoginScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useAuth } from "../../hooks/useAuth";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

// LoginScreen.js
const { login, redirectScreen, setRedirectScreen } = useAuth();

const handleLogin = async () => {
  if (!email || !password) return Alert.alert("Validation", "Enter email and password");

  try {
    const loggedUser = await login(email, password);

    // 🔹 If user clicked protected screen before login, redirect there
    if (redirectScreen) {
      navigation.replace(redirectScreen);
      setRedirectScreen(null);
      return;
    }

    // 🔹 Otherwise go to admin or user panel
    if (loggedUser.role === "admin") {
      navigation.replace("AdminDrawer");
    } else {
      navigation.replace("MainDrawer");
    }
  } catch (err) {
    Alert.alert("Login Failed", err.message);
  }
};



  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 20, backgroundColor: "#f9f9f9" }}>
      <Text style={{ fontSize: 28, fontWeight: "bold", textAlign: "center", marginBottom: 30 }}>
        Welcome Back!
      </Text>

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        style={{ borderWidth: 1, marginBottom: 15, padding: 12, borderRadius: 8 }}
      />

      <View style={{ flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: 8, marginBottom: 20 }}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          style={{ flex: 1, padding: 12 }}
        />
        <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={{ paddingHorizontal: 10 }}>
          <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        style={{ backgroundColor: "#0a74da", padding: 15, borderRadius: 8, marginBottom: 15 }}
      >
        <Text style={{ color: "#fff", textAlign: "center", fontWeight: "bold", fontSize: 16 }}>Login</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Text style={{ fontSize: 14 }}>Don't have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={{ color: "#0a74da", fontWeight: "bold", fontSize: 14 }}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
