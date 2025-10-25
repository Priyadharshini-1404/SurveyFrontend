import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function SurveyTracking({ navigation }) {
  const surveys = [
    { id: "123", type: "Land", progress: 0.5, status: "In Progress" },
    { id: "124", type: "Building", progress: 1.0, status: "Completed" },
    { id: "125", type: "Pipeline", progress: 0.2, status: "Outgoing" },
  ];

  // Custom progress bar (Fabric-safe)
  const ProgressBar = ({ progress }) => (
    <View style={styles.progressBackground}>
      <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
       <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               style={styles.backButton}
             >
               <Ionicons name="arrow-back" size={26} color="#000000ff" />
             </TouchableOpacity>
        <Text style={styles.title}>Survey Tracking</Text>

        <Text style={styles.sectionTitle}>Outgoing Surveys</Text>
        {surveys
          .filter((s) => s.status === "Outgoing")
          .map((survey) => (
            <View key={survey.id} style={styles.card}>
              <Text style={styles.cardTitle}>Survey ID: {survey.id}</Text>
              <Text>Type: {survey.type}</Text>
              <Text>Status: {survey.status}</Text>
              <Text>Progress: {survey.progress * 100}%</Text>
              <ProgressBar progress={survey.progress} />
            </View>
          ))}

        <Text style={styles.sectionTitle}>Completed Surveys</Text>
        {surveys
          .filter((s) => s.status === "Completed")
          .map((survey) => (
            <View key={survey.id} style={styles.card}>
              <Text style={styles.cardTitle}>Survey ID: {survey.id}</Text>
              <Text>Type: {survey.type}</Text>
              <Text>Status: {survey.status}</Text>
              <Text>Progress: {survey.progress * 100}%</Text>
              <ProgressBar progress={survey.progress} />
            </View>
          ))}

        <Text style={styles.sectionTitle}>All Surveys</Text>
        {surveys.map((survey) => (
          <View key={survey.id} style={styles.card}>
            <Text style={styles.cardTitle}>Survey ID: {survey.id}</Text>
            <Text>Type: {survey.type}</Text>
            <Text>Status: {survey.status}</Text>
            <Text>Progress: {survey.progress * 100}%</Text>
            <ProgressBar progress={survey.progress} />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0a74da",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0a74da",
    marginTop: 20,
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  cardTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  progressBackground: {
    height: 10,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
    marginTop: 5,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#0a74da",
    borderRadius: 5,
  },
});
