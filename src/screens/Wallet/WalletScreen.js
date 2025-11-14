import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Alert,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function WalletScreen({ route, navigation }) {
  const { selectedStaff, surveyType, date, time, location, notes, userName, contactNumber } =
    route.params || {};

  const [paymentType, setPaymentType] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const advanceAmount = 10;
  const amount = advanceAmount;

  // ✅ Updated handleSubmit (removed surveyId)
  const handleSubmit = async (paymentStatus = "Success") => {
    try {
      const res = await fetch("http://192.168.1.7:5000/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userName, // from route.params
          contactNumber,
          amount,
          surveyType,
          paymentType,
          paymentStatus,
          selectedStaff: selectedStaff?.name || "",
          date,
          time,
          location,
          notes,
        }),
      });

      const data = await res.json();
      Alert.alert("Payment", data.message || "Payment recorded successfully!");
      navigation.navigate("MainApp");
    } catch (error) {
      console.error("Submit Error:", error);
      Alert.alert("Error", "Failed to store payment details");
    }
  };

  // ✅ Handle UPI payment
  const handleGPayPayment = async () => {
    const upiId = "priyasan170594@axl"; // replace if needed
    const name = "SurveyServices";
    const note = "Survey Advance Payment";

    const url = `upi://pay?pa=${upiId}&pn=${name}&am=${advanceAmount}&cu=INR&tn=${note}`;

    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        Alert.alert(
          "Complete Payment",
          "Once you've finished paying in GPay, return to this app and tap 'Confirm Payment'."
        );
      } else {
        Alert.alert("Error", "No UPI app found (GPay, PhonePe, etc.)");
      }
    } catch (error) {
      console.error("Error launching UPI:", error);
      Alert.alert("Error", "Could not open UPI payment app.");
    }
  };

const handlePaymentSelect = (method) => {
  setPaymentType(method);
  setShowPaymentModal(false);

  if (method === "Credit / Debit Card") {
    // ✅ Just navigate, don't submit yet
    navigation.navigate("CardDetails", {
      selectedStaff,
      surveyType,
      date,
      time,
      location,
      notes,
      amount: advanceAmount,
      userName,
    });
  } else if (method === "GPay / PhonePe") {
    handleGPayPayment(); // opens UPI
  } else {
    // Save immediately for other methods
    Alert.alert(method, `Selected ${method}`, [
      { text: "OK", onPress: () => handleSubmit("Pending") },
    ]);
  }
};




  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>💳 Payment Summary</Text>

      <View style={styles.card}>
        <Text style={styles.label}>User Name:</Text>
        <TextInput style={styles.input} value={userName || ""} editable={false} />
         
         <Text style={styles.label}>Contact:</Text>
         <TextInput style={styles.input} value={contactNumber || ""} editable={false}/>

        <Text style={styles.label}>Staff:</Text>
        <TextInput
          style={styles.input}
          value={selectedStaff?.name || ""}
          editable={false}
        />

        <Text style={styles.label}>Survey Type:</Text>
        <TextInput
          style={styles.input}
          value={surveyType || ""}
          editable={false}
        />

        <Text style={styles.label}>Date:</Text>
        <TextInput style={styles.input} value={date || ""} editable={false} />

        <Text style={styles.label}>Time:</Text>
        <TextInput style={styles.input} value={time || ""} editable={false} />

        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={[styles.input, { height: 60 }]}
          value={location || ""}
          editable={false}
          multiline
        />

        <Text style={styles.label}>Amount (Advance):</Text>
        <TextInput
          style={styles.input}
          value={`₹${advanceAmount}`}
          editable={false}
        />

        <Text style={styles.label}>Select Payment Method:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowPaymentModal(true)}
        >
          <Text style={styles.dropdownText}>
            {paymentType || "Choose Payment Method"}
          </Text>
        </TouchableOpacity>

        {/* Modal for selecting payment method */}
        <Modal visible={showPaymentModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {[
                "Credit / Debit Card",
                "Digital Wallet",
                "Bank Transfer",
                "GPay / PhonePe",
              ].map((method) => (
                <TouchableOpacity
                  key={method}
                  onPress={() => handlePaymentSelect(method)}
                >
                  <Text style={styles.modalItem}>{method}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Manual submit fallback */}
        <TouchableOpacity
          style={[styles.submitButton, { backgroundColor: "#28a745" }]}
          onPress={() => handleSubmit("Success")}
        >
          <Text style={styles.submitText}>Confirm Payment</Text>
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
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    marginTop: 5,
  },
  dropdownText: { fontSize: 16, color: "#333" },
  submitButton: {
    backgroundColor: "#0a74da",
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: "center",
  },
  submitText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    margin: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  closeButton: {
    marginTop: 10,
    textAlign: "center",
    color: "#0a74da",
    fontWeight: "bold",
  },
});
