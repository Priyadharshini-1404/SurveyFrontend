// RequestSurvey.js
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

import { sendNotification } from "../../services/notificationService"; 
import { socket } from "../../services/socket"; 
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
  // Replace with logged-in user ID
const userId = user?.id;     // Logged in user
const adminId = 1;  

  // Register socket
useEffect(() => {
  if (userId) {
    socket.emit("register", userId);
  }
}, [userId]);

  // Survey dropdown list
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

  // Receive location from MapPickerScreen
useFocusEffect(
  useCallback(() => {
    if (route.params?.selectedLocation) {
      setLocation(route.params.selectedLocation);
    }

    if (route.params?.formState) {
      setName(route.params.formState.name);
      setSurveyType(route.params.formState.surveyType);
      setContact(route.params.formState.contact);
      setSurveyDate(route.params.formState.surveyDate);
    }
  }, [route.params])
);


  // Date picker
  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setSurveyDate(formattedDate);
    }
  };

  // Submit handler
const handleSubmit = async () => {
  if (!name || !surveyType || !location || !contact || !surveyDate) {
    Alert.alert("Error", "Please fill all fields before submitting.");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/surveys`, {
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

    const data = await res.json();

    if (!res.ok) {
      Alert.alert("Error", data.message || "Survey submit failed");
      return;
    }

    const message = `User ${name} requested a ${surveyType} survey`;

    // ⬇⬇ FETCH ALL ADMINS
    const admins = await getAllAdmins(); // [{id:1}, {id:5}, ...]

    for (const admin of admins) {
      // Save to DB
      await sendNotificationToDB(userId, admin.id, message, "survey");

      // Real-time push
      socket.emit("sendNotification", {
        receiverId: admin.id,
        message,
        type: "survey",
      });
    }

    Alert.alert("Success", "Survey request submitted!", [
      { text: "OK", onPress: () => navigation.navigate("HomeScreen") },
    ]);

    // Clear fields
    setName("");
    setSurveyType("");
    setLocation("");
    setContact("");
    setSurveyDate("");

  } catch (err) {
    console.log("Submit error:", err);
    Alert.alert("Network Error", "Server not reachable.");
  }
};


  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.header}>Request a New Survey</Text>

        {/* Name */}
        <TextInput
          style={styles.input}
          placeholder="Your Name"
          value={name}
          onChangeText={setName}
        />

        {/* Survey Type */}
        <TouchableOpacity
          style={styles.dropdownButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.dropdownText}>
            {surveyType || "Select Survey Type"}
          </Text>
          <Ionicons name="chevron-down" size={20} color="#555" />
        </TouchableOpacity>

        {/* Dropdown Modal */}
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

        {/* Location */}
        <View style={styles.locationContainer}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Select Location"
            value={location}
            editable={false}
          />
        <TouchableOpacity
  style={styles.locationIcon}
  onPress={() =>
    navigation.navigate("MapPickerScreen", {
      from: "RequestSurvey",
      formState: {
        name,
        surveyType,
        contact,
        surveyDate
      }
    })
  }
>
  <Ionicons name="location-sharp" size={26} color="#007AFF" />
</TouchableOpacity>

        </View>

        {/* Date */}
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

        {/* Contact */}
        <TextInput
          style={styles.input}
          placeholder="Contact Number"
          keyboardType="phone-pad"
          value={contact}
          onChangeText={setContact}
        />

        {/* Submit */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Submit Request</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

// Styles
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
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: { fontSize: 16, color: "#333" },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: { marginLeft: 10 },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
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
    textAlign: "center",
    marginBottom: 10,
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
    padding: 10,
    borderRadius: 8,
  },
  modalCloseText: {
    color: "#fff",
    fontWeight: "600",
    textAlign: "center",
  },
});
