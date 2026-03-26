import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function TermsAndConditions({ navigation }) {
  const handleEmailPress = () => {
    Linking.openURL("mailto:rockfort.md@gmail.com");
  };

  return (
    <SafeAreaView style={styles.container}>

      {/* Drawer Button */}
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={30} color="#1A73E8" />
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.header}>Terms & Conditions</Text>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 1 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Acceptance of Terms</Text>
          <Text style={styles.text}>
            By booking or using our services, you agree to be bound by these terms and conditions.
            Please read them carefully.
          </Text>
        </View>

        {/* 2 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. Services Offered</Text>
          <Text style={styles.text}>
            We provide land and building survey services using modern digital instruments. 
            The scope of work will be discussed and agreed upon before booking.
          </Text>
        </View>

        {/* 3 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. Advance Payment & Refund Policy</Text>

          <Text style={styles.bullet}>• Advance payment is required to confirm your booking.</Text>
          <Text style={styles.bullet}>• Once paid, the advance is **non-refundable**.</Text>
          <Text style={styles.bullet}>• If you cancel, the advance is forfeited.</Text>
          <Text style={styles.bullet}>
            • If Rockfort Engineering cancels, refund or free rescheduling will be provided.
          </Text>
        </View>

        {/* 4 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>4. Cancellations & Rescheduling</Text>
          <Text style={styles.text}>
            You may request rescheduling at least 24 hours before the appointment. 
            All changes are subject to availability.
          </Text>
        </View>

        {/* 5 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>5. Liability</Text>
          <Text style={styles.text}>
            We are not responsible for delays due to weather, third-party involvement, 
            or any situation beyond our control.
          </Text>
        </View>

        {/* 6 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>6. Contact Information</Text>

          <Text style={styles.text}>
            Rockfort Engineering{"\n"}
            No.17, 1st Floor, 2nd Street, Parameshwari Nagar, Nandhivaram,
            Guduvanchery, Chennai – 603202{"\n\n"}
            ✉{" "}
            <Text style={styles.link} onPress={handleEmailPress}>
              rockfort.md@gmail.com
            </Text>{"\n"}
            ☎ 044-47455939 | 📞 9840275939
          </Text>
        </View>

        <Text style={styles.disclaimer}>
          Disclaimer: These terms may be updated periodically. Please review them regularly.
        </Text>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F9FF", padding: 20 },

  menuButton: { marginBottom: 10 },

  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1A73E8",
    marginBottom: 15,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1A73E8",
    marginBottom: 10,
  },

  text: {
    fontSize: 16,
    color: "#333",
    lineHeight: 24,
  },

  bullet: {
    fontSize: 16,
    color: "#555",
    marginTop: 6,
    lineHeight: 24,
  },

  link: {
    color: "#1A73E8",
    textDecorationLine: "underline",
    fontWeight: "600",
  },

  disclaimer: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 13,
    color: "#999",
  },
});
