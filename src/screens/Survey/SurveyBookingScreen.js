// src/screens/Survey/SurveyBookingScreen.js
import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useStaff } from "../../hooks/useStaff";

const SurveyBookingScreen = ({ route, navigation }) => {
  const { userName, contactNumber, surveyType, date, time, location, notes } = route.params || {};
  const { staffList } = useStaff(); // ✅ live staff list
  const [selectedStaff, setSelectedStaff] = useState(null);

  const advanceAmount = 1;

  const handleConfirm = () => {
    if (!selectedStaff) return alert("Please select a staff!");
    navigation.navigate("Wallet", { userName, contactNumber, selectedStaff, surveyType, date, time, location, notes });
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={staffList}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={{ padding: 20 }}>
            <Text style={styles.title}>👷 Choose Staff</Text>
          </View>
        }
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.staffCard, selectedStaff?.id === item.id && styles.selectedCard]}
            onPress={() => setSelectedStaff(item)}
          >
            <Image source={item.image ? { uri: item.image } : require("../../../assets/abc.png")} style={styles.staffImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.staffName}>{item.name}</Text>
              <Text>Experience: {item.experience}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="star" color="#FFD700" size={16} />
                <Text> {item.rating} / 5</Text>
              </View>
              <Text>Contact: {item.contact}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListFooterComponent={
          <TouchableOpacity style={styles.payButton} onPress={handleConfirm}>
            <Text style={styles.payText}>{selectedStaff ? `Proceed ₹${advanceAmount}` : "Select Staff"}</Text>
          </TouchableOpacity>
        }
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default SurveyBookingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  staffCard: { flexDirection: "row", alignItems: "center", padding: 10, borderWidth: 1, borderColor: "#ddd", borderRadius: 10, marginBottom: 10, backgroundColor: "#fff" },
  selectedCard: { borderColor: "#1E90FF", backgroundColor: "#E6F0FF" },
  staffImage: { width: 70, height: 70, borderRadius: 35, marginRight: 10 },
  staffName: { fontSize: 16, fontWeight: "bold" },
  payButton: { backgroundColor: "#1E90FF", padding: 15, borderRadius: 12, alignItems: "center", marginTop: 20 },
  payText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
