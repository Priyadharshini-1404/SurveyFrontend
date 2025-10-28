// src/screens/Auth/SplashScreen.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Login from './LoginScreen';

export default function SplashScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* App Logo */}
      <Text style={styles.title}>Rockfort Engineering</Text>

      <Image
        source={require('../../../assets/images/Splash.png')} // your logo path
        style={styles.logo}
      />

      {/* App Name / Tagline */}
      <Text style={styles.content}>
        Welcome to Rockfort Surveys! Submit and track your surveys seamlessly.We would like to introduce ourselves, with dignity and pride, as one of the experienced Survey consultant firms in Chennai, India. We are engaged in the trade of providing a comprehensive range of surveying services, using Digital Instrument and modern technologies to produce well-presented and accurate data.
      </Text>

      {/* Get Started Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.replace('MainApp')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 30,
    marginTop:30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    rowGap:20,
  },
  content: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#0a74da',
    paddingVertical: 14,
    paddingHorizontal: 60,
    borderRadius: 30,
    elevation: 3, // shadow for android
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
