//ScheduleScreen.js

import React, { useState, useEffect, useCallback } from "react";
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
import { useRoute, useFocusEffect, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

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

  // ✅ When returning from MapPickerScreen
  useFocusEffect(
    useCallback(() => {
      if (route.params?.selectedLocation) {
        setLocation(route.params.selectedLocation);
      }
    }, [route.params])
  );

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      setDate(formattedDate);
    }
  };

  // ✅ Confirm appointment details
  const handleConfirm = () => {
    if (!userName || !contactNumber || !surveyType || !date || !availableTime || !location) {
      Alert.alert("Missing Fields", "Please fill all required fields.");
      return;
    }

    // ✅ Navigate to SurveyBookingScreen with collected info
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
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Scheduled Survey</Text>

        {/* ✅ User Name */}
        <Text style={styles.label}>Full Name:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          value={userName}
          onChangeText={setUserName}
        />

        {/* ✅ Contact Number */}
        <Text style={styles.label}>Contact Number:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
          maxLength={10}
          value={contactNumber}
          onChangeText={setContactNumber}
        />

        {/* Survey Type */}
        <Text style={styles.label}>Select Survey Type:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowSurveyModal(true)}
        >
          <Text style={styles.dropdownText}>
            {surveyType || "Choose Survey Type"}
          </Text>
        </TouchableOpacity>

        {/* Survey Type Modal */}
        <Modal visible={showSurveyModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
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
              <TouchableOpacity onPress={() => setShowSurveyModal(false)}>
                <Text style={[styles.modalItem, { color: "red" }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Date Picker */}
        <Text style={styles.label}>Select Date:</Text>
        <TouchableOpacity
          style={styles.input}
          onPress={() => setShowDatePicker(true)}
        >
          <Text style={{ fontSize: 16, color: date ? "#000" : "#999" }}>
            {date || "DD/MM/YYYY"}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date ? new Date(date) : new Date()}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {/* Time Slot */}
        <Text style={styles.label}>Time:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowTimeModal(true)}
        >
          <Text style={styles.dropdownText}>
            {availableTime || "Select Time Slot"}
          </Text>
        </TouchableOpacity>

        {/* Time Modal */}
        <Modal visible={showTimeModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
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
                <Text style={[styles.modalItem, { color: "red" }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* ✅ Location Picker */}
        <Text style={styles.label}>Site Location:</Text>
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
              navigation.navigate("MapPickerScreen", { from: "ScheduleScreen" })
            }
          >
            <Ionicons name="location-sharp" size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Notes */}
        <Text style={styles.label}>Additional Notes:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter any additional notes"
          value={notes}
          onChangeText={setNotes}
          multiline
        />

        {/* Confirm Button */}
        <TouchableOpacity style={styles.confirmButton} onPress={handleConfirm}>
          <Text style={styles.confirmText}>Please Select Staff</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationIcon: { marginLeft: 10 },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
  },
  dropdownText: { fontSize: 16, color: "#333" },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    margin: 30,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
  },
  modalItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  confirmButton: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  confirmText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
