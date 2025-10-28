import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WalletScreen({ navigation }) {
  const [paymentType, setPaymentType] = useState('');
  const [surveyType, setSurveyType] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const handleSurveySelect = (type) => {
    setSurveyType(type);
    setShowSurveyModal(false);
  };
const handlePaymentSelect = (method) => {
  setPaymentType(method);
  setShowPaymentModal(false);

  if (method === 'Credit / Debit Card') {
    navigation.navigate('CardDetails'); // navigate to card details
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Payment</Text>

      <View style={styles.card}>
        <Text style={styles.label}>User Name:</Text>
        <TextInput style={styles.input} placeholder="Enter your name" />

        <Text style={styles.label}>Survey ID:</Text>
        <TextInput style={styles.input} placeholder="Enter survey ID" />

        <Text style={styles.label}>Amount:</Text>
        <TextInput style={styles.input} placeholder="Enter amount" keyboardType="numeric" />

        {/* 🟢 New Survey Type Dropdown */}
        <Text style={styles.label}>Survey Type:</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowSurveyModal(true)}>
          <Text style={styles.dropdownText}>
            {surveyType || 'Choose Survey Type'}
          </Text>
        </TouchableOpacity>

        <Modal visible={showSurveyModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              { ['Property Survey','Guideline Surveys','Land Survey', 'Building Survey', 'Boundary Survey', 'Topographical Survey','Road and Bridge Surveys','Pipeline Surveys','Airport Surveys','Leveling Surveys','Property Partition','Topo Survey','Contour Surveys','Building Settings out and Grid Line marking','Layout design and Stone Fixing','Layout Survey'].map((type) => (
                <TouchableOpacity key={type} onPress={() => handleSurveySelect(type)}>
                  <Text style={styles.modalItem}>{type}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setShowSurveyModal(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* 🟢 Existing Payment Method Dropdown */}
        <Text style={styles.label}>Select your Payment Method:</Text>
        <TouchableOpacity style={styles.dropdown} onPress={() => setShowPaymentModal(true)}>
          <Text style={styles.dropdownText}>
            {paymentType || 'Choose Payment Method'}
          </Text>
        </TouchableOpacity>

        <Modal visible={showPaymentModal} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {['Credit / Debit Card', 'Digital Wallet', 'Bank Transfer', 'GPay / PhonePe'].map((method) => (
                <TouchableOpacity key={method} onPress={() => handlePaymentSelect(method)}>
                  <Text style={styles.modalItem}>{method}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitText}>Submit Payment</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 26, fontWeight: 'bold', color: '#0a74da', textAlign: 'center', marginVertical: 20 },
  card: { backgroundColor: '#f8f9fa', padding: 20, borderRadius: 10 },
  label: { fontSize: 16, marginTop: 10 },
  input: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 10, marginTop: 5 },
  dropdown: { borderWidth: 1, borderColor: '#ddd', borderRadius: 8, padding: 12, marginTop: 5 },
  dropdownText: { fontSize: 16, color: '#333' },
  submitButton: { backgroundColor: '#0a74da', padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  submitText: { color: '#fff', fontWeight: 'bold' },
  modalOverlay: { flex: 1, justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { margin: 30, backgroundColor: '#fff', borderRadius: 10, padding: 20 },
  modalItem: { padding: 10, fontSize: 16, borderBottomWidth: 1, borderBottomColor: '#eee' },
  closeButton: { marginTop: 10, textAlign: 'center', color: '#0a74da', fontWeight: 'bold' },
});