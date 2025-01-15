import React from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

const Login = () => {
  const handleLogin = () => {
    Alert.alert("Login button pressed");
  };

  const navigateToSignup = () => {
    Alert.alert("Navigate to Signup screen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#999"
          secureTextEntry={true}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <View style={styles.signupOption}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={navigateToSignup}>
            <Text style={styles.signupLink}>Sign up now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#87bba2",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  headerContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Montserrat-Bold",
    color: "#f0f7ee",
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
