import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";
import { 
  
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import RequestSurvey from "../Survey/RequestSurvey";
import ScheduleScreen from "../Survey/ScheduleScreen";

const { width } = Dimensions.get("window");

export default function HomeScreen({ navigation }) {
  const images = [
    require("../../../assets/build1.jpg"),
    require("../../../assets/land1.jpg"),
    require("../../../assets/property.jpg"),
    require("../../../assets/Property2.jpg"),
    require("../../../assets/pipeline1.jpg")
  ];

  const [notifications, setNotifications] = useState([]);
  const { user, setRedirectScreen } = useAuth();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await axios.get("http://192.168.1.11:5000/api/notifications");
      setNotifications(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

// HomeScreen.js
const handleNavigate = (screenName) => {
  if (!user) {
    setRedirectScreen(screenName); // save intended screen
    navigation.navigate("Login"); // go to login first
  } else {
    // logged-in user
    navigation.navigate(screenName);
  }
};



console.log("CURRENT USER:", user);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.title}>ROCKFORT SURVEYS</Text>
          <TouchableOpacity
            onPress={() => handleNavigate("Notifications")}
            style={styles.headerButton}
          >
            <Ionicons name="notifications-outline" size={28} color="#0a74da" />
            {notifications.some(n => n.status === "unread") && (
              <View style={styles.notificationBadge} />
            )}
          </TouchableOpacity>
        </View>

        {/* Slideshow */}
        <View style={styles.sliderContainer}>
          <SwiperFlatList
            autoplay
            autoplayDelay={2}
            autoplayLoop
            index={0}
            showPagination
            paginationActiveColor="#060607ff"
            paginationDefaultColor="#ccc"
          >
            {images.map((img, index) => (
              <View key={index} style={{ width }}>
                <Image
                  source={img}
                  style={styles.slideImage}
                  resizeMode="cover"
                />
              </View>
            ))}
          </SwiperFlatList>
        </View>

        {/* Company Info */}
        <Text style={styles.content1}>
          Rockfort Engineering is a company built around more and more assets: 
          the services to its valued clients and its people...
        </Text>

        {/* My Surveys Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Surveys</Text>
          <View style={styles.buttonContainer}>
          <TouchableOpacity
  style={styles.cardButton}
  onPress={() => handleNavigate("RequestSurvey")}
>
  <Text style={styles.cardText}>Survey Request</Text>
</TouchableOpacity>

<TouchableOpacity
  style={styles.cardButton}
  onPress={() => handleNavigate("ScheduleScreen")}
>
  <Text style={styles.cardText}>Scheduled Appointment</Text>
</TouchableOpacity>


          </View>

          <Text style={styles.content}>
            We encourage our team to take pride in their work and in providing exceptional solutions to our clients.
          </Text>

          <Image
            source={require("../../../assets/home4.jpg")}
            style={styles.logo}
          />

          <Text style={styles.content2}>
            Our Corporate Philosophy: Provide our services that are the very best...
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 40,
    marginBottom: 10,
  },
  headerButton: { padding: 5 },
  notificationBadge: {
    position: "absolute",
    right: 6,
    top: 2,
    backgroundColor: "red",
    borderRadius: 8,
    width: 10,
    height: 10,
  },
  title: { fontSize: 20, fontWeight: "bold", color: "#0a74da" },
  sliderContainer: { height: 300, marginBottom: 20, marginTop: 20 },
  slideImage: { width: "170%", height: 250, borderRadius: 10 },
  section: { marginVertical: 20, paddingHorizontal: 20, marginTop: -25 },
  sectionTitle: { fontSize: 22, fontWeight: "600", marginBottom: 12 },
  buttonContainer: { flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap" },
  content: { fontSize: 18, color: "#666", textAlign: "center", marginBottom: 40, paddingHorizontal: 10, marginTop: 10 },
  content1: { fontSize: 18, color: "#666", textAlign: "center", marginBottom: 40, paddingHorizontal: 10 },
  content2: { fontSize: 18, color: "#666", textAlign: "justify", marginBottom: 40, paddingHorizontal: 10 },
  cardButton: {
    width: "48%",
    backgroundColor: "#f1f4f9",
    shadowColor: "#000",
    padding: 19,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: "center",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginVertical: 8,
    elevation: 4,
  },
  logo: { marginTop: -20, resizeMode: "contain", marginBottom: 30 },
  cardText: { fontSize: 16, color: "#333", fontWeight: "800" },
});
