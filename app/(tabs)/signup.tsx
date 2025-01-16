import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import supabase from "../lib/supabase";
import { useState } from "react";
import { AuthError } from "@supabase/supabase-js";

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigateToLogin = () => {
    router.push("/login"); // Navigasi ke halaman login
  };

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
  
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
        options: {
          data: {
            display_name: username,
          },
        },
      });
  
      if (error) throw error;
  
      if (data.user) {
        const { data: signInData, error: signInError } =
          await supabase.auth.signInWithPassword({
            email: email,
            password: password,
          });
  
        if (signInError) throw signInError;
  
        // Reset form
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        
        Alert.alert("Success", "Registration successful!");
        router.replace("/landing");
      }
    } catch (error) {
      if (error instanceof AuthError) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    }
  };

  return (
    <LinearGradient colors={["#87bba2", "#f0f7ee"]} style={styles.container}>
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
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#999"
          value={username} // Tambahkan ini
          onChangeText={setUsername} // Tambahkan ini
        />

        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          placeholderTextColor="#999"
          value={email} // Tambahkan ini
          onChangeText={setEmail} // Tambahkan ini
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password} // Tambahkan ini
          onChangeText={setPassword} // Tambahkan ini
        />

        <Text style={styles.label}>Password Confirmation:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password confirmation"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={confirmPassword} // Tambahkan ini
          onChangeText={setConfirmPassword} // Tambahkan ini
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={styles.signupOption}>
          <Text style={styles.signupText}>Sudah punya akun? </Text>
          <TouchableOpacity onPress={navigateToLogin}>
            <Text style={styles.signupLink}>Masuk Sekarang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
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
  loginContainer: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  label: {
    fontFamily: "Montserrat-Bold",
    marginBottom: 5,
    color: "#2c3e50",
  },
  input: {
    width: "100%",
    padding: 12,
    marginBottom: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#f39c12",
    fontSize: 16,
    backgroundColor: "#f9f9f9",
    fontFamily: "Montserrat-Regular",
  },
  button: {
    backgroundColor: "#f39c12",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Montserrat-Bold",
    fontSize: 16,
  },
  signupOption: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 12,
    color: "#000",
    fontFamily: "Montserrat-Regular",
  },
  signupLink: {
    fontSize: 12,
    color: "#f39c12",
    textDecorationLine: "underline",
    fontFamily: "Montserrat-Bold",
  },
});

export default Signup;
