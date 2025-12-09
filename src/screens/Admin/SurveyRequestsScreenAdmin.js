import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Button, Alert, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const API_URL = "http://192.168.1.10:5000/api/surveys";

export default function SurveyRequestsScreen() {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const res = await fetch(`${API_URL}/all`);
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      console.log("Error fetching:", err);
    }
  };

  const handleAction = async (surveyId, action) => {
    if (!surveyId) return Alert.alert("Error", "Survey ID missing");
    try {
      const res = await fetch(`${API_URL}/update-status/${surveyId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Status: action === "accept" ? "Approved" : "Rejected",
        }),
      });
      const result = await res.json();
      if (!res.ok) return Alert.alert("Error", result.message || "Failed");
      Alert.alert("Success", `Survey ${action}ed`);
      fetchRequests();
    } catch (err) {
      console.log(err);
      Alert.alert("Error", "Something went wrong");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Survey Requests</Text>
      <FlatList
        data={requests}
        keyExtractor={(item) => String(item.Id)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>User: {item.Name}</Text>
            <Text>Survey: {item.SurveyType}</Text>
            <Text>Date: {item.SurveyDate}</Text>
            <View style={{ flexDirection: "row", marginTop: 10 }}>
              <Button
                title="Accept"
                color="green"
                onPress={() => handleAction(item.Id, "accept")}
              />
              <View style={{ width: 10 }} />
              <Button
                title="Reject"
                color="red"
                onPress={() => handleAction(item.Id, "reject")}
              />
            </View>
          </View>
        )}
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
