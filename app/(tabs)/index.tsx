import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const IndexScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Orange Section with Gradient */}
        <LinearGradient
          colors={["#87bba2", "#f0f7ee"]}
          style={styles.orangeSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.headerContainer}>
            <View style={styles.headerContent}>
              <Image
                source={require("../../assets/images/icon.png")}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.headerTitle}>PhysiLab</Text>
            </View>
          </View>

          {/* Title with subtle shadow */}
          <View style={styles.titleContainer}>
            <Text style={styles.title}>
              Explore Physics Virtually,{"\n"}Understand Thermodynamics Clearly
            </Text>
          </View>

          {/* Main Image with shadow */}
          <View style={styles.imageContainer}>
            <Image
              source={require("../../assets/images/orang.png")}
              style={styles.illustration}
              resizeMode="contain"
            />
          </View>
        </LinearGradient>

        {/* White Section with Shadow */}
        <View style={styles.whiteSection}>
          {/* Description */}
          <Text style={styles.description}>
            <Text style={styles.highlightText}>PhysiLab</Text> is an interactive
            platform that allows you to explore thermodynamics concepts through
            virtual simulations.
          </Text>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => router.push("/login")}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push("/signup")}
              activeOpacity={0.8}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFB347",
  },
  headerContainer: {
    position: "absolute",
    top: 40,
    left: 5,
    right: 0,
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "transparent",
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Montserrat-Bold",
    color: "#ffffff",
    marginLeft: 8,
  },
  logo: {
    width: 42,
    height: 42,
    tintColor: "#fff",
  },
  scrollContent: {
    flexGrow: 1,
  },
  orangeSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  whiteSection: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 40,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: -80,
    // Shadow for white section
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  titleContainer: {
    marginTop: 87,
    marginBottom: 20,
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
