import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.logoText}>PhysiLab</Text>
        </View>
      </View>

      {/* Content */}
      <View style={styles.contentContainer}>
        <View style={styles.textContent}>
          <Text style={styles.title}>
            Explore Physics Virtually, Understand Thermodynamics Clearly
          </Text>
          <Text style={styles.description}>
            PhysiLab is an interactive platform that allows you to explore
            thermodynamics concepts through virtual simulations. Understand the
            ideal gas law and calculate gas pressure as you observe how
            temperature affects thermodynamic systems.
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => router.push("/login")}
          >
            <Text style={styles.buttonText}>Start Learning!</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.imageContent}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 16,
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  logoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 40,
    height: 40,
  },
  logoText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 24,
    marginLeft: 8,
  },
  contentContainer: {
    padding: 20,
    flex: 1,
  },
  textContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },
  title: {
    fontFamily: "Montserrat-Bold",
    fontSize: 28,
    textAlign: "center",
    marginBottom: 16,
  },
  description: {
    fontFamily: "Montserrat-Regular",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#F39C12",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 25,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontFamily: "Montserrat-Bold",
    color: "#fff",
    fontSize: 18,
  },
  imageContent: {
    flex: 1,
    alignItems: "center",
  },
  illustration: {
    width: Dimensions.get("window").width * 0.8,
    height: 300,
  },
});
