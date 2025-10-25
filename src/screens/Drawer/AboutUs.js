import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function AboutUs({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Back Button */}
       <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        style={styles.backButton}
      >
        <Ionicons name="arrow-back" size={26} color="#0e0f0fff" />
      </TouchableOpacity>

      <Text style={styles.title}>About Us</Text>

      <Text style={styles.text}>
        We would like to introduce ourselves, with dignity and pride, as one of
        the experienced Survey consultant firms in Chennai, India. We are
        engaged in the trade of providing a comprehensive range of surveying
        services, using Digital Instrument and modern technologies to produce
        well-presented and accurate data. Rockfort Engineering consists of a
        well-experienced team of surveyors and a professional management team.
        Our team has the technical expertise, equipment and the technology to
        deliver the best solutions to our clients. Our company is known to be
        reliable, delivers projects on time and within an agreed budget, and
        adheres to the highest ethical industry standards.
      </Text>

      <Text style={styles.title}>Our Corporate Philosophy</Text>

      <View style={styles.bulletList}>
        <Text style={styles.bulletItem}>
          {'\u2022'} Provide our services that are the very best available in the market and will never compromise on service quality and safety on any circumstances.
        </Text>
        <Text style={styles.bulletItem}>
          {'\u2022'} Deliver a level of service that exceeds our client’s expectations.
        </Text>
        <Text style={styles.bulletItem}>
          {'\u2022'} Develop and embrace new technologies and techniques to the advantage of our clients and our business.
        </Text>
        <Text style={styles.bulletItem}>
          {'\u2022'} Ensure the company’s services conserve the integrity of the environment.
        </Text>
        <Text style={styles.bulletItem}>
          {'\u2022'} Educate & train the youth interested in this growing field, thereby contributing to the community at large.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0a74da",
    marginBottom: 10,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  
  text: {
    fontSize: 16,
    color: "#555",
    lineHeight: 22,
    marginBottom: 15,
  },
  bulletList: {
    paddingLeft: 10,
  },
  bulletItem: {
    fontSize: 16,
    color: "#555",
    lineHeight: 24,
    marginBottom: 10,
  },
});
