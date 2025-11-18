// src/screens/Admin/SurveyTrackingScreen.js
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SurveyTrackingScreen() {
  const [tracking, setTracking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const dummyData = [
      { id: "1", user: "Rahul", progress: "Surveyor Assigned" },
      { id: "2", user: "Meena", progress: "Survey Completed" },
      { id: "3", user: "Jagan", progress: "Report Generating" },
    ];

    setTimeout(() => {
      setTracking(dummyData);
      setLoading(false);
    }, 800);
  }, []);

  if (loading) return <ActivityIndicator size="large" style={{ marginTop: 50 }} />;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Survey Tracking</Text>

      <FlatList
        data={tracking}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.name}>{item.user}</Text>
            <Text>Status: {item.progress}</Text>
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
