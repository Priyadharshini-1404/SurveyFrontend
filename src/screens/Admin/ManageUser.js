import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from "react-native";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);

  // Dummy data for now (you can connect to backend later)
  useEffect(() => {
    setUsers([
      { id: 1, name: "John Doe", email: "john@example.com", role: "user" },
      { id: 2, name: "Jane Smith", email: "jane@example.com", role: "admin" },
      { id: 3, name: "Robert Brown", email: "robert@example.com", role: "user" },
    ]);
  }, []);

  const promoteToAdmin = (userId) => {
    Alert.alert("Success", `User ${userId} promoted to Admin`);
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, role: "admin" } : u
      )
    );
  };

  const removeUser = (userId) => {
    Alert.alert("Deleted", `User ${userId} removed`);
    setUsers((prev) => prev.filter((u) => u.id !== userId));
  };

  const renderUser = ({ item }) => (
    <View style={styles.userCard}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
      <Text style={styles.role}>Role: {item.role}</Text>

      <View style={styles.buttons}>
        {item.role === "user" && (
          <TouchableOpacity
            style={styles.promoteButton}
            onPress={() => promoteToAdmin(item.id)}
          >
            <Text style={styles.buttonText}>Make Admin</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => removeUser(item.id)}
        >
          <Text style={styles.buttonText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Manage Users</Text>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUser}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 12 },
  userCard: {
    padding: 12,
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    marginBottom: 10,
  },
  name: { fontSize: 18, fontWeight: "bold" },
  email: { color: "#555" },
  role: { marginTop: 4, fontStyle: "italic", color: "#333" },
  buttons: { flexDirection: "row", marginTop: 8 },
  promoteButton: {
    backgroundColor: "#007bff",
    padding: 8,
    borderRadius: 6,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: "#dc3545",
    padding: 8,
    borderRadius: 6,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
