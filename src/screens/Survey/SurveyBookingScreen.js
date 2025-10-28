import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { staffList } from "../../data/staffData";

const SurveyBookingScreen = ({ route, navigation }) => {
  const { surveyType = "", date = "", time = "", location = "" } = route?.params || {};
  const [selectedStaff, setSelectedStaff] = useState(null);

  const surveyRate = "Based on Location";
  const advanceAmount = 500;

  const handleConfirm = () => {
    if (!selectedStaff) {
      alert("Please select a staff before proceeding!");
      return;
    }
    navigation.navigate("Wallet", { selectedStaff });
  };

  // Header + Details + Payment button all inside ListHeaderComponent
  const renderHeader = () => (
    <View style={{ padding: 20 }}>
      <Text style={styles.title}>Survey Booking Details</Text>

      {/* Survey Info */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>📋 Survey Information</Text>
        <Text style={styles.detail}>Type: {surveyType}</Text>
        <Text style={styles.detail}>Date: {date}</Text>
        <Text style={styles.detail}>Time: {time}</Text>
        <Text style={styles.detail}>Location: {location}</Text>
      </View>

      {/* Rate Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>💰 Survey Charges</Text>
        <Text style={styles.detail}>Total Rate: ₹{surveyRate}</Text>
        <Text style={[styles.detail, { color: "green", fontWeight: "bold" }]}>
          Advance Amount: ₹{advanceAmount}
        </Text>
      </View>

      {/* Staff Section Title */}
      <View style={{ marginBottom: 10 }}>
        <Text style={styles.sectionTitle}>👷 Choose Registered Staff</Text>
      </View>
    </View>
  );

  const renderFooter = () => (
    <TouchableOpacity style={styles.payButton} onPress={handleConfirm}>
      <Text style={styles.payText}>
        {selectedStaff
          ? `Proceed to Pay ₹${advanceAmount}`
          : "Select a Staff to Continue"}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={staffList}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.staffCard,
              selectedStaff?.id === item.id && styles.selectedCard,
            ]}
            onPress={() => setSelectedStaff(item)}
          >
            <Image source={item.image} style={styles.staffImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.staffName}>{item.name}</Text>
              <Text style={styles.detail}>Experience: {item.experience}</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Ionicons name="star" color="#FFD700" size={16} />
                <Text style={styles.detail}> {item.rating} / 5</Text>
              </View>
              <Text style={styles.detail}>Contact: {item.contact}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
      />
    </SafeAreaView>
  );
};

export default SurveyBookingScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 8 },
  detail: { fontSize: 15, color: "#333", marginVertical: 2 },
  staffCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  selectedCard: {
    borderColor: "#1E90FF",
    backgroundColor: "#E6F0FF",
  },
  staffImage: { width: 70, height: 70, borderRadius: 35, marginRight: 10 },
  staffName: { fontSize: 16, fontWeight: "bold" },
  payButton: {
    backgroundColor: "#1E90FF",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
  },
  payText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
