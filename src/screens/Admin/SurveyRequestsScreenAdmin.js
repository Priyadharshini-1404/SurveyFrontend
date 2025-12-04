import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";
import { sendSurveyResponseNotification } from "../../services/notificationService";

const API_URL = "http://192.168.1.10:5000/api/surveys";

export default function SurveyRequestsScreen() {
  const [requests, setRequests] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await fetch(API_URL);
        const data = await res.json();

        console.log("Survey Requests Response:", data); // 👈 debug

        setRequests(data);
      } catch (err) {
        console.log("Error fetching:", err);
      }
    };
    fetchRequests();
  }, []);

const handleAction = async (surveyId, userId, action) => {
  if (!surveyId) {
    Alert.alert("Error", "Survey ID missing");
    return;
  }

  if (!userId) {
    Alert.alert("Error", "User ID missing. The survey request was submitted without a UserId.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/respond`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        surveyId,
        userId,
        status: action === "accept" ? "Approved" : "Rejected",
      }),
    });

    const result = await res.json();
    console.log("Respond survey result:", result);

    if (!res.ok) {
      Alert.alert("Error", result.message || "Failed to update survey");
      return;
    }

    Alert.alert("Success", `Survey ${action}ed successfully`);
  } catch (error) {
    console.log("Error responding:", error);
    Alert.alert("Error", "Something went wrong");
  }
};




  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Survey Requests</Text>

      <FlatList
        data={requests}
keyExtractor={(item) => item.Id.toString()}
        renderItem={({ item }) => {
const id = item.Id;

          return (
            <View style={styles.card}>
              <Text>User: {item.Name}</Text>
              <Text>Survey: {item.SurveyType}</Text>
              <Text>Date: {item.SurveyDate}</Text>

              <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Button
  title="Accept"
  color="green"
  onPress={() => handleAction(item.Id, item.UserId, "accept")}
/>

<View style={{ width: 10 }} />

<Button
  title="Reject"
  color="red"
  onPress={() => handleAction(item.Id, item.UserId, "reject")}
/>

              </View>
            </View>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 15 },
  card: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
  },
});
