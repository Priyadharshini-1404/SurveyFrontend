import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import WalletScreen from '../Wallet/WalletScreen';
// Survey types
const surveyTypes = [
  "Property Survey", "Guideline Survey", "Land Survey", "Building Survey",
  "Boundary Survey", "Topographical Survey", "Road and Bridge Survey",
  "Pipeline Survey", "Airport Survey", "Leveling Survey", "Property Partition",
  "Contour Survey", "Layout Survey"
];

// Example time slots
const timeSlots = [
  "09:00 AM", "10:30 AM", "12:00 PM",
  "02:00 PM", "03:30 PM", "05:00 PM"
];

const AppointmentScreen = ({ navigation }) => {
  const [surveyType, setSurveyType] = useState('');
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableTime, setAvailableTime] = useState('');
  const [showTimeModal, setShowTimeModal] = useState(false);
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  // ✅ Date change handler
  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      setDate(formattedDate);
    }
  };

  // ✅ Confirm appointment logic
  const handleConfirm = () => {
    if (!surveyType || !date || !availableTime || !location) {
      Alert.alert('Missing Fields', 'Please fill all required fields before confirming.');
      return;
    }

 Alert.alert(
  "Advance Payment Required",
  "You must pay an advance amount to confirm your survey appointment, Suppose after the Appoinment you cancel this survey the advance amount cant be refunded",
  [
    {
      text: "Cancel",
    //   Tab name is "Home"
      style: "cancel",
    },
    {
      text: "OK",
      onPress: () => navigation.navigate("Wallet"), // Tab name is "Wallet"
    },
  ],
  { cancelable: false }
);

  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Scheduled Survey</Text>

        {/* Survey Type Dropdown */}
        <Text style={styles.label}>Select Survey Type:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowSurveyModal(true)}
        >
          <Text style={styles.dropdownText}>
            {surveyType || 'Choose Survey Type'}
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
                <Text
                  style={[styles.modalItem, { color: 'red', textAlign: 'center' }]}
                >
                  Close
                </Text>
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
          <Text style={{ fontSize: 16, color: date ? '#000' : '#999' }}>
            {date || 'DD/MM/YYYY'}
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
        <Text style={styles.label}>Available Time Slot:</Text>
        <TouchableOpacity
          style={styles.dropdown}
          onPress={() => setShowTimeModal(true)}
        >
          <Text style={styles.dropdownText}>
            {availableTime || 'Select Time Slot'}
          </Text>
        </TouchableOpacity>

        {/* Time Slot Modal */}
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
                <Text
                  style={[styles.modalItem, { color: 'red', textAlign: 'center' }]}
                >
                  Close
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Location */}
        <Text style={styles.label}>Site Location:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your location"
          value={location}
          onChangeText={setLocation}
        />

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
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmText}>Confirm Appointment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5 },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 8,
    padding: 12, fontSize: 16, marginBottom: 10,
  },
  dropdown: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12 },
  dropdownText: { fontSize: 16, color: '#333' },
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { margin: 30, backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  modalItem: { padding: 10, fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  confirmButton: {
    backgroundColor: '#1E90FF',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  confirmText: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});
