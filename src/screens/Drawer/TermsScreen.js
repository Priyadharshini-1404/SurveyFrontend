import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function TermsAndConditions({ navigation }) {
   const handleEmailPress = () => {
        Linking.openURL('mailto:rockfort.md@gmail.com');
      };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Back Button */}
       <TouchableOpacity
               onPress={() => navigation.openDrawer()}
               style={styles.backButton}
             >
               <Ionicons name="arrow-back" size={26} color="#0e0f0fff" />
             </TouchableOpacity>
        <Text style={styles.title}>Terms and Conditions</Text>
        <Text style={styles.date}>Effective Date: 22.10.2025</Text>

        <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.text}>
          By booking or using our services, you agree to be bound by these terms and conditions. Please read them carefully.
        </Text>

        <Text style={styles.sectionTitle}>2. Services Offered</Text>
        <Text style={styles.text}>
          We provide land and building survey services using modern digital instruments. The scope of the work will be discussed and agreed upon prior to booking.
        </Text>

       <Text style={styles.sectionTitle}>3. Advance Payment & Refund Policy</Text>
<Text style={styles.text}>
  An advance payment is mandatory to confirm your survey appointment.
</Text>
<Text style={styles.bullet}>{'\u2022'} Once the advance is paid, it **cannot be refunded** under any circumstances.</Text>
<Text style={styles.bullet}>{'\u2022'} If the survey is canceled by the customer, the advance amount will be forfeited.</Text>
<Text style={styles.bullet}>{'\u2022'} Only in rare cases where Rockfort Engineering cancels the appointment, the customer will be eligible for a full refund or a rescheduled appointment.</Text>
<Text style={styles.bullet}>{'\u2022'} By booking, you acknowledge and agree to this non-refundable policy.</Text>

        <Text style={styles.sectionTitle}>4. Cancellations & Rescheduling</Text>
        <Text style={styles.text}>
          You may request to reschedule at least 24 hours before the appointment. Any changes are subject to availability.
        </Text>

        <Text style={styles.sectionTitle}>5. Liability</Text>
        <Text style={styles.text}>
          We will not be responsible for delays or issues caused by weather, third parties, or situations beyond our control.
        </Text>

        <Text style={styles.sectionTitle}>6. Contact Information</Text>
        <Text style={styles.text}>
          Rockfort Engineering{"\n"}
          📍 No.17, 1st Floor, 2nd Street, Parameshwari Nagar, Nandhivaram, Guduvanchery, Chennai – 603202{"\n"}
         <Text style={styles.link} onPress={handleEmailPress}>
                            rockfort.md@gmail.com
                          </Text>{"\n"}{"\n"}
          ☎ 044-47455939 | 📞 9840275939
        </Text>

        <Text style={styles.disclaimer}>
          Disclaimer: These terms are subject to change at any time. Please review this page periodically.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  }, link: {
    fontSize: 16,
    color: "#0a74da",
    marginTop: 5,
    textDecorationLine: "underline",
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0a74da',
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: '#777',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a74da',
    marginTop: 20,
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 10,
  },
  bullet: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
    marginLeft: 10,
    marginBottom: 5,
  },
  disclaimer: {
    marginTop: 30,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
});
