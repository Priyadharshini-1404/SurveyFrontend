import React, { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { socket } from "../../services/socket";
import { fetchNotifications } from "../../services/notificationService";
import { SafeAreaView } from "react-native-safe-area-context";

export default function NotificationsScreen() {
  const userId = 3; // logged-in user
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    socket.emit("register", userId);

    // Fetch initial notifications
    const load = async () => {
      const data = await fetchNotifications(userId);
      setNotifications(data);
    };
    load();

    // Listen for new real-time notifications
    socket.on("receiveNotification", (data) => {
      setNotifications((prev) => [
        { id: Date.now(), message: data.message, createdAt: new Date() },
        ...prev,
      ]);
    });

    return () => socket.off("receiveNotification");
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Notifications</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.date}>{new Date(item.createdAt).toLocaleString()}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  header: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  card: { backgroundColor: "#f2f2f2", padding: 15, borderRadius: 10, marginBottom: 10 },
  message: { fontSize: 16, fontWeight: "500" },
  date: { fontSize: 12, color: "#666", marginTop: 4 },
});
