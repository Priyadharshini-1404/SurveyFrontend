import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>About, Settings & Account</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>About Us:</Text>
        <Text style={styles.text}>
          Rockfort Surveys provides professional survey services with accuracy and trust.
        </Text>

        <Text style={styles.sectionTitle}>Feedback & Ratings:</Text>
        <Text style={styles.text}>We value your feedback to improve our services.</Text>

        <Text style={styles.sectionTitle}>Customer Support:</Text>
        <Text style={styles.text}>Contact us at support@rockfortsurveys.com</Text>

        <TouchableOpacity style={styles.logoutButton} onPress={() => navigation.navigate("Login")
}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#0a74da', textAlign: 'center', marginBottom: 20 },
  card: { backgroundColor: '#f8f9fa', padding: 20, borderRadius: 10 },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginTop: 10 },
  text: { fontSize: 16, color: '#555', marginTop: 5 },
  logoutButton: { backgroundColor: '#dc3545', padding: 14, borderRadius: 8, marginTop: 20, alignItems: 'center' },
  logoutText: { color: '#fff', fontWeight: 'bold' },
});
