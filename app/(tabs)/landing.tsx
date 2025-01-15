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
import { useRouter } from "expo-router";
import { useEffect } from "react";
import supabase from "../lib/supabase";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) {
      router.replace("/login");
    }
  };

  return (
    <LinearGradient colors={["#87bba2", "#f0f7ee"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
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
        <View style={styles.contentSection}>
          {/* Online Learning Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/calculator")} 
          >
            <Image
              source={require("../../assets/images/calc.png")}
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
          </TouchableOpacity>

          {/* Study Material Card */}
          <TouchableOpacity
            style={styles.card}
            onPress={() => router.push("/material")} 
          >
            <Image
              source={require("../../assets/images/exe.png")}
              style={styles.cardImage}
              resizeMode="contain"
            />
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>Study Material</Text>
              <Text style={styles.cardDescription}>
                Access comprehensive study materials and resources
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <View style={styles.navigationBar}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/calculator")}
        >
          <Image
            source={require("../../assets/images/calculator.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Calculator</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/material")}
        >
          <Image
            source={require("../../assets/images/material.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Material</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/landing")}
        >
          <Image
            source={require("../../assets/images/home.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/profile")}
        >
          <Image
            source={require("../../assets/images/profile.png")}
            style={styles.navIcon}
          />
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
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
  contentSection: {
    padding: 50,
    flex: 1,
    marginTop: 75,
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
