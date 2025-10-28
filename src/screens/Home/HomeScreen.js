// src/screens/Home/HomeScreen.js
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { SwiperFlatList } from "react-native-swiper-flatlist";
import { SafeAreaView } from "react-native-safe-area-context";
import SurveyScreen from "../Survey/SurveyMain";
import { Ionicons } from "@expo/vector-icons";
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        {/* App Header */}
        <View style={styles.header}>
          {/* Left: Hamburger Menu */}
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={styles.headerButton}
          >
            <Ionicons name="menu" size={28} color="#0a74da" />
          </TouchableOpacity>

          {/* Center: Title */}
          <Text style={styles.title}>ROCKFORT SURVEYS</Text>

          {/* Right: Notifications */}
          <TouchableOpacity
            onPress={() => alert("Notifications")}
            style={styles.headerButton}
          >
            <Ionicons name="notifications-outline" size={28} color="#0a74da" />
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
        <Text style={styles.content1}>
          Rockfort Engineering is a company built around more and more assets:
          the services to its valued clients and its people. We believe work is
          more than just a place you go every day. It should be a place of
          professional growth, analysis and interpersonal relationships. It’s
          about being motivated and inspired to achieve certain goals.
        </Text>
        {/* My Surveys Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Surveys</Text>
          <View style={styles.buttonContainer}>
            {/* <TouchableOpacity
              style={styles.cardButton}
              onPress={() =>
                navigation.navigate("Survey", { screen: "SurveyMain" })
              }
            >
              <Text style={styles.cardText}>My Surveys</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate("RequestSurvey")}
            >
              <Text style={styles.cardText}>Survey Request</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate("Reports")}
            >
              <Text style={styles.cardText}>Reports</Text>
            </TouchableOpacity> */}

            <TouchableOpacity
              style={styles.cardButton}
              onPress={() => navigation.navigate("ScheduleScreen")}
            >
              <Text style={styles.cardText}>Scheduled Appointment</Text>
            </TouchableOpacity>
            <Text style={styles.content}>
              We encourage our team to take pride in their work and in providing
              exceptional solutions to our clients.
            </Text>
            <Image
              source={require("../../../assets/home4.jpg")} // your logo path
              style={styles.logo}
            />

            <Text style={styles.content2}>
              Our Corporate Philosophy Provide our services that are the very
              best available in the market and will never compromise on service
              quality and safety on any circumstances. Deliver a level of
              service that exceeds our client’s expectations. Develop and
              embrace new technologies and techniques to the advantage of our
              clients and our business. Ensure the company’s services conserve
              the integrity of the environment. Educate & train the youth
              interested in this growing field, thereby contributing to the
              community at large.
            </Text>
          </View>
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
  headerButton: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#0a74da",
  },

  sliderContainer: { height: 300, marginBottom: 20, marginTop: 20 },
  slideImage: { width: "170%", height: 250, borderRadius: 10 },
  section: { marginVertical: 20, paddingHorizontal: 20, marginTop: -25 },
  sectionTitle: { fontSize: 22, fontWeight: "600", marginBottom: 12 },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  content: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  content1: {
    fontSize: 18,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  content2: {
    fontSize: 18,
    color: "#666",
    textAlign: "justify",
    marginBottom: 40,
    paddingHorizontal: 10,
  },
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

  logo: {
    marginTop: -20,
    resizeMode: "contain",
    marginBottom: 30,
  },
  cardText: { fontSize: 16, color: "#333", fontWeight: "800" },
});
