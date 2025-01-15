import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import supabase from "../lib/supabase";

export default function Profile() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newDisplayName, setNewDisplayName] = useState("");
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) throw error;

      if (user) {
        setUserEmail(user.email || "");
        setNewEmail(user.email || "");
        setDisplayName(user.user_metadata.display_name || "");
        setNewDisplayName(user.user_metadata.display_name || "");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to load user data");
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      router.replace("/login");
    } catch (error) {
      Alert.alert("Error", "Failed to logout");
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (newEmail !== userEmail || newDisplayName !== displayName) {
      setShowPasswordModal(true);
    } else {
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setNewEmail(userEmail);
    setNewDisplayName(displayName);
  };

  const handleUpdateProfile = async () => {
    try {
      // First verify the password
      const {
        data: { user },
        error: signInError,
      } = await supabase.auth.signInWithPassword({
        email: userEmail,
        password: password,
      });

      if (signInError) {
        Alert.alert("Error", "Invalid password");
        return;
      }

      // Update email if changed
      if (newEmail !== userEmail) {
        const { error: updateEmailError } = await supabase.auth.updateUser({
          email: newEmail,
        });

        if (updateEmailError) throw updateEmailError;
      }

      // Update display name if changed
      if (newDisplayName !== displayName) {
        const { error: updateMetadataError } = await supabase.auth.updateUser({
          data: { display_name: newDisplayName },
        });

        if (updateMetadataError) throw updateMetadataError;
      }

      // Success
      setUserEmail(newEmail);
      setDisplayName(newDisplayName);
      setShowPasswordModal(false);
      setIsEditing(false);
      setPassword("");
      Alert.alert("Success", "Profile updated successfully");
    } catch (error: any) {
      Alert.alert("Error", error.message || "Failed to update profile");
    }
  };

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
            <View style={styles.avatarContainer}>
              <View style={styles.avatar}>
                <Image
                  source={require("../../assets/images/profile.png")}
                  style={styles.avatarImage}
                />
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.label}>Username:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={newDisplayName}
                  onChangeText={setNewDisplayName}
                  placeholder="Enter new username"
                />
              ) : (
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>{displayName}</Text>
                </View>
              )}

              <Text style={styles.label}>Email:</Text>
              {isEditing ? (
                <TextInput
                  style={styles.input}
                  value={newEmail}
                  onChangeText={setNewEmail}
                  placeholder="Enter new email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              ) : (
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>{userEmail}</Text>
                </View>
              )}

              {isEditing ? (
                <View style={styles.buttonGroup}>
                  <TouchableOpacity
                    style={[styles.editButton, { backgroundColor: "#FF4444" }]}
                    onPress={handleCancel}
                  >
                    <Text style={styles.buttonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.editButton}
                    onPress={handleSave}
                  >
                    <Text style={styles.buttonText}>Save</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity
                  style={styles.editButton}
                  onPress={handleEdit}
                >
                  <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
              )}

              <TouchableOpacity
                style={styles.logoutButton}
                activeOpacity={0.8}
                onPress={handleLogout}
              >
                <Text style={styles.buttonText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Password Confirmation Modal */}
        <Modal
          visible={showPasswordModal}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Confirm Password</Text>
              <Text style={styles.modalText}>
                Please enter your password to save changes
              </Text>
              <TextInput
                style={styles.passwordInput}
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                autoCapitalize="none"
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#FF4444" }]}
                  onPress={() => {
                    setShowPasswordModal(false);
                    setPassword("");
                  }}
                >
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.modalButton, { backgroundColor: "#FF8C00" }]}
                  onPress={handleUpdateProfile}
                >
                  <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

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
  input: {
    backgroundColor: "#FFF5E6",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: "#2D3436",
  },
  buttonGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginTop: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    width: "80%",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontFamily: "Montserrat-Bold",
    marginBottom: 10,
  },
  modalText: {
    fontSize: 14,
    fontFamily: "Montserrat-Medium",
    marginBottom: 20,
    textAlign: "center",
  },
  passwordInput: {
    backgroundColor: "#FFF5E6",
    borderRadius: 12,
    padding: 16,
    width: "100%",
    marginBottom: 20,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    gap: 10,
  },
  modalButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
});
