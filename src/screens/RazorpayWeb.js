// RazorpayWeb.js
import React, { useRef, useState, useEffect } from "react";
import { View, BackHandler, TouchableOpacity, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

const API_URL = process.env.EXPO_PUBLIC_API_URL; // ✅ Use your backend URL

export default function RazorpayWeb({ route, navigation }) {
  const { orderId, amount } = route.params;

  const paymentUrl = `${API_URL.replace(/\/$/, "")}/razorpay-checkout?orderId=${orderId}&amount=${amount}`;

  const webViewRef = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);

  // Handle Android Back Button
  useEffect(() => {
    const backAction = () => {
      if (canGoBack && webViewRef.current) {
        webViewRef.current.goBack();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [canGoBack]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      
      {/* Back Button */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 15,
        }}
        onPress={() => {
          if (canGoBack && webViewRef.current) {
            webViewRef.current.goBack();
          } else {
            navigation.goBack();
          }
        }}
      >
        <Ionicons name="arrow-back" size={26} color="#000" />
        <Text style={{ marginLeft: 10, fontSize: 18 }}>Payment</Text>
      </TouchableOpacity>

      {/* Razorpay Checkout */}
      <WebView
        ref={webViewRef}
        source={{ uri: paymentUrl }}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onNavigationStateChange={(navState) => setCanGoBack(navState.canGoBack)}
      />
    </SafeAreaView>
  );
}
