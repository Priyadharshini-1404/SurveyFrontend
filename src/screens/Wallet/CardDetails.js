// src/screens/Wallet/CardDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CardDetailsScreen({ route, navigation }) {
  const { userName, contactNumber, surveyType, amount } = route.params || {};

  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = async () => {
    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill all card details.");
      return;
    }

   try {
  const res = await fetch("http://192.168.1.8:5000/api/cardpayments", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userName,
      surveyType,
      amount,
      paymentType: "Credit / Debit Card",
      cardNumber,
      expiry,
      cvv,
    }),
  });

  const text = await res.text(); // 🔍 check the actual response
  console.log("Server response:", text);

  let data;
  try {
    data = JSON.parse(text);
  } catch (err) {
    console.error("Response not JSON:", text);
    throw new Error("Invalid JSON response from server");
  }

  alert(data.message);
  navigation.navigate("MainApp");
} catch (error) {
  console.error("Payment error:", error);
  alert("Payment failed");
}

  };

  // ✅ Return UI
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Enter Card Details</Text>

      <TextInput
        placeholder="Card Number"
        style={styles.input}
        keyboardType="numeric"
        value={cardNumber}
        onChangeText={setCardNumber}
      />

      <TextInput
        placeholder="Expiry Date (MM/YY)"
        style={styles.input}
        value={expiry}
        onChangeText={setExpiry}
      />

      <TextInput
        placeholder="CVV"
        style={styles.input}
        keyboardType="numeric"
        secureTextEntry
        value={cvv}
        onChangeText={setCvv}
      />

      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay ₹{amount}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// ✅ Styles
const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0a74da',
    textAlign: 'center',
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#0a74da',
    padding: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
