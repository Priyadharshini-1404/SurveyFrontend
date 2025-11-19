import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../hooks/useAuth";

export default function AdminProfileScreen() {
  const { user } = useAuth();
const BASE_URL="http://192.168.1.11:5000";
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image
          source={
            user?.profilePic
              ? { uri: `${BASE_URL}${user.profilePic}` }
              : require("../../../assets/abc.png")
          }
          style={styles.profileImage}
        />

        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.email}>{user?.email}</Text>
        <Text style={styles.role}>Role: Admin</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", paddingTop: 30 },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 70,
    borderColor: "#0a74da",
    borderWidth: 3,
  },
  name: { fontSize: 24, fontWeight: "bold", marginTop: 10 },
  email: { fontSize: 16, color: "#555" },
  role: {
    marginTop: 8,
    fontSize: 16,
    color: "#0a74da",
    fontWeight: "bold",
  },
});
