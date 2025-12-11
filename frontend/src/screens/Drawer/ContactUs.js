import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Linking,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function ContactUs({ navigation }) {
  const handlePhonePress = () => Linking.openURL("tel:04447455939");
  const handleMobilePress = () => Linking.openURL("tel:9840275939");
  const handleEmailPress = () => Linking.openURL("mailto:rockfort.md@gmail.com");

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Drawer Button */}
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={30} color="#1A73E8" />
      </TouchableOpacity>

      <Text style={styles.header}>Contact Us</Text>

      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Address Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons name="location-on" size={26} color="#1A73E8" />
            <Text style={styles.cardTitle}>Address</Text>
          </View>
          <Text style={styles.cardText}>
            NO.17, 1st Floor, 2nd Street, Parameshwari Nagar, Nandhivaram,
            Guduvanchery, Chennai – 603202
          </Text>
        </View>

        {/* Email Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons name="email" size={26} color="#1A73E8" />
            <Text style={styles.cardTitle}>Email</Text>
          </View>
          <Text style={styles.link} onPress={handleEmailPress}>
            rockfort.md@gmail.com
          </Text>
        </View>

        {/* GST Card */}

         
        {/* Phone Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Ionicons name="call" size={26} color="#1A73E8" />
            <Text style={styles.cardTitle}>Phone</Text>
          </View>

          <Text style={styles.link} onPress={handlePhonePress}>
            044-47455939
          </Text>

          <Text style={[styles.link, { marginTop: 8 }]} onPress={handleMobilePress}>
            9840275939
          </Text>
        </View>

        {/* QR Card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <MaterialIcons name="qr-code" size={26} color="#1A73E8" />
            <Text style={styles.cardTitle}>Scan QR Code</Text>
          </View>

          <Image
            source={require("../../../assets/qr.png")}
            style={styles.qrImage}
            resizeMode="contain"
          />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F9FF", padding: 20 },

  menuButton: { marginBottom: 10 },

  header: { fontSize: 28, fontWeight: "700", color: "#1A73E8", marginBottom: 15 },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
    marginBottom: 15,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1A73E8",
    marginLeft: 8,
  },

  cardText: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
  },

  link: {
    fontSize: 16,
    color: "#1A73E8",
    textDecorationLine: "underline",
    marginTop: 5,
  },

  qrImage: {
    width: 180,
    height: 180,
    marginTop: 10,
    alignSelf: "center",
  },
});
