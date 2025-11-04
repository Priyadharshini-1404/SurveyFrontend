import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";

export default function SplashScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Rockfort Engineering</Text>

        <Image
          source={require("../../../assets/images/Splash.png")}
          style={styles.logo}
        />

        <Text style={styles.content}>
          Welcome to Rockfort Surveys! Submit and track your surveys seamlessly.{"\n\n"}
          We would like to introduce ourselves, with dignity and pride, as one of
          the experienced Survey consultant firms in Chennai, India.{"\n\n"}
          We are engaged in providing a comprehensive range of surveying services,
          using Digital Instruments and modern technologies to produce well-presented
          and accurate data.
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace("MainApp")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: "contain",
    marginBottom: 30,
    marginTop: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#000",
  },
  content: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 10,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#0a74da",
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
