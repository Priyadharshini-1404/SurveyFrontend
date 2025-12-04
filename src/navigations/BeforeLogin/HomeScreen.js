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
import { LinearGradient } from "expo-linear-gradient";
import * as Animatable from "react-native-animatable";

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
    <LinearGradient colors={["#e0f0ff", "#f4f7fb"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>

          {/* HEADER */}
          <Animatable.View animation="fadeInDown" duration={1000} style={styles.header}>
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
          </Animatable.View>

          {/* SLIDER */}
          <Animatable.View animation="fadeIn" delay={200} duration={1200} style={styles.sliderBox}>
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
                <Animatable.View key={index} animation="zoomIn" delay={index * 200} style={{ width }}>
                  <Image source={img} style={styles.sliderImage} />
                </Animatable.View>
              ))}
            </SwiperFlatList>
          </Animatable.View>

          {/* COMPANY INTRO */}
          <Animatable.Text animation="fadeInUp" delay={400} style={styles.introText}>
            Professional, accurate, and reliable surveying services — trusted by
            hundreds of clients across the region.
          </Animatable.Text>

          {/* SERVICES QUICK ACCESS */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Surveys</Text>
            <View style={styles.buttonRow}>
              <Animatable.View animation="bounceIn" delay={500} style={{ flex: 1, marginRight: 8 }}>
                <TouchableOpacity
                  onPress={() => handleNavigate("RequestSurvey")}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={["#93c6e3ff", "#0b3a82ff"]} // professional blue gradient
                    style={styles.gradientButton}
                  >
                    <Animatable.View animation="bounce" iterationCount={1} duration={800}>
                      <Ionicons name="document-text-outline" size={38} color="#fff" />
                    </Animatable.View>
                    <Text style={styles.gradientButtonText}>Survey Request</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animatable.View>

              <Animatable.View animation="bounceIn" delay={700} style={{ flex: 1, marginLeft: 8 }}>
                <TouchableOpacity
                  onPress={() => handleNavigate("ScheduleScreen")}
                  activeOpacity={0.9}
                >
                  <LinearGradient
                    colors={["#94d1c7ff", "#20413dff"]} // professional teal gradient
                    style={styles.gradientButton}
                  >
                    <Animatable.View animation="bounce" iterationCount={1} duration={800}>
                      <Ionicons name="calendar-outline" size={38} color="#fff" />
                    </Animatable.View>
                    <Text style={styles.gradientButtonText}> Book Appointments</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          </View>

          {/* HIGHLIGHT CARD */}
          <Animatable.View animation="fadeInUp" delay={900} style={styles.highlightCard}>
            <Text style={styles.highlightTitle}>Welcome to Rockfort Surveys</Text>
            <Text style={styles.highlightText}>
              Delivering precision, professionalism, and timely surveys for all your projects.
            </Text>
          </Animatable.View>

          {/* ABOUT CARD */}
          <Animatable.View animation="fadeInUp" delay={1200} style={styles.aboutCard}>
            <Text style={styles.aboutTitle}>About Rockfort Engineering</Text>
            <Text style={styles.aboutText}>
              With years of field expertise, we deliver accurate measurements,
              professional reporting, and on-time project delivery.
            </Text>
          </Animatable.View>

        </ScrollView>

        {/* FLOATING ACTION BUTTON */}
        <Animatable.View animation="fadeInUp" delay={1400} style={styles.fab}>
          <TouchableOpacity
            style={styles.fabButton}
            onPress={() => handleNavigate("RequestSurvey")}
          >
            <Ionicons name="add" size={28} color="#fff" />
          </TouchableOpacity>
        </Animatable.View>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },

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
    height: 230,
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

  /* GRADIENT BUTTONS */
  gradientButton: {
    paddingVertical: 28,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  gradientButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
  },

  /* HIGHLIGHT CARD */
  highlightCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 20,
    padding: 24,
    borderRadius: 16,
    elevation: 4,
    marginTop: 20,
  },
  highlightTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1b2b48",
    marginBottom: 8,
    textAlign: "center",
  },
  highlightText: {
    fontSize: 15,
    color: "#465062",
    textAlign: "center",
    lineHeight: 22,
  },

  /* ABOUT CARD */
  aboutCard: {
    marginTop: 30,
    marginBottom: 40,
    backgroundColor: "#fff",
    marginHorizontal: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 6,
  },
  aboutTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1b2b48",
    marginBottom: 8,
  },
  aboutText: {
    fontSize: 15,
    color: "#465062",
    lineHeight: 22,
  },

  /* FLOATING BUTTON */
  fab: {
    position: "absolute",
    bottom: 30,
    right: 25,
  },
  fabButton: {
    backgroundColor: "#0a74da",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
  },
});
