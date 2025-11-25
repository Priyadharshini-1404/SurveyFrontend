import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import {
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { SwiperFlatList } from "react-native-swiper-flatlist";

const API_URL = process.env.EXPO_PUBLIC_API_URL;
const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const images = [
    require("../../../assets/build1.jpg"),
    require("../../../assets/land1.jpg"),
    require("../../../assets/property.jpg"),
    require("../../../assets/Property2.jpg"),
    require("../../../assets/pipeline1.jpg"),
  ];

  const [notifications, setNotifications] = useState([]);
  const { user, setRedirectScreen } = useAuth();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get(`${API_URL}/notifications`);
      setNotifications(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  const handleNavigate = (screenName) => {
    if (!user) {
      setRedirectScreen(screenName);
      navigation.navigate("Login");
      return;
    }

    if (user.role === "admin") {
      navigation.navigate("AdminDrawer", {
        screen: "AdminStack",
        params: { screen: screenName },
      });
      return;
    }

    navigation.navigate("UserDrawer", {
      screen: "UserStack",
      params: { screen: screenName },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

        {/* Header */}
        <View style={styles.header}>
          {user ? (
            <TouchableOpacity onPress={() => navigation.getParent()?.openDrawer()}>
              <Ionicons name="menu" size={28} color="#1b2b48" />
            </TouchableOpacity>
          ) : (
            <View style={{ width: 28 }} />
          )}

          <Text style={styles.headerTitle}>Rockfort Surveys</Text>

          {user ? (
            <TouchableOpacity
              onPress={() => handleNavigate("Notifications")}
              style={styles.headerButton}
            >
              <Ionicons name="notifications-outline" size={28} color="#1b2b48" />
              {notifications.some((n) => n.status === "unread") && (
                <View style={styles.badge} />
              )}
            </TouchableOpacity>
          ) : (
            <View style={{ width: 28 }} />
          )}
        </View>

        {/* Slider */}
        <View style={styles.sliderBox}>
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={0}
            showPagination
            paginationActiveColor="#0a74da"
            paginationDefaultColor="#c9ced6"
          >
            {images.map((img, index) => (
              <View key={index} style={{ width }}>
                <Image source={img} style={styles.sliderImage} />
              </View>
            ))}
          </SwiperFlatList>
        </View>

        {/* Company Info */}
        <Text style={styles.introText}>
          Rockfort Engineering is a company built around its people and its
          strong commitment to quality surveying solutions.
        </Text>

        {/* My Surveys */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Surveys</Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigate("RequestSurvey")}
            >
              <Ionicons name="document-text-outline" size={34} color="#0a74da" />
              <Text style={styles.actionText}>Survey Request</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => handleNavigate("ScheduleScreen")}
            >
              <Ionicons name="calendar-outline" size={34} color="#0a74da" />
              <Text style={styles.actionText}>Appointments</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.infoText}>
            We take pride in delivering precise, fast, and reliable survey
            solutions to all our valued clients.
          </Text>

          <Image
            source={require("../../../assets/home4.jpg")}
            style={styles.infoImage}
          />

          <Text style={styles.infoText2}>
            Our philosophy: Deliver industry-best services with unmatched quality
            and consistency.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f7fb" },

  /* HEADER */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1b2b48",
    letterSpacing: 0.5,
  },
  headerButton: { padding: 5 },
  badge: {
    position: "absolute",
    right: 4,
    top: 3,
    backgroundColor: "red",
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  /* SLIDER */
  sliderBox: {
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 18,
    overflow: "hidden",
    marginHorizontal: 16,
    elevation: 6,
    backgroundColor: "#fff",
  },
  sliderImage: {
    width: "100%",
    height: 210,
  },

  introText: {
    fontSize: 16,
    color: "#465062",
    textAlign: "center",
    paddingHorizontal: 22,
    marginBottom: 20,
    lineHeight: 22,
  },

  /* SECTION */
  section: { marginTop: 10, paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1b2b48",
    marginBottom: 14,
  },

  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  actionCard: {
    width: "48%",
    backgroundColor: "#ffffff",
    paddingVertical: 26,
    borderRadius: 16,
    alignItems: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },

  actionText: {
    fontSize: 16,
    marginTop: 8,
    color: "#1b2b48",
    fontWeight: "600",
  },

  infoText: {
    fontSize: 16,
    color: "#465062",
    textAlign: "center",
    marginTop: 22,
    marginBottom: 15,
  },

  infoImage: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 14,
    marginBottom: 20,
    marginTop: 10,
  },

  infoText2: {
    fontSize: 16,
    color: "#465062",
    textAlign: "center",
    marginBottom: 30,
    paddingHorizontal: 10,
    lineHeight: 22,
  },
});
