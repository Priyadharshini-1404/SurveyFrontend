// src/screens/RequestSurvey.js
import React, { useState, useCallback } from "react";
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
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation, useRoute } from "@react-navigation/native";

export default function RequestSurvey() {
  const navigation = useNavigation();
  const route = useRoute();

  const [name, setName] = useState("");
  const [surveyType, setSurveyType] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [surveyDate, setSurveyDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  // ✅ Survey type options
  const surveyOptions = [
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

  // ✅ Keep location when coming back from MapPicker
  useFocusEffect(
    useCallback(() => {
      if (route.params?.selectedLocation) {
        setLocation(route.params.selectedLocation);
      }
    }, [route.params])
  );

  // ✅ Handle date change
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setSurveyDate(formattedDate);
    }
  };

  // ✅ Handle form submission (saves to backend)
  const handleSubmit = async () => {
    if (!name || !surveyType || !location || !contact || !surveyDate) {
      Alert.alert("Error", "Please fill all fields before submitting.");
      return;
    }

    try {
      const response = await fetch("http://192.168.1.10:5000/api/surveys", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          surveyType,
          location,
          contact,
          surveyDate,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Survey request submitted successfully!", [
          { text: "OK", onPress: () => navigation.navigate("Home") },
        ]);

        // Clear form fields
        setName("");
        setSurveyType("");
        setLocation("");
        setContact("");
        setSurveyDate("");
      } else {
        Alert.alert("Error", data.message || "Failed to submit survey.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      Alert.alert("Network Error", "Could not connect to the server.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Request a New Survey</Text>

      {/* Name Input */}
      <TextInput
        style={styles.input}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />

      {/* Survey Type Dropdown */}
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {surveyType || "Select Survey Type"}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#555" />
      </TouchableOpacity>

      {/* Modal Dropdown */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
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

      {/* Location Selector */}
      <View style={styles.locationContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Select Location"
          value={location}
          editable={true}
        />
        <TouchableOpacity
          style={styles.locationIcon}
          onPress={() =>
            navigation.navigate("MapPickerScreen", { from: "RequestSurvey" })
          }
        >
          <Ionicons name="location-sharp" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      {/* Date Picker */}
      <TouchableOpacity
        style={styles.input}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={{ fontSize: 16, color: surveyDate ? "#000" : "#999" }}>
          {surveyDate || "Select Survey Date"}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={surveyDate ? new Date(surveyDate) : new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}

      {/* Contact Input */}
      <TextInput
        style={styles.input}
        placeholder="Contact Number"
        keyboardType="phone-pad"
        value={contact}
        onChangeText={setContact}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit Request</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flexGrow: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  dropdownButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dropdownText: {
    fontSize: 16,
    color: "#333",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: {
    marginLeft: 10,
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    width: "85%",
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalItemText: {
    fontSize: 16,
    textAlign: "center",
  },
  modalCloseButton: {
    marginTop: 10,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    padding: 10,
  },
  modalCloseText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "600",
  },
});
