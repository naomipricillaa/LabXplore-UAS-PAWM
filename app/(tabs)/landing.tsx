import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Landing() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Main Content Section */}
        <View style={styles.contentSection}>
          {/* Online Learning Card */}
          <View style={styles.card}>
            <Image
              source={require("../../assets/images/online-learning.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Online Learning</Text>
              <Text style={styles.cardDescription}>
                Learn physics through interactive online classes and virtual
                simulations
              </Text>
            </View>
          </View>

          {/* Study Material Card */}
          <View style={styles.card}>
            <Image
              source={require("../../assets/images/study-material.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Study Material</Text>
              <Text style={styles.cardDescription}>
                Access comprehensive study materials and resources
              </Text>
            </View>
          </View>
        </View>

        {/* Bottom Navigation Bar */}
        <View style={styles.navigationBar}>
          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require("../../assets/icons/calculator.png")}
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Calculator</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require("../../assets/icons/material.png")}
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Material</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require("../../assets/icons/home.png")}
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.navItem}>
            <Image
              source={require("../../assets/icons/profile.png")}
              style={styles.navIcon}
            />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    flexGrow: 1,
  },
  contentSection: {
    padding: 20,
    flex: 1,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 200,
    marginBottom: 16,
  },
  cardContent: {
    alignItems: "center",
  },
  cardTitle: {
    fontSize: 20,
    fontFamily: "Montserrat-Bold",
    color: "#2D3436",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#636E72",
    textAlign: "center",
    lineHeight: 24,
  },
  navigationBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#004D40",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  navItem: {
    alignItems: "center",
    flex: 1,
  },
  navIcon: {
    width: 24,
    height: 24,
    tintColor: "#FFFFFF",
    marginBottom: 4,
  },
  navText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontFamily: "Montserrat-Medium",
  },
});
