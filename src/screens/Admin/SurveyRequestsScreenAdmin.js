// src/screens/Admin/SurveyRequestsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SurveyRequestsScreen() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Replace with your API call
    const dummyData = [
      { id: "1", name: "Ravi Kumar", location: "Chennai", date: "2025-01-15" },
      { id: "2", name: "Priya Sharma", location: "Coimbatore", date: "2025-01-16" },
    ];

    setTimeout(() => {
      setRequests(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Survey Requests</Text>

      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text>Location: {item.location}</Text>
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
