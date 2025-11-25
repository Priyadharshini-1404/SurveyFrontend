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
import RazorpayCheckout from "react-native-razorpay";

// ⚠️ Use your backend API URL here (make sure the device can reach it)
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

  const amount = 10; // advance amount

  // --------------------------
  // Razorpay Payment
  // --------------------------
  const startRazorpayPayment = async () => {
    try {
      console.log("Starting Razorpay Payment...");

      // 1️⃣ Create Razorpay Order from Backend
      const orderRes = await fetch(`${API_URL}payments/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          userName,
          surveyType,
        }),
      });

      const data = await orderRes.json();
      console.log("Order Response:", data);

      if (!data || !data.order) {
        Alert.alert("Error", "Unable to create order");
        return;
      }

      // 2️⃣ Razorpay Checkout Options
      const options = {
        name: "Survey Services",
        description: surveyType,
        currency: "INR",
        key: data.key, // Razorpay Key ID
        amount: data.order.amount, // in paise
        order_id: data.order.id,
        prefill: {
          name: userName,
          contact: contactNumber,
        },
        theme: { color: "#0a74da" },
      };

      // 3️⃣ Open Razorpay Checkout
      RazorpayCheckout.open(options)
        .then(async (res) => {
          console.log("Payment Success:", res);

          // 4️⃣ Verify Payment on Backend
          const verifyRes = await fetch(`${API_URL}payments/verify`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              razorpay_payment_id: res.razorpay_payment_id,
              razorpay_order_id: res.razorpay_order_id,
              razorpay_signature: res.razorpay_signature,
              userName,
              contactNumber,
              surveyType,
              selectedStaff: selectedStaff?.name,
              date,
              time,
              location,
              notes,
              amount,
            }),
          });

          const verifyData = await verifyRes.json();
          console.log("Verify Response:", verifyData);

          if (verifyData.success) {
            Alert.alert("Success", "Payment Successful!");
            navigation.navigate("MainApp");
          } else {
            Alert.alert("Error", "Payment verification failed.");
          }
        })
        .catch((err) => {
          console.error("Razorpay Error:", err);
          Alert.alert("Payment Failed", err?.description || "Unknown error");
        });
    } catch (error) {
      console.error("Start Razorpay Error:", error);
      Alert.alert("Error", "Failed to start Razorpay. Check console for details.");
    }
  };

  // --------------------------
  // UI Rendering
  // --------------------------
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>💳 Payment Summary</Text>

      <View style={styles.card}>
        <Text style={styles.label}>User Name:</Text>
        <TextInput style={styles.input} value={userName} editable={false} />

        <Text style={styles.label}>Contact:</Text>
        <TextInput style={styles.input} value={contactNumber} editable={false} />

        <Text style={styles.label}>Staff:</Text>
        <TextInput
          style={styles.input}
          value={selectedStaff?.name || ""}
          editable={false}
        />

        <Text style={styles.label}>Survey Type:</Text>
        <TextInput style={styles.input} value={surveyType} editable={false} />

        <Text style={styles.label}>Date:</Text>
        <TextInput style={styles.input} value={date} editable={false} />

        <Text style={styles.label}>Time:</Text>
        <TextInput style={styles.input} value={time} editable={false} />

        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          value={location}
          editable={false}
          multiline
        />

        <Text style={styles.label}>Amount (Advance):</Text>
        <TextInput style={styles.input} value={`₹${amount}`} editable={false} />

        {/* PAY BUTTON */}
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
    marginVertical: 20,
  },
  card: { backgroundColor: "#f8f9fa", padding: 20, borderRadius: 10 },
  label: { fontSize: 16, marginTop: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    backgroundColor: "#fff",
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
