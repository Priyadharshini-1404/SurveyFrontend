import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  Modal,
  FlatList,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function RequestSurvey() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [surveyType, setSurveyType] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [surveyDate, setSurveyDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const surveyOptions = [
    "Property Survey", "Guideline Survey", "Land Survey", "Building Survey",
    "Boundary Survey", "Topographical Survey", "Road and Bridge Surveys",
    "Pipeline Surveys", "Airport Surveys", "Leveling Surveys",
    "Property Partition", "Contour Surveys",
    "Building Settings out and Grid Line marking",
    "Layout design and Stone Fixing", "Layout Survey",
  ];

  useFocusEffect(
    useCallback(() => {
      if (route.params?.selectedLocation) {
        setLocation(route.params.selectedLocation);
      }
    }, [route.params])
  );

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formatted = selectedDate.toISOString().split("T")[0];
      setSurveyDate(formatted);
    }
  };

  const handleSubmit = async () => {
    if (!name || !surveyType || !location || !contact || !surveyDate) {
      Alert.alert("Error", "Please fill all fields before submitting.");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/surveys`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, surveyType, location, contact, surveyDate }),
      });

      const data = await res.json();

      if (!res.ok) {
        Alert.alert("Error", data.message || "Survey submit failed");
        return;
      }

      Alert.alert("Success", "Survey request submitted!", [
        { text: "OK", onPress: () => navigation.navigate("HomeScreen") },
      ]);
    } catch (err) {
      Alert.alert("Network", "Server not reachable.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f5f7fb" }}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Title */}
        <Text style={styles.mainHeader}>Request a Survey</Text>

        {/* Card Wrapper */}
        <View style={styles.card}>

          {/* Name */}
          <Text style={styles.label}>Your Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            value={name}
            onChangeText={setName}
          />

          {/* Survey Type */}
          <Text style={styles.label}>Survey Type</Text>
          <TouchableOpacity
            style={styles.dropdownButton}
            onPress={() => setModalVisible(true)}
          >
            <Text style={[styles.dropdownText, { color: surveyType ? "#000" : "#888" }]}>
              {surveyType || "Select Survey Type"}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#777" />
          </TouchableOpacity>

          {/* Location */}
          <Text style={styles.label}>Location</Text>
          <View style={styles.locationContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Choose a location"
              value={location}
              editable={false}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("MapPickerScreen", {
                  from: "RequestSurvey",
                  formState: { name, surveyType, contact, surveyDate },
                })
              }
            >
              <Ionicons name="location-sharp" size={26} color="#007AFF" />
            </TouchableOpacity>
          </View>

          {/* Survey Date */}
          <Text style={styles.label}>Survey Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={{ fontSize: 16, color: surveyDate ? "#000" : "#888" }}>
              {surveyDate || "Select date"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={surveyDate ? new Date(surveyDate) : new Date()}
              mode="date"
              display="calendar"
              onChange={handleDateChange}
            />
          )}

          {/* Contact */}
          <Text style={styles.label}>Contact Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter mobile number"
            keyboardType="phone-pad"
            value={contact}
            onChangeText={setContact}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit Request</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>

      {/* Survey Type Modal */}
      <Modal animationType="slide" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Choose Survey Type</Text>

            <FlatList
              data={surveyOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.modalItem}
                  onPress={() => {
                    setSurveyType(item);
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.modalItemText}>{item}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 22, paddingBottom: 90 },
  mainHeader: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0a67d0",
    textAlign: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginTop: 12,
    marginBottom: 6,
    color: "#222",
  },
  input: {
    backgroundColor: "#f1f4f9",
    padding: 14,
    borderRadius: 10,
    fontSize: 16,
  },
  dropdownButton: {
    backgroundColor: "#f1f4f9",
    padding: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: { fontSize: 16 },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  button: {
    backgroundColor: "#0a67d0",
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 25,
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    maxHeight: "70%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalItem: { paddingVertical: 12 },
  modalItemText: { fontSize: 16, textAlign: "center" },
  modalCloseButton: {
    backgroundColor: "#ff3b30",
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
  },
  modalCloseText: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "600",
  },
});
