import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper'; // ✅ Make sure this library is installed

const { width } = Dimensions.get('window'); // ✅ This defines 'width'

export default function ContourSurveyScreen({ navigation }) {
  return (
    <ScrollView style={styles.container}>

      {/* 🖼️ Image Slider */}
      <View style={styles.swiperContainer}>
        <Swiper
          autoplay
          autoplayTimeout={3}
          showsPagination
          dotColor="#ccc"
          activeDotColor="#0a74da"
        >
          <View style={styles.slide}>
            <Image
              source={require('../../../../assets/contour1.jpg')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.slide}>
            <Image
              source={require('../../../../assets/contour2.jpg')}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
        </Swiper>
      </View>

    <TouchableOpacity
      style={styles.button}
      onPress={() => navigation.navigate('ScheduleScreen')} // 👈 Add this line
    >
      <Text style={styles.buttonText}>Book Appointment</Text>
    </TouchableOpacity>
      <Text style={styles.content}>
      Contour Surveys map the elevation and shape of the land surface using contour lines. They show the terrain’s slope and undulations, helping in design, earthwork estimation, and landscape planning.
       Contour surveys are particularly useful for drainage systems, road alignment, and hill area developments.
      </Text>

      <View style={styles.reportCard}>
        <Text style={styles.reportTitle}>Survey Report</Text>
        <Text style={styles.reportText}>Download or view property survey reports here.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },

  swiperContainer: {
    height: 220,
    marginBottom: 40,
    borderRadius: 10,
    marginTop: 15,
    overflow: 'hidden',
  },

  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  image: {
    width: width - 40, // ✅ now 'width' is defined above
    height: 220,
    borderRadius: 10,
  },

  button: {
    backgroundColor: '#0a74da',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 30,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  content: {
    fontSize: 16,
    color: '#333',
    lineHeight: 22,
    marginBottom: 20,
  },

  reportCard: {
    backgroundColor: '#f1f3f6',
    padding: 15,
    borderRadius: 10,
  },

  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0a74da',
    marginBottom: 5,
  },

  reportText: {
    fontSize: 14,
    color: '#333',
  },
});
