import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const IndexScreen = () => {
  return (
    <View style={styles.container}>
      {/* Welcome Section */}
      <Text style={styles.title}>Welcome to LabXplore</Text>
      <Text style={styles.subtitle}>Discover Physics Through Virtual Experiments</Text>

      {/* Start Button */}
      <TouchableOpacity style={styles.startButton} onPress={() => alert('Start Now')}>
        <Text style={styles.startButtonText}>Start Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF8F9', // Light background color
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#006d77', // Dark teal color
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#006d77', // Dark teal color
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#ffb703', // Orange button color
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
  },
  startButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF', // White text on the button
  },
});

export default IndexScreen;
