import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SurveyScreen({ navigation }) {
  const surveys = [
    "Property Survey",
    "Guideline Survey",
    "Land Survey",
    "Building Survey",
    "Boundary Survey",
    "Topographical Survey",
    "Road and Bridge Surveys",
    "Pipeline Surveys",
    "Airport Surveys",
    "Leveling Surveys",
    "Property Partition",
    "Contour Surveys",
    "Building Settings out and Grid Line marking",
    "Layout design and Stone Fixing",
    "Layout Survey",
  ];

  const handleSelect = (survey) => {
    switch (survey) {
      case "Property Survey":
        navigation.navigate("PropertySurvey");
        break;
      case "Guideline Survey":
        navigation.navigate("GuidelineSurvey");
        break;
      case "Land Survey":
        navigation.navigate("LandSurvey");
        break;
      case "Building Survey":
        navigation.navigate("BuildingSurvey");
        break;
      case "Boundary Survey":
        navigation.navigate("BoundarySurvey");
        break;
      case "Topographical Survey":
        navigation.navigate("TopographicalSurvey");
        break;
      case "Road and Bridge Surveys":
        navigation.navigate("RoadSurvey");
        break;
      case "Pipeline Surveys":
        navigation.navigate("PipelineSurvey");
        break;
      case "Airport Surveys":
        navigation.navigate("AirportSurvey");
        break;
      case "Leveling Surveys":
        navigation.navigate("LevelingSurvey");
        break;
      case "Property Partition":
        navigation.navigate("PropertyPartition");
        break;
      case "Contour Surveys":
        navigation.navigate("ContourSurvey");
        break;
      case "Building Settings out and Grid Line marking":
        navigation.navigate("BuildingSettings");
        break;
      case "Layout design and Stone Fixing":
        navigation.navigate("Layoutdesign");
        break;
      case "Layout Survey":
        navigation.navigate("LayoutSurvey");
        break;
      default:
        alert("Page not found!");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Survey Services</Text>

      <FlatList
        data={surveys}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.itemCard}
            onPress={() => handleSelect(item)}
          >
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0a74da",
    textAlign: "center",
    marginVertical: 20,
  },
  itemCard: {
    backgroundColor: "#f1f4f9",
    padding: 15,
    borderRadius: 10,
    marginVertical: 8,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  itemText: {
    fontSize: 18,
    color: "#333",
    fontWeight: "600",
  },
});
