// src/screens/MapPickerScreen.js
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapPickerScreen({ navigation }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");
  const mapRef = useRef(null);

  const GOOGLE_API_KEY = "AIzaSyDTzQotI9jT4hhPYu1Wp5xUUcDR2mpzf_4"; // Replace with your key

  // ✅ Automatically detect user’s location on mount
useEffect(() => {
  (async () => {
    try {
      setLoading(true);
      console.log("Requesting location permissions...");
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Please enable location services.");
        setLoading(false);
        return;
      }

      console.log("Fetching current location...");
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Highest,
        maximumAge: 10000,
        timeout: 20000,
      });

      console.log("Location fetched:", location.coords);
      const userLocation = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      setSelectedLocation(userLocation);
      mapRef.current?.animateToRegion({
        ...userLocation,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });

      await getAddressFromCoords(userLocation.latitude, userLocation.longitude);
    } catch (error) {
      console.error("Error fetching location:", error);
      Alert.alert(
        "Location Error",
        "Could not get your location. Using default location (Chennai)."
      );
      const fallback = { latitude: 13.0827, longitude: 80.2707 };
      setSelectedLocation(fallback);
      mapRef.current?.animateToRegion({
        ...fallback,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      await getAddressFromCoords(fallback.latitude, fallback.longitude);
    } finally {
      setLoading(false);
    }
  })();
}, []);


  // ✅ Convert coordinates to human-readable address
  const getAddressFromCoords = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();
      if (data.status === "OK" && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      }
    } catch (error) {
      console.error("Reverse geocode error:", error);
    }
  };

  // ✅ When user taps on map
  const handleMapPress = async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
    await getAddressFromCoords(latitude, longitude);
  };

  // ✅ When user searches for location name
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      Alert.alert("Enter a location to search.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery
        )}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const result = data.results[0];
        const { lat, lng } = result.geometry.location;
        const newLocation = { latitude: lat, longitude: lng };
        setSelectedLocation(newLocation);
        setAddress(result.formatted_address);
        mapRef.current.animateToRegion({
          ...newLocation,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });
      } else {
        Alert.alert("Location not found", "Try a different search term.");
      }
    } catch (error) {
      console.error("Search error:", error);
      Alert.alert("Error searching for location.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Confirm location
 // ✅ Confirm location dynamically
const handleConfirmLocation = () => {
  if (!selectedLocation) {
    Alert.alert("Please select a location on the map.");
    return;
  }

  if (!address) {
    Alert.alert("Error", "Unable to fetch address, please try again.");
    return;
  }

  // ✅ Get the previous screen name (who opened the map)
  const previousScreen = navigation.getState()?.routes?.slice(-2, -1)[0]?.name;

  // ✅ Return the address to the correct screen
  if (previousScreen === "RequestSurvey") {
    navigation.navigate("RequestSurvey", { selectedLocation: address });
  } else if (previousScreen === "ScheduleScreen") {
    navigation.navigate("ScheduleScreen", { selectedLocation: address });
  } else {
    navigation.goBack(); // fallback
  }
};


  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for a location..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <MapView
        ref={mapRef}
        style={styles.map}
        onPress={handleMapPress}
        initialRegion={{
          latitude: 13.0827,
          longitude: 80.2707,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {selectedLocation && <Marker coordinate={selectedLocation} />}
      </MapView>

      {/* Confirm Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button} onPress={handleConfirmLocation}>
          <Text style={styles.buttonText}>
            {loading ? "Loading..." : "Confirm Location"}
          </Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#c4c1c1ff",
    position: "absolute",
    top: 90,
    zIndex: 10,
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
    fontSize: 16,
  },
  searchButton: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 15,
    justifyContent: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
  searchButtonText: { color: "#fff", fontWeight: "600" },
  map: { flex: 1 },
  footer: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
  loadingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(255,255,255,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
});
