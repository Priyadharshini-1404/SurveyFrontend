import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "http://192.168.1.9:5000/api/"; // your backend URL

export default function SurveyRequestsScreen() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(`${API_URL}surveys`);
        if (!res.ok) {
          const text = await res.text();
          console.log("Server error:", text);
          throw new Error("Failed to fetch survey requests");
        }
        const data = await res.json();
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
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
            <Text>Survey Type: {item.surveyType}</Text>
            <Text>Location: {item.location}</Text>
            <Text>Date: {item.surveyDate}</Text>
            <Text>Contact: {item.contact}</Text>
            <Text>Status: {item.status || "Pending"}</Text>
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
