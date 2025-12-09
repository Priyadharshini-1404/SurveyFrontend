import React, { useState , useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "../../hooks/useAuth";
import * as ImagePicker from "expo-image-picker";
import { socket } from "../../services/socket";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

const API_URL = "http://192.168.1.10:5000/api/surveys";

export default function ProfileScreen({ navigation }) {
  const { user, setUser } = useAuth();
  const [localImage, setLocalImage] = useState(user?.profilePic || null);
const [surveyList, setSurveyList] = useState([]);
const getStatusPercent = (status) => {
  switch (status) {
    case "Pending":
      return 0;
    case "Outgoing":
      return 50;
    case "Completed":
      return 100;
    default:
      return 0;
  }
};

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permission.status !== "granted") {
      alert("Permission required to access gallery!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.9,
    });

    if (!result.canceled) {
      const selectedUri = result.assets[0].uri;
      setLocalImage(selectedUri);
      setUser({ ...user, profilePic: selectedUri });
    }
  };

  const handleLogout = () => {
    navigation.navigate("Login");
  };
useEffect(() => {
  if (user?.id) loadUserSurveys();
  const handler = (payload) => {
    // if event is about this user's survey, refresh list
    if (payload?.type === "survey-status" || payload?.type === "survey-request") {
      loadUserSurveys();
    }
  };
  socket.on("receiveNotification", handler);
  return () => socket.off("receiveNotification", handler);
}, [user]);

const loadUserSurveys = async () => {
  try {
    const res = await fetch(`http://192.168.1.10:5000/api/surveys/user/${user.id}`);
    const data = await res.json();
    setSurveyList(data);
  } catch (err) { console.log(err); }
};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* ---------------- PROFILE HEADER ---------------- */}
        <View style={styles.header}>
          <View style={styles.imageWrapper}>
            <Image
              source={
                localImage
                  ? { uri: localImage }
                  : require("../../../assets/abc.png")
              }
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
              <Ionicons name="camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <Text style={styles.userName}>
            {user?.name ? `${user.name}` : "User"}
          </Text>
          <Text style={styles.userEmail}>{user?.email}</Text>
        </View>

        {/* ---------------- EXTRA DETAILS ---------------- */}
        <View style={styles.detailCard}>
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={20} color="#0a74da" />
            <Text style={styles.detailText}>{user?.phone || "No Phone Added"}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="briefcase-outline" size={20} color="#0a74da" />
            <Text style={styles.detailText}>{user?.role || "Customer"}</Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={20} color="#0a74da" />
            <Text style={styles.detailText}>
              Member Since: {user?.createdAt || "2024"}
            </Text>
          </View>
        </View>

        {/* ---------------- ABOUT SECTION ---------------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Us</Text>
          <Text style={styles.text}>
            Rockfort Surveys provides professional land and building surveying
            services with accuracy, trust, and reliability.
          </Text>
        </View>

        {/* ---------------- MY SURVEYS ---------------- */}
{user?.role !== "Admin" && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>My Surveys</Text>

 {surveyList.length ? (
  surveyList.map((s) => (
    <View key={s.Id} style={{ marginBottom: 20 }}>
      <View style={styles.detailRow}>
        <Ionicons name="document-text-outline" size={20} color="#0a74da" />
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.detailText}>{s.SurveyType}</Text>
          <Text style={{ fontSize: 12, color: "#666" }}>
            {new Date(s.SurveyDate).toDateString()}
          </Text>
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <Text style={{ fontWeight: "700" }}>{s.Status || "Pending"}</Text>
        </View>
      </View>

      {/* -------- COMPLETION PROGRESS BAR -------- */}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            { width: `${getStatusPercent(s.Status)}%` },
          ]}
        />
      </View>
      <Text style={{ fontSize: 12, color: "#555", marginTop: 2 }}>
        {getStatusPercent(s.Status)}% Complete
      </Text>
    </View>
  ))
) : (
  <Text style={styles.text}>You have no surveys booked.</Text>
)}

  </View>
)}




       {/* ---------------- MY APPOINTMENTS ---------------- */}
{user?.role !== "Admin" && (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>My Appointments</Text>

    {user?.appointments && user.appointments.length > 0 ? (
      user.appointments.map((appointment) => (
        <TouchableOpacity
          key={appointment.id}
          style={styles.detailRow}
          onPress={() =>
            navigation.navigate("AppointmentDetail", {
              appointmentId: appointment.id,
            })
          }
        >
          <Ionicons name="calendar-outline" size={20} color="#0a74da" />
          <Text style={styles.detailText}>{appointment.survey}</Text>
          <Text
            style={[
              styles.detailText,
              { marginLeft: "auto", fontSize: 14, color: "#555" },
            ]}
          >
            {appointment.time}
          </Text>
        </TouchableOpacity>
      ))
    ) : (
      <Text style={styles.text}>You have no upcoming appointments.</Text>
    )}
  </View>
)}


        {/* ---------------- SETTINGS ---------------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>

          <TouchableOpacity style={styles.row}>
            <Ionicons name="person-outline" size={22} color="#0a74da" />
            <Text style={styles.rowText}>Edit Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Ionicons name="key-outline" size={22} color="#0a74da" />
            <Text style={styles.rowText}>Change Password</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Ionicons name="notifications-outline" size={22} color="#0a74da" />
            <Text style={styles.rowText}>Notification Settings</Text>
          </TouchableOpacity>
        </View>

        {/* ---------------- SUPPORT ---------------- */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Help & Support</Text>

          <TouchableOpacity style={styles.row}>
            <Ionicons name="help-circle-outline" size={22} color="#0a74da" />
            <Text style={styles.rowText}>FAQs</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.row}>
            <Ionicons name="chatbubbles-outline" size={22} color="#0a74da" />
            <Text style={styles.rowText}>Contact Support</Text>
          </TouchableOpacity>

          <Text style={styles.supportText}>You can reach us anytime at:</Text>
          <Text style={styles.supportEmail}>support@rockfortsurveys.com</Text>
        </View>

        {/* ---------------- LOGOUT BUTTON ---------------- */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={22} color="#fff" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { alignItems: "center", paddingVertical: 20 },

  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 110,
    height: 110,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#0a74da",
  },
  cameraIcon: {
    position: "absolute",
    bottom: -2,
    right: -2,
    backgroundColor: "#0a74da",
    padding: 8,
    borderRadius: 20,
    elevation: 4,
  },

  userName: { fontSize: 22, fontWeight: "bold", color: "#0a74da", marginTop: 10 },
  userEmail: { fontSize: 15, color: "#555" },

  detailCard: {
    backgroundColor: "#eef6ff",
    padding: 15,
    marginHorizontal: 16,
    marginTop: 10,
    borderRadius: 10,
  },
  progressBarBackground: {
  height: 10,
  backgroundColor: "#ddd",
  borderRadius: 5,
  overflow: "hidden",
  marginTop: 8,
},
progressBarFill: {
  height: "100%",
  backgroundColor: "#0a74da",
  borderRadius: 5,
},

  detailRow: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  detailText: {
    fontSize: 16,
    marginLeft: 10,
    color: "#333",
  },

  section: {
    backgroundColor: "#f8f9fa",
    marginHorizontal: 16,
    marginVertical: 10,
    padding: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#0a74da",
  },
  text: { fontSize: 15, color: "#444", lineHeight: 22 },
  row: { flexDirection: "row", alignItems: "center", paddingVertical: 12 },
  rowText: { marginLeft: 12, fontSize: 16, color: "#333" },
  supportText: { marginTop: 10, fontSize: 14, color: "#555" },
  supportEmail: {
    fontSize: 16,
    fontWeight: "600",
    color: "#0a74da",
    marginTop: 3,
  },
  logoutButton: {
    backgroundColor: "#dc3545",
    margin: 16,
    paddingVertical: 14,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logoutText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
