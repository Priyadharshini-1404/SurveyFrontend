import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from "@expo/vector-icons";
import { Linking } from 'react-native';

export default function PrivacyPolicy({ navigation }) {
  const handleMobilePress = () => {
    Linking.openURL('tel:9840275939');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:rockfort.md@gmail.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={26} color="#0e0f0fff" />
        </TouchableOpacity>

        <Text style={styles.title}>Privacy Policy</Text>
        <Text style={styles.date}>Effective Date: [22.10.2025]</Text>

        <Text style={styles.heading}>1. Information We Collect</Text>
        <Text style={styles.text}>
          We may collect personal details like your name, phone number, email, physical address,
          and technical data such as your IP address, browser type, and usage data.
        </Text>

        <Text style={styles.heading}>2. How We Use Your Information</Text>
        <Text style={styles.text}>
          We use the data to respond to inquiries, manage and schedule surveys, improve our services,
          and comply with regulations.
        </Text>

        <Text style={styles.heading}>3. How We Share Your Information</Text>
        <Text style={styles.text}>
          We do not sell or rent your personal information. It may only be shared with trusted service providers or government authorities when required by law.
        </Text>

        <Text style={styles.heading}>4. Data Security</Text>
        <Text style={styles.text}>
          We take reasonable measures to secure your data, but no method of transmission over the internet is 100% secure.
        </Text>

        <Text style={styles.heading}>5. Your Rights</Text>
        <Text style={styles.text}>
          You have the right to access, correct, or delete your data. To do so, contact us at:
        </Text>

        <View>
          <Text style={styles.link} onPress={handleEmailPress}>
            rockfort.md@gmail.com
          </Text>
          <Text style={styles.link} onPress={handleMobilePress}>
            9840275939
          </Text>
        </View>

        <Text style={styles.heading}>6. Third-Party Links</Text>
        <Text style={styles.text}>
          Our website may contain links to third-party websites. We are not responsible for their content or privacy practices.
        </Text>

        <Text style={styles.heading}>7. Changes to This Policy</Text>
        <Text style={styles.text}>
          This Privacy Policy may be updated occasionally. Please review this page for any changes.
        </Text>

        <Text style={styles.heading}>8. Contact Us</Text>

        <View style={{ marginBottom: 10 }}>
          <Text style={styles.text}>Rockfort Engineering</Text>
          <Text style={styles.text}>
            📍 No.17, 1st Floor, 2nd Street, Parameshwari Nagar,{"\n"}
            Nandhivaram, Guduvanchery, Chennai – 603202
          </Text>

          <View>
            <Text style={styles.link} onPress={handleEmailPress}>
              rockfort.md@gmail.com
            </Text>
            <Text style={styles.link} onPress={handleMobilePress}>
              9840275939
            </Text>
          </View>

          <Text style={styles.text}>☎ 044-47455939</Text>
        </View>

        <Text style={styles.disclaimer}>
          Disclaimer: This is a general policy template. Please consult a legal professional to ensure compliance with applicable laws.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
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
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  link: {
    fontSize: 16,
    color: "#0a74da",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a74da',
    marginTop: 20,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
  },
  disclaimer: {
    marginTop: 30,
    fontSize: 14,
    fontStyle: 'italic',
    color: '#888',
  },
});
