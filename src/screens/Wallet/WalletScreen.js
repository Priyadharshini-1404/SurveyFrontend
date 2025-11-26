import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "http://192.168.1.9:5000/api/";

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

  const amount = 10;

  const startRazorpayPayment = async () => {
    try {
      console.log("Creating order on backend...");

      const orderRes = await fetch(`${API_URL}payments/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
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
        amount: data.order.amount.toString(),
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
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Payment Summary</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Booking Details</Text>

          {/* UI Field Box */}
          <View style={styles.field}>
            <Text style={styles.label}>User Name</Text>
            <TextInput style={styles.input} value={userName} editable={false} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Contact Number</Text>
            <TextInput style={styles.input} value={contactNumber} editable={false} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Assigned Staff</Text>
            <TextInput style={styles.input} value={selectedStaff?.name} editable={false} />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Survey Type</Text>
            <TextInput style={styles.input} value={surveyType} editable={false} />
          </View>

          <View style={styles.rowContainer}>
            <View style={[styles.field, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Date</Text>
              <TextInput style={styles.input} value={date} editable={false} />
            </View>

            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Time</Text>
              <TextInput style={styles.input} value={time} editable={false} />
            </View>
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Location</Text>
            <TextInput
              style={[styles.input, { height: 65 }]}
              value={location}
              editable={false}
              multiline
            />
          </View>

          <View style={styles.field}>
            <Text style={styles.label}>Advance Amount</Text>
            <TextInput style={styles.input} value={`₹${amount}`} editable={false} />
          </View>
        </View>
      </ScrollView>

      {/* 🔵 Sticky Bottom Payment Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.payButton} onPress={startRazorpayPayment}>
          <Text style={styles.payText}>Pay ₹{amount}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  headerContainer: {
    paddingVertical: 18,
    backgroundColor: "#0a74da",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    elevation: 4,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  scroll: {
    padding: 18,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0a74da",
    marginBottom: 12,
  },

  field: {
    marginBottom: 12,
  },

  label: {
    fontSize: 14,
    color: "#555",
    marginBottom: 4,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#F9FBFC",
    borderRadius: 10,
    padding: 12,
    borderWidth: 1,
    borderColor: "#d9dfe6",
    fontSize: 15,
    color: "#444",
  },

  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  footer: {
    backgroundColor: "#fff",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderTopWidth: 1,
    borderColor: "#e0e0e0",
  },

  payButton: {
    backgroundColor: "#0a74da",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    elevation: 6,
  },

  payText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
});
