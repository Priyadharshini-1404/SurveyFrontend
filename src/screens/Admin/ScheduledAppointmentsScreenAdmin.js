// src/screens/Admin/ScheduledAppointmentsScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const API_URL = "http://192.168.1.9:5000/api/"; // your backend URL

export default function ScheduledAppointmentsScreen() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchAppointments = async () => {
    try {
      const res = await fetch(`${API_URL}appointments`);
      const data = await res.json();
      setAppointments(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchAppointments();
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
      <Text style={styles.name}>{item.userName}</Text>
      <Text>Survey: {item.surveyType}</Text>
      <Text>Date & Time: {item.date} {item.time}</Text>
      <Text>Staff: {item.selectedStaff}</Text>
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
