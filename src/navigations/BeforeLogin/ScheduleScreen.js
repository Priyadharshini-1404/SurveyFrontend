// ScheduleScreen.js (Premium UI)

import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";

const surveyTypes = [
  "Property Survey",
  "Guideline Survey",
  "Land Survey",
  "Building Survey",
  "Boundary Survey",
  "Topographical Survey",
  "Road and Bridge Survey",
  "Pipeline Survey",
  "Airport Survey",
  "Leveling Survey",
  "Property Partition",
  "Contour Survey",
  "Layout Survey",
];

const timeSlots = [
  "09:00 AM",
  "10:30 AM",
  "12:00 PM",
  "02:00 PM",
  "03:30 PM",
  "05:00 PM",
];

export default function AppointmentScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const [userName, setUserName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [surveyType, setSurveyType] = useState("");
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [date, setDate] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableTime, setAvailableTime] = useState("");
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  // Get selected location from Map Screen
  useFocusEffect(
    useCallback(() => {
      if (route.params?.selectedLocation) {
        setLocation(route.params.selectedLocation);
      }
    }, [route.params])
  );

  const handleConfirm = () => {
    if (!userName || !contactNumber || !surveyType || !date || !availableTime || !location) {
      Alert.alert("Missing Fields", "Please fill all required fields.");
      return;
    }

    navigation.navigate("SurveyBookingScreen", {
      userName,
      contactNumber,
      surveyType,
      date,
      time: availableTime,
      location,
      notes,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFE" }}>
      <ScrollView contentContainerStyle={styles.container}>

        {/* Header */}
        <Text style={styles.headerTitle}>Schedule a Survey</Text>

        {/* ----------- User Info Card ----------- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Your Details</Text>

          {/* Full Name */}
          <View style={styles.inputRow}>
            <Ionicons name="person-circle-outline" size={22} color="#1E90FF" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              value={userName}
              onChangeText={setUserName}
            />
          </View>

          {/* Phone Number */}
          <View style={styles.inputRow}>
            <Ionicons name="call-outline" size={22} color="#1E90FF" />
            <TextInput
              style={styles.input}
              placeholder="Contact Number"
              keyboardType="phone-pad"
              maxLength={10}
              value={contactNumber}
              onChangeText={setContactNumber}
            />
          </View>
        </View>

        {/* ----------- Survey Info Card ----------- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Survey Information</Text>

          {/* Survey Type */}
          <TouchableOpacity
            style={styles.inputRow}
            onPress={() => setShowSurveyModal(true)}
          >
            <Ionicons name="briefcase-outline" size={22} color="#1E90FF" />
            <Text style={[styles.input, { paddingTop: 3 }]}>
              {surveyType || "Select Survey Type"}
            </Text>
          </TouchableOpacity>

          {/* Date */}
          <TouchableOpacity
            style={styles.inputRow}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons name="calendar-outline" size={22} color="#1E90FF" />
            <Text style={[styles.input, { paddingTop: 3 }]}>
              {date || "Select Date"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShowDatePicker(false);
                if (selectedDate) {
                  setDate(selectedDate.toISOString().split("T")[0]);
                }
              }}
            />
          )}

          {/* Time */}
          <TouchableOpacity
            style={styles.inputRow}
            onPress={() => setShowTimeModal(true)}
          >
            <Ionicons name="time-outline" size={22} color="#1E90FF" />
            <Text style={[styles.input, { paddingTop: 3 }]}>
              {availableTime || "Select Time Slot"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* ----------- Location Card ----------- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Site Location</Text>

          <View style={styles.inputRow}>
            <Ionicons name="location-outline" size={22} color="#1E90FF" />
            <TextInput
              style={styles.input}
              placeholder="Select Your Location"
              value={location}
              editable={true}
            />
            <TouchableOpacity
              onPress={() => navigation.navigate("MapPickerScreen")}
            >
              <Ionicons name="map-outline" size={26} color="#1E90FF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* ----------- Notes Card ----------- */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Additional Notes</Text>
          <TextInput
            style={[styles.textArea]}
            multiline
            placeholder="Add any additional information..."
            value={notes}
            onChangeText={setNotes}
          />
        </View>

      </ScrollView>

      {/* Sticky Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.bottomButton} onPress={handleConfirm}>
          <Text style={styles.bottomButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>

      {/* Survey Modal */}
      <Modal visible={showSurveyModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Survey Type</Text>
            <ScrollView>
              {surveyTypes.map((type) => (
                <TouchableOpacity
                  key={type}
                  onPress={() => {
                    setSurveyType(type);
                    setShowSurveyModal(false);
                  }}
                >
                  <Text style={styles.modalItem}>{type}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <TouchableOpacity onPress={() => setShowSurveyModal(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Time Slot Modal */}
      <Modal visible={showTimeModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Time Slot</Text>
            {timeSlots.map((slot) => (
              <TouchableOpacity
                key={slot}
                onPress={() => {
                  setAvailableTime(slot);
                  setShowTimeModal(false);
                }}
              >
                <Text style={styles.modalItem}>{slot}</Text>
              </TouchableOpacity>
            ))}
            <TouchableOpacity onPress={() => setShowTimeModal(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

// ------------------- Styles -------------------
const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingBottom: 120,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "700",
    marginVertical: 15,
    color: "#1E293B",
  },

  card: {
    backgroundColor: "#fff",
    padding: 18,
    borderRadius: 14,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 12,
    color: "#334155",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    fontSize: 16,
    color: "#000",
    marginLeft: 10,
  },

  textArea: {
    backgroundColor: "#F1F5F9",
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
    height: 100,
  },

  bottomContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderTopWidth: 1,
    borderColor: "#E2E8F0",
  },

  bottomButton: {
    backgroundColor: "#1E90FF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  bottomButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },

  modalContent: {
    backgroundColor: "#fff",
    margin: 30,
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  modalItem: {
    paddingVertical: 12,
    fontSize: 16,
    borderBottomColor: "#EEE",
    borderBottomWidth: 1,
  },

  closeButton: {
    textAlign: "center",
    padding: 12,
    color: "red",
    fontSize: 16,
  },
});
