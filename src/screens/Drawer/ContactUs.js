import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ContactUs({ navigation }) {
  const handlePhonePress = () => {
    Linking.openURL('tel:04447455939');
  };

  const handleMobilePress = () => {
    Linking.openURL('tel:9840275939');
  };

  const handleEmailPress = () => {
    Linking.openURL('mailto:rockfort.md@gmail.com');
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Back Button */}
        <TouchableOpacity
          onPress={() => navigation.openDrawer()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={26} color="#000000ff" />
        </TouchableOpacity>

        <Text style={styles.title}>Contact Us</Text>

        <View style={styles.infoBlock}>
          <Text style={styles.label}>Address:</Text>
          <Text style={styles.value}>
            NO.17, 1st Floor, 2nd Street,
            Parameshwari Nagar, Nandhivaram,{"\n"}
            Guduvanchery, Chennai – 603202
          </Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.link} onPress={handleEmailPress}>
            rockfort.md@gmail.com
          </Text>

          <Text style={styles.label}>GST Number:</Text>
          <Text style={styles.value}>33ARGPB1904P1ZY</Text>

          <Text style={styles.label}>Phone:</Text>
          <Text style={styles.link} onPress={handlePhonePress}>
            044-47455939
          </Text>

          <Text style={styles.label}>Mobile:</Text>
          <Text style={styles.link} onPress={handleMobilePress}>
            9840275939
          </Text>

          <Text style={styles.qrTitle}>Scan QR Code to Reach Us:</Text>
          <Image
            source={require("../../../assets/qr.png")} // Replace with your QR image path
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backText: {
    fontSize: 16,
    color: "#0a74da",
    marginLeft: 8,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#0a74da",
    marginBottom: 20,
  },
  infoBlock: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  link: {
    fontSize: 16,
    color: "#0a74da",
    marginTop: 5,
    textDecorationLine: "underline",
  },
  qrTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 25,
    color: "#333",
  },
  qrImage: {
    width: 200,
    height: 200,
    marginTop: 10,
    alignSelf: "center",
  },
});
