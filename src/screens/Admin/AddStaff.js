import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { staffList as defaultStaff } from "../../data/staffData";

export default function AddStaff() {
  const [staffList, setStaffList] = useState(defaultStaff);

  // 🔹 Delete Staff
  const handleDelete = (id) => {
    Alert.alert("Confirm Delete", "Are you sure you want to delete this staff?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          setStaffList((prev) => prev.filter((s) => s.id !== id));
        },
        style: "destructive",
      },
    ]);
  };

  // 🔹 Add Staff (for now, just dummy add)
  const handleAdd = () => {
    const newId = `S00${staffList.length + 1}`;
    const newStaff = {
      id: newId,
      name: `New Staff ${newId}`,
      experience: "0 years",
      rating: 0,
      contact: "+91 00000 00000",
      image: require("../../../assets/abc.png"),
    };
    setStaffList((prev) => [...prev, newStaff]);
    Alert.alert("Success", `${newStaff.name} added successfully!`);
  };

  const renderStaff = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>Experience: {item.experience}</Text>
        <Text style={styles.detail}>Rating: ⭐ {item.rating}</Text>
        <Text style={styles.detail}>Contact: {item.contact}</Text>
      </View>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={24} color="red" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>👷 Manage Staff Members</Text>

      <FlatList
        data={staffList}
        keyExtractor={(item) => item.id}
        renderItem={renderStaff}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
        <Ionicons name="person-add-outline" size={22} color="#fff" />
        <Text style={styles.addText}>Add Staff</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 16 },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "bold" },
  detail: { fontSize: 14, color: "#555" },
  addButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#007bff",
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  addText: { color: "#fff", fontWeight: "600", marginLeft: 6 },
});
