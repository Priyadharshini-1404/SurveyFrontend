import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useStaff } from "../../hooks/useStaff";

export default function AdminAddEditStaff() {
  const { staffList, addStaff, updateStaff, deleteStaff } = useStaff();

  const [editingStaff, setEditingStaff] = useState(null);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState(""); // URL or local path

  // Fill form when editing
  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setName(staff.name);
    setExperience(staff.experience);
    setRating(staff.rating.toString());
    setContact(staff.contact);
    setImage(staff.image);
  };

  // Reset form
  const resetForm = () => {
    setEditingStaff(null);
    setName("");
    setExperience("");
    setRating("");
    setContact("");
    setImage("");
  };

  const handleSave = async () => {
    if (!name || !contact) {
      Alert.alert("Validation Error", "Name and Contact are required!");
      return;
    }

    const staffData = {
      name,
      experience,
      rating: parseInt(rating) || 0,
      contact,
      image: image || "abc.png",
    };

    if (editingStaff) {
      await updateStaff(editingStaff.id, staffData);
      Alert.alert("Success", "Staff updated successfully!");
    } else {
      await addStaff(staffData);
      Alert.alert("Success", "New staff added successfully!");
    }

    resetForm();
  };

  const handleDelete = (id) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this staff?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            await deleteStaff(id);
            if (editingStaff?.id === id) resetForm();
          },
        },
      ]
    );
  };

  const renderStaff = ({ item }) => (
    <View style={styles.card}>
      <Image
        source={item.image ? { uri: item.image } : require("../../../assets/abc.png")}
        style={styles.image}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.detail}>Experience: {item.experience}</Text>
        <Text style={styles.detail}>Rating: ⭐ {item.rating}</Text>
        <Text style={styles.detail}>Contact: {item.contact}</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Ionicons name="pencil-outline" size={22} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDelete(item.id)} style={{ marginLeft: 15 }}>
          <Ionicons name="trash-outline" size={22} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {editingStaff ? "Edit Staff Member" : "Add New Staff"}
      </Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Experience"
        value={experience}
        onChangeText={setExperience}
        style={styles.input}
      />
      <TextInput
        placeholder="Rating (0-5)"
        value={rating}
        onChangeText={setRating}
        keyboardType="numeric"
        style={styles.input}
      />
      <TextInput
        placeholder="Contact Number"
        value={contact}
        onChangeText={setContact}
        style={styles.input}
      />
      <TextInput
        placeholder="Image URL (optional)"
        value={image}
        onChangeText={setImage}
        style={styles.input}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>{editingStaff ? "Update Staff" : "Add Staff"}</Text>
      </TouchableOpacity>

      <FlatList
        data={staffList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderStaff}
        contentContainerStyle={{ paddingBottom: 100 }}
        style={{ marginTop: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9", padding: 16 },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  saveButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  saveText: { color: "#fff", fontWeight: "600" },
  card: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 3,
  },
  image: { width: 60, height: 60, borderRadius: 30, marginRight: 10 },
  name: { fontSize: 16, fontWeight: "bold" },
  detail: { fontSize: 14, color: "#555" },
});
