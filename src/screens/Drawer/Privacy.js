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

export default function PrivacyPolicy({ navigation }) {
  const handleMobilePress = () => {
    Linking.openURL("tel:9840275939");
  };

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

      <Text style={styles.header}>Privacy Policy</Text>
      <Text style={styles.date}>Effective Date: 22.10.2025</Text>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Section 1 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>1. Information We Collect</Text>
          <Text style={styles.text}>
            We may collect personal details such as your name, phone number,
            email, physical address, and technical data like IP address, browser
            type, and usage data.
          </Text>
        </View>

        {/* Section 2 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. How We Use Your Information</Text>
          <Text style={styles.text}>
            We use the collected data to respond to inquiries, schedule surveys,
            improve our services, and comply with regulations.
          </Text>
        </View>

        {/* Section 3 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. How We Share Your Information</Text>
          <Text style={styles.text}>
            We do not sell or rent your personal information. Data may be shared
            only with trusted service providers or authorities when required by law.
          </Text>
        </View>

        {/* Section 4 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>4. Data Security</Text>
          <Text style={styles.text}>
            We use reasonable measures to secure your data, but no internet
            transmission is fully secure.
          </Text>
        </View>

        {/* Section 5 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>5. Your Rights</Text>
          <Text style={styles.text}>
            You may request access, correction, or deletion of your personal data by
            contacting:
          </Text>

          <Text style={styles.link} onPress={handleEmailPress}>
            rockfort.md@gmail.com
          </Text>
          <Text style={styles.link} onPress={handleMobilePress}>
            9840275939
          </Text>
        </View>

        {/* Section 6 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>6. Third-Party Links</Text>
          <Text style={styles.text}>
            Our website or app may include links to third-party sites. We are not
            responsible for their privacy practices.
          </Text>
        </View>

        {/* Section 7 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>7. Changes to This Policy</Text>
          <Text style={styles.text}>
            We may update this Privacy Policy periodically. Please review this page
            regularly for updates.
          </Text>
        </View>

        {/* Section 8 */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>8. Contact Us</Text>
          <Text style={styles.text}>
            Rockfort Engineering{"\n"}
            📍 No.17, 1st Floor, 2nd Street, Parameshwari Nagar, Nandhivaram,
            Guduvanchery, Chennai – 603202{"\n\n"}
          </Text>

          <Text style={styles.link} onPress={handleEmailPress}>
            rockfort.md@gmail.com
          </Text>
          <Text style={styles.link} onPress={handleMobilePress}>
            9840275939
          </Text>

          <Text style={[styles.text, { marginTop: 5 }]}>☎ 044-47455939</Text>
        </View>

        <Text style={styles.disclaimer}>
          Disclaimer: This policy is for general information. Consult a legal expert
          for compliance with applicable laws.
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
    marginBottom: 5,
  },

  date: {
    fontSize: 14,
    color: "#777",
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

  link: {
    fontSize: 16,
    color: "#1A73E8",
    textDecorationLine: "underline",
    marginTop: 8,
  },

  disclaimer: {
    textAlign: "center",
    marginTop: 25,
    fontSize: 13,
    color: "#999",
    fontStyle: "italic",
  },
});
