import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

export default function Profile() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <LinearGradient
        colors={["#87bba2", "#f0f7ee"]}
        style={styles.container}
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
        <View style={styles.content}>
          <View style={styles.profileCard}>
            {/* Profile Icon */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Image
                  source={require("../../assets/images/profile.png")}
                  style={styles.avatarImage}
                />
              </View>
            </View>

            {/* Profile Information */}
            <View style={styles.infoSection}>
              <Text style={styles.label}>Username:</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>Mickyv65</Text>
              </View>

              <Text style={styles.label}>Email:</Text>
              <View style={styles.infoContainer}>
                <Text style={styles.infoText}>mickyvalentino65@gmail.com</Text>
              </View>

              {/* Buttons */}
              <TouchableOpacity style={styles.editButton} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Edit Profile</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.logoutButton} activeOpacity={0.8}>
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  gradient: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    marginTop: 150,
  },
  profileCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarImage: {
    width: 60,
    height: 60,
    tintColor: "#000",
  },
  infoSection: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: "#2D3436",
    marginBottom: 4,
  },
  infoContainer: {
    backgroundColor: "#FFF5E6",
    borderRadius: 12,
    padding: 16,
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "#2D3436",
  },
  editButton: {
    backgroundColor: "#FF8C00",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#FF8C00",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  logoutButton: {
    backgroundColor: "#FF8C00",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#FF8C00",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
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
