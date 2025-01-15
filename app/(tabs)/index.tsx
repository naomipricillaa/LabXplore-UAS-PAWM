import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Index() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Orange Section with Gradient */}
        <LinearGradient
          colors={["#FFB347", "#FFD580"]}
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
              onPress={() => router.push("/auth")}
              activeOpacity={0.8}
            >
              <Text style={styles.loginButtonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.registerButton}
              onPress={() => router.push("/register")}
              activeOpacity={0.8}
            >
              <Text style={styles.registerButtonText}>Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
    backgroundColor: 'transparent',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
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
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    lineHeight: 36,
    // Text shadow for better contrast
    textShadowColor: "rgba(0, 0, 0, 0.1)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 4,
  },
  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
    // Shadow for image
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  illustration: {
    width: Dimensions.get("window").width * 0.9,
    height: Dimensions.get("window").width * 1.1,
  },
  description: {
    fontSize: 18,
    fontFamily: "Montserrat-Medium",
    color: "#2D3436",
    textAlign: "center",
    lineHeight: 28,
    marginBottom: 16,
  },
  subDescription: {
    fontSize: 16,
    fontFamily: "Montserrat-Regular",
    color: "#636E72",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  highlightText: {
    fontFamily: "Montserrat-Bold",
    color: "#FF8C00",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 16,
  },
  loginButton: {
    flex: 1,
    backgroundColor: "#FF8C00",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    // Shadow for login button
    shadowColor: "#FF8C00",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  registerButton: {
    flex: 1,
    backgroundColor: "#FFF5E6",
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#FFE0B2",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
  registerButtonText: {
    color: "#FF8C00",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
  },
});
