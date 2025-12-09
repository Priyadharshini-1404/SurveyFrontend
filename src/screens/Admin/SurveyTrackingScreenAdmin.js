import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const API_URL = "http://192.168.1.10:5000/api/surveys";

export default function SurveyTrackingAdmin({ navigation }) {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      const res = await fetch(`${API_URL}/track`);
      const data = await res.json();
      setSurveys(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateStatus = async (surveyId, status, userId) => {
    try {
      const res = await fetch(`${API_URL}/update-status/${surveyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Status: status, UserID: userId }),
      });
      const result = await res.json();

      if (!res.ok) {
        Alert.alert("Error", result.message || "Unable to update");
        return;
      }

      Alert.alert("Success", `Status updated to ${status}`);
      fetchSurveys();

      // 🔥 Real-time update trigger (user screen updates)
      fetch(`${API_URL}/notify-user/${userId}`, { method: "POST" });

    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Could not update");
    }
  };

  const getStatusBadge = (status) => {
    let bg = "#999";

    if (status === "Pending") bg = "#f1c40f";
    if (status === "In Progress") bg = "#3498db";
    if (status === "Completed") bg = "#2ecc71";
    if (status === "Outgoing") bg = "#9b59b6";

    return (
      <View style={[styles.statusBadge, { backgroundColor: bg }]}>
        <Text style={styles.statusText}>{status}</Text>
      </View>
    );
  };

  const ActionButton = ({ label, onPress, color }) => (
    <TouchableOpacity style={[styles.actionBtn, { backgroundColor: color }]} onPress={onPress}>
      <Text style={styles.actionBtnText}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.menuBtn}
        >
          <Ionicons name="menu" size={30} color="#000" />
        </TouchableOpacity>

        <Text style={styles.title}>Survey Tracking (Admin)</Text>

        {surveys.map((s) => (
          <View key={s.Id} style={styles.card}>
            <Text style={styles.cardTitle}>Survey #{s.Id}</Text>
            <Text style={styles.text}>User: {s.Name}</Text>
            <Text style={styles.text}>Type: {s.SurveyType}</Text>
            <Text style={styles.text}>Date: {s.SurveyDate}</Text>

            {getStatusBadge(s.Status || "Pending")}

            <View style={styles.buttonRow}>
              <ActionButton
                label="In Progress"
                color="#3498db"
                onPress={() => updateStatus(s.Id, "In Progress", s.UserID)}
              />
              <ActionButton
                label="Completed"
                color="#2ecc71"
                onPress={() => updateStatus(s.Id, "Completed", s.UserID)}
              />
              <ActionButton
                label="Outgoing"
                color="#9b59b6"
                onPress={() => updateStatus(s.Id, "Outgoing", s.UserID)}
              />
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  menuBtn: { marginBottom: 15 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0a74da",
    marginBottom: 15,
  },
  card: {
    padding: 18,
    borderRadius: 15,
    backgroundColor: "#f9fafb",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 5,
    color: "#333",
  },
  text: { fontSize: 15, marginBottom: 3 },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  statusText: { color: "#fff", fontWeight: "bold" },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  actionBtnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
