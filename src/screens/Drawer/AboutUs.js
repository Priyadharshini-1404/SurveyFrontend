import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function AboutUs({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Drawer Button */}
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={styles.menuButton}>
        <Ionicons name="menu" size={30} color="#1A73E8" />
      </TouchableOpacity>

      <Text style={styles.header}>About Us</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            We are one of the experienced Survey Consultant firms in Chennai, India,
            offering a wide range of digital surveying services powered by modern
            technologies and an expert team...
          </Text>
        </View>

        <Text style={styles.subTitle}>Our Corporate Philosophy</Text>

        <View style={styles.listCard}>
          <Text style={styles.bullet}>• Provide the best market service without compromising quality.</Text>
          <Text style={styles.bullet}>• Deliver service beyond expectations.</Text>
          <Text style={styles.bullet}>• Embrace new technologies to help clients.</Text>
          <Text style={styles.bullet}>• Ensure environmental responsibility.</Text>
          <Text style={styles.bullet}>• Educate youth and support the community.</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F9FF", padding: 20 },
  menuButton: { marginBottom: 10 },
  header: { fontSize: 28, fontWeight: "700", color: "#1A73E8", marginBottom: 15 },
  subTitle: { fontSize: 20, fontWeight: "600", color: "#1A73E8", marginVertical: 10 },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    marginBottom: 15
  },
  listCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 4,
    shadowColor: "#000",
    marginBottom: 20
  },
  cardText: { fontSize: 16, color: "#333", lineHeight: 24 },
  bullet: { fontSize: 16, color: "#333", marginBottom: 10, lineHeight: 24 }
});
