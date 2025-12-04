import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Button, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const API_URL = "http://192.168.1.10:5000/api/surveys";

export default function SurveyTrackingAdmin({ navigation }) {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => { fetchSurveys(); }, []);

  const fetchSurveys = async () => {
    try {
      const res = await fetch(`${API_URL}/track`);
      const data = await res.json();
      setSurveys(data);
    } catch (err) { console.log(err); }
  };

  const updateStatus = async (surveyId, status) => {
    try {
      const res = await fetch(`${API_URL}/update-status/${surveyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Status: status }),
      });
      const result = await res.json();
      if (!res.ok) { Alert.alert("Error", result.message || "Unable"); return; }
      Alert.alert("Success", `Status: ${status}`);
      fetchSurveys();
    } catch (err) { console.log(err); Alert.alert("Error", "Could not update"); }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={26} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Admin Survey Tracking</Text>

        {surveys.map(s => (
          <View key={s.Id} style={styles.card}>
            <Text style={styles.cardTitle}>Survey ID: {s.Id}</Text>
            <Text>User: {s.Name}</Text>
            <Text>Type: {s.SurveyType}</Text>
            <Text>Date: {s.SurveyDate}</Text>
            <Text>Status: <StatusBadge status={s.Status} /></Text>

            <View style={styles.buttonRow}>
              <Button title="In Progress" onPress={() => updateStatus(s.Id, "In Progress")} />
              <Button title="Completed" onPress={() => updateStatus(s.Id, "Completed")} />
              <Button title="Outgoing" onPress={() => updateStatus(s.Id, "Outgoing")} />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

function StatusBadge({ status }) {
  const map = {
    "Pending": "#777",
    "In Progress": "#f39c12",
    "Outgoing": "#0a74da",
    "Completed": "#2ecc71",
    "Rejected": "#e74c3c",
  };
  const color = map[status] || "#777";
  return <Text style={{ color, fontWeight: "700" }}>{status || "Pending"}</Text>;
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  backButton: { marginBottom: 15 },
  title: { fontSize: 26, fontWeight: "bold", color: "#0a74da", marginBottom: 20 },
  card: { backgroundColor: "#f8f9fa", padding: 15, borderRadius: 10, marginBottom: 15, borderWidth: 1, borderColor: "#ddd" },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5 },
  buttonRow: { marginTop: 10, flexDirection: "row", justifyContent: "space-between" },
});
