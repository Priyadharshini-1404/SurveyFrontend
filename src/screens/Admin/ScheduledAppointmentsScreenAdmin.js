// src/screens/Admin/ScheduledAppointmentsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function ScheduledAppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyData = [
      { id: "1", user: "Arun", surveyDate: "2025-01-20", status: "Scheduled" },
      { id: "2", user: "Divya", surveyDate: "2025-01-22", status: "Pending" },
    ];

    setTimeout(() => {
      setAppointments(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Scheduled Appointments</Text>

      <FlatList
        data={appointments}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.user}</Text>
            <Text>Date: {item.surveyDate}</Text>
            <Text>Status: {item.status}</Text>
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
