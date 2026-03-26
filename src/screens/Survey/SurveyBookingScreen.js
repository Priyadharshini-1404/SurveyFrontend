// src/screens/Survey/SurveyBookingScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useStaff } from "../../hooks/useStaff";

const SurveyBookingScreen = ({ route, navigation }) => {
  const { userName, contactNumber, surveyType, date, time, location, notes } =
    route.params || {};

  const { staffList } = useStaff();
  const [selectedStaff, setSelectedStaff] = useState(null);

  const advanceAmount = 1;

  const handleConfirm = () => {
    if (!selectedStaff) return alert("Please select a staff!");
    navigation.navigate("Wallet", {
      userName,
      contactNumber,
      selectedStaff,
      surveyType,
      date,
      time,
      location,
      notes,
    });
  };

  if (!staffList)
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading staff...</Text>
      </View>
    );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Choose Your Survey Staff</Text>

      <FlatList
        data={staffList}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.card,
              selectedStaff?.id === item.id && styles.cardSelected,
            ]}
            onPress={() => setSelectedStaff(item)}
          >
            <Image
              source={
                item.image
                  ? { uri: item.image }
                  : require("../../../assets/abc.png")
              }
              style={styles.staffImage}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.staffName}>{item.name}</Text>
              <Text style={styles.expText}>
                Experience: {item.experience}
              </Text>

              <View style={styles.ratingRow}>
                <Ionicons name="star" size={18} color="#FFD700" />
                <Text style={styles.ratingText}>{item.rating} / 5</Text>
              </View>

              <Text style={styles.contactText}>
                Contact: {item.contact}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />

      {/* Sticky button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.confirmButton,
            !selectedStaff && { backgroundColor: "#9bb8e0" },
          ]}
          onPress={handleConfirm}
        >
          <Text style={styles.confirmText}>
            {selectedStaff
              ? `Proceed to Pay ₹${advanceAmount}`
              : "Select Staff"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SurveyBookingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F6F9FC",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    fontSize: 18,
    color: "#333",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    textAlign: "center",
    marginVertical: 20,
    color: "#0B2C6B",
  },

  card: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 14,
    marginBottom: 15,
    alignItems: "center",
    elevation: 4, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.15,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  cardSelected: {
    borderWidth: 2,
    borderColor: "#0A84FF",
    backgroundColor: "#EAF3FF",
  },

  staffImage: {
    width: 75,
    height: 75,
    borderRadius: 50,
    marginRight: 15,
  },

  staffName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#333",
  },

  expText: { fontSize: 14, color: "#555", marginTop: 3 },

  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 4,
  },

  ratingText: {
    fontSize: 14,
    color: "#444",
    marginLeft: 5,
  },

  contactText: { fontSize: 14, color: "#444" },

  footer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },

  confirmButton: {
    backgroundColor: "#02090f36",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
  },

  confirmText: {
    fontSize: 17,
    color: "#fff",
    fontWeight: "700",
  },
});
