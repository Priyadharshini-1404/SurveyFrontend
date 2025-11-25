import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "http://192.168.1.7:5000/api/";

export default function WalletScreen({ route, navigation }) {
  const {
    selectedStaff,
    surveyType,
    date,
    time,
    location,
    notes,
    userName,
    contactNumber,
  } = route.params || {};

  const amount = 10; // advance amount in rupees

  const startRazorpayPayment = async () => {
    try {
      console.log("Creating order on backend...");

      const orderRes = await fetch(`${API_URL}payments/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,     // rupees (your backend converts to paise)
          userName,
          surveyType,
        }),
      });

      if (!orderRes.ok) {
        const txt = await orderRes.text();
        console.log("Order creation failed:", txt);
        Alert.alert("Error", "Unable to create order.");
        return;
      }

      const data = await orderRes.json();
      console.log("Order Response:", data);

      if (!data.order || !data.key) {
        Alert.alert("Error", "Invalid order response.");
        return;
      }

      navigation.navigate("RazorpayWeb", {
        orderId: data.order.id,
        amount: data.order.amount.toString(), // paise string
        key: data.key,
        userName,
        contactNumber,
        surveyType,
        selectedStaff: selectedStaff?.name,
        date,
        time,
        location,
        notes,
        apiBaseUrl: API_URL.replace(/\/$/, ""),
      });

    } catch (error) {
      console.error("startRazorpayPayment:", error);
      Alert.alert("Error", "Payment initialization failed.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>💳 Payment Summary</Text>

      <View style={styles.card}>
        <Text style={styles.label}>User Name</Text>
        <TextInput style={styles.input} value={userName} editable={false} />

        <Text style={styles.label}>Contact</Text>
        <TextInput style={styles.input} value={contactNumber} editable={false} />

        <Text style={styles.label}>Staff</Text>
        <TextInput style={styles.input} value={selectedStaff?.name} editable={false} />

        <Text style={styles.label}>Survey Type</Text>
        <TextInput style={styles.input} value={surveyType} editable={false} />

        <Text style={styles.label}>Date</Text>
        <TextInput style={styles.input} value={date} editable={false} />

        <Text style={styles.label}>Time</Text>
        <TextInput style={styles.input} value={time} editable={false} />

        <Text style={styles.label}>Location</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          value={location}
          editable={false}
          multiline
        />

        <Text style={styles.label}>Advance Amount</Text>
        <TextInput style={styles.input} value={`₹${amount}`} editable={false} />

        <TouchableOpacity style={styles.payButton} onPress={startRazorpayPayment}>
          <Text style={styles.payText}>Pay ₹{amount}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0a74da",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#f8f9fa",
    padding: 20,
    borderRadius: 10,
  },
  label: { fontSize: 16, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    backgroundColor: "#fff",
    marginTop: 5,
  },
  payButton: {
    backgroundColor: "#0a74da",
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  payText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
