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

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState(""); // Ubah dari username ke email
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigateToSignup = () => {
    router.push("/signup");
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
  
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
  
      if (error) {
        Alert.alert("Error", "Invalid email or password");
        return;
      }
  
      if (data.user) {
        // Reset form
        setEmail("");
        setPassword("");
        router.replace("/landing");
      }
    } catch (error) {
      if (error instanceof AuthError) {
        Alert.alert("Error", error.message);
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    } finally {
      setLoading(false);
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
        <Text style={styles.label}>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          editable={!loading}
          autoCapitalize="none"
          keyboardType="email-address" // Tambahkan ini untuk keyboard email
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
          editable={!loading}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupOption}>
          <Text style={styles.signupText}>Belum punya akun? </Text>
          <TouchableOpacity onPress={navigateToSignup}>
            <Text style={styles.signupLink}>Daftar Sekarang</Text>
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

export default Login;
