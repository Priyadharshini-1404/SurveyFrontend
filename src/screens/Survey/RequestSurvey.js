// src/screens/SurveyRequest.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Modal, StyleSheet, ScrollView, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';

const surveyTypes = [
  "Property Survey","Guideline Surveys","Land Survey","Building Survey",
  "Boundary Survey","Topographical Survey","Road and Bridge Surveys",
  "Pipeline Surveys","Airport Surveys","Leveling Surveys","Property Partition",
  "Topo Survey","Contour Surveys","Building Settings out and Grid Line marking",
  "Layout design and Stone Fixing","Layout Survey"
];

const RequestSurvey = () => {
  const [surveyType, setSurveyType] = useState('');
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [location, setLocation] = useState('');
  const [surveyDate, setSurveyDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [additionalInfo, setAdditionalInfo] = useState('');

  const handleSurveySelect = (type) => {
    setSurveyType(type);
    setShowSurveyModal(false);
  };

  const handleSubmit = () => {
    if (!surveyType || !location || !surveyDate) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    const surveyData = { surveyType, location, surveyDate, additionalInfo };
    console.log('Survey Submitted:', surveyData);
    Alert.alert('Success', 'Survey request submitted!');

    // Clear the form
    setSurveyType('');
    setLocation('');
    setSurveyDate('');
    setAdditionalInfo('');
  };

  const handleCancel = () => {
    setSurveyType('');
    setLocation('');
    setSurveyDate('');
    setAdditionalInfo('');
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === 'ios'); // keep open for iOS
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split('T')[0]; // YYYY-MM-DD
      setSurveyDate(formattedDate);
    }
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Request a Survey</Text>

        <Text style={styles.label}>Survey Type:</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowSurveyModal(true)}>
          <Text style={styles.dropdownText}>
            {surveyType || 'Choose Survey Type'}
          </Text>
        </TouchableOpacity>

        {/* Survey Type Modal */}
        <Modal visible={showSurveyModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {surveyTypes.map((type) => (
                <TouchableOpacity key={type} onPress={() => handleSurveySelect(type)}>
                  <Text style={styles.modalItem}>{type}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setShowSurveyModal(false)}>
                <Text style={[styles.modalItem, { color: 'red', textAlign: 'center' }]}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <Text style={styles.label}>Location:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter location"
          value={location}
          onChangeText={setLocation}
        />

        <Text style={styles.label}>Survey Date:</Text>
        <TouchableOpacity style={styles.input} onPress={() => setShowDatePicker(true)}>
          <Text style={{ fontSize: 16, color: surveyDate ? '#000' : '#999' }}>
            {surveyDate || 'Select Survey Date'}
          </Text>
        </TouchableOpacity>

      {showDatePicker && (
  <DateTimePicker
    value={surveyDate ? new Date(surveyDate) : new Date()}
    mode="date"
    display="default"
    onChange={onChangeDate}
  />
)}


        <Text style={styles.label}>Additional Info:</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter additional info"
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
          multiline
        />

        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
          <View style={{ height: 10 }} />
          <Button title="Cancel" onPress={handleCancel} color="#f44336" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flexGrow: 1, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' },
  label: { fontSize: 16, marginTop: 10, marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 12, justifyContent: 'center' },
  buttonContainer: { marginTop: 20 },
  dropdown: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginTop: 5 },
  dropdownText: { fontSize: 16, color: '#333' },
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { margin: 30, backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  modalItem: { padding: 10, fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
});

export default RequestSurvey;
