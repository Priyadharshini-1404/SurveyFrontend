import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, Alert, StyleSheet } from "react-native";
import { useStaff } from "../../hooks/useStaff";

export default function AddStaff() {
  const { staffList, addStaff, updateStaff, deleteStaff } = useStaff();
  const [editingStaff, setEditingStaff] = useState(null);
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [rating, setRating] = useState("");
  const [contact, setContact] = useState("");
  const [image, setImage] = useState("");

  const handleEdit = (staff) => {
    setEditingStaff(staff);
    setName(staff.name);
    setExperience(staff.experience);
    setRating(staff.rating.toString());
    setContact(staff.contact);
    setImage(staff.image);
  };

  const resetForm = () => {
    setEditingStaff(null);
    setName("");
    setExperience("");
    setRating("");
    setContact("");
    setImage("");
  };

  const handleSave = () => {
    if (!name || !contact) return Alert.alert("Error", "Name & Contact required");

    const staffData = { name, experience, rating: parseInt(rating) || 0, contact, image };
    editingStaff ? updateStaff(editingStaff.id, staffData) : addStaff(staffData);
    resetForm();
  };

  const handleDelete = (id) => {
    Alert.alert("Delete Staff?", "", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: () => deleteStaff(id) },
    ]);
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>{editingStaff ? "Edit Staff" : "Add Staff"}</Text>

      <TextInput placeholder="Name" value={name} onChangeText={setName} style={styles.input} />
      <TextInput placeholder="Experience" value={experience} onChangeText={setExperience} style={styles.input} />
      <TextInput placeholder="Rating" value={rating} onChangeText={setRating} keyboardType="numeric" style={styles.input} />
      <TextInput placeholder="Contact" value={contact} onChangeText={setContact} style={styles.input} />
      <TextInput placeholder="Image URL" value={image} onChangeText={setImage} style={styles.input} />

      <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
        <Text style={{ color: "#fff", fontWeight: "bold" }}>{editingStaff ? "Update" : "Add"}</Text>
      </TouchableOpacity>

      <FlatList
        data={staffList}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image ? { uri: item.image } : require("../../../assets/abc.png")} style={styles.image} />
            <View style={{ flex: 1 }}>
              <Text>{item.name}</Text>
              <Text>Exp: {item.experience}</Text>
              <Text>Rating: {item.rating}</Text>
            </View>
            <TouchableOpacity onPress={() => handleEdit(item)}><Text>Edit</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => handleDelete(item.id)}><Text>Delete</Text></TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: { borderWidth: 1, borderColor: "#ccc", marginBottom: 10, padding: 8, borderRadius: 8 },
  saveButton: { backgroundColor: "#007bff", padding: 12, borderRadius: 8, alignItems: "center", marginBottom: 10 },
  card: { flexDirection: "row", alignItems: "center", padding: 10, backgroundColor: "#f5f5f5", borderRadius: 8, marginBottom: 10 },
  image: { width: 50, height: 50, borderRadius: 25, marginRight: 10 },
});
