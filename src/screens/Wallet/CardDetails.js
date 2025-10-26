// src/screens/Wallet/CardDetailsScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CardDetailsScreen({ navigation }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const handlePayment = () => {
    alert('Payment Successful!');
    navigation.navigate('MainApp'); // navigate back to home after payment
  };

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
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0a74da', textAlign: 'center', marginVertical: 20 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginTop: 10 },
  button: { backgroundColor: '#0a74da', padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});
