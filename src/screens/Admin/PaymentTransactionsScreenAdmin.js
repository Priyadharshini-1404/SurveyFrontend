// src/screens/Admin/PaymentTransactionsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function PaymentTransactionsScreen() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyData = [
      { id: "1", user: "Suresh", amount: 1999, method: "UPI", date: "2025-01-10" },
      { id: "2", user: "Kavya", amount: 2999, method: "Card", date: "2025-01-11" },
    ];

    setTimeout(() => {
      setPayments(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Payment Transactions</Text>

      <FlatList
        data={payments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.user}</Text>
            <Text>Amount: ₹{item.amount}</Text>
            <Text>Method: {item.method}</Text>
            <Text>Date: {item.date}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: {
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  name: { fontSize: 18, fontWeight: "bold" },
});
