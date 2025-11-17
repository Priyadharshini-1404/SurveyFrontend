import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  Dimensions,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../../hooks/useAuth";

const { width, height } = Dimensions.get("window");

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const { user } = useAuth(); // get logged-in user

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 3200,
          useNativeDriver: true,
        }),
        Animated.spring(scaleAnim, {
          toValue: 1,
          friction: 5,
          tension: 60,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Navigate after 3.2s (or your animation duration)
    const timer = setTimeout(() => {
      if (!user) {
        navigation.replace("Login"); // go to Login if not logged in
      } else {
        navigation.replace("MainDrawer"); // go to MainDrawer or AdminDrawer based on user.role
      }
    }, 3200);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, navigation, user]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      <LinearGradient
        colors={["#0a0f1f", "#1c1f33", "#2d3748"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        <View style={styles.overlay}>
          <Animated.View
            style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}
          >
            <Image
              source={require("../../../assets/images/Splash.png")}
              style={styles.logo}
            />
          </Animated.View>

          <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
            Welcome to Rockfort Surveys!
          </Animated.Text>

          <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
            Precision • Integrity • Innovation
          </Animated.Text>

          <View style={styles.line} />

          <Animated.Text style={[styles.content, { opacity: fadeAnim }]}>
            Submit and track your surveys seamlessly{"\n"}
            Empowering modern surveying with accuracy, innovation, and trust.
          </Animated.Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#000",
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  backgroundImage: {
    ...StyleSheet.absoluteFillObject,
    width: width,
    height: height,
    resizeMode: "cover",
    opacity: 0.15, // soft fade behind text
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 25,
  },
  logoContainer: {
    marginBottom: 20,
  },
  logo: {
    width: width * 0.8,
    height: width * 0.8,
    resizeMode: "contain",
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 10,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 16,
    color: "#CDE4FF",
    textAlign: "center",
    marginTop: 8,
    letterSpacing: 0.5,
  },
  line: {
    width: 80,
    height: 3,
    backgroundColor: "#00BFFF",
    borderRadius: 2,
    marginVertical: 20,
  },
  content: {
    fontSize: 15,
    color: "#EAECEE",
    textAlign: "center",
    lineHeight: 22,
    maxWidth: 340,
  },
});
