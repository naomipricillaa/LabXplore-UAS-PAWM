import {
  StyleSheet,
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { useRouter, useFocusEffect } from "expo-router";
import { useEffect, useState, useCallback, useRef } from "react";
import Slider from "@react-native-community/slider";
import supabase from "../lib/supabase";
import CustomThermometerSlider from "../../components/CustomThermometerSlider";

// Default values and constants
const DEFAULT_VALUES = {
  volume: "5",
  mol: "5",
  temperature: "300",
  sliderValue: 300,
};

const MIN_TEMPERATURE = 273;
const MAX_TEMPERATURE = 373;

interface HistoryItem {
  id: string;
  volume: string;
  mol: string;
  temperature: string;
  pressure: string;
  created_at: string;
}

export default function Calculator() {
  const router = useRouter();
  const [volume, setVolume] = useState<string>(DEFAULT_VALUES.volume);
  const [mol, setMol] = useState<string>(DEFAULT_VALUES.mol);
  const [temperature, setTemperature] = useState<string>(
    DEFAULT_VALUES.temperature
  );
  const [sliderValue, setSliderValue] = useState<number>(
    DEFAULT_VALUES.sliderValue
  );
  const [pressure, setPressure] = useState<string>("0");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  const resetToDefaults = useCallback(() => {
    setVolume(DEFAULT_VALUES.volume);
    setMol(DEFAULT_VALUES.mol);
    setTemperature(DEFAULT_VALUES.temperature);
    setSliderValue(DEFAULT_VALUES.sliderValue);
    setPressure("0");
  }, []);

  const checkSession = async () => {
    try {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) throw error;

      if (!session) {
        // No valid session, redirect to login
        router.replace("/login");
        return false;
      }

      // Update userId if it's different
      if (session.user.id !== userId) {
        setUserId(session.user.id);
        return true;
      }

      return true;
    } catch (error) {
      console.error("Session check error:", error);
      router.replace("/login");
      return false;
    }
  };

  const fetchHistory = async () => {
    try {
      const isSessionValid = await checkSession();
      if (!isSessionValid) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { data, error } = await supabase
        .from("calculation_history")
        .select("*")
        .eq("user_id", session.user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setHistory(data || []);
    } catch (error) {
      console.error("Error fetching history:", error);
      Alert.alert("Error", "Failed to fetch calculation history");
    }
  };

  useEffect(() => {
    const setupComponent = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) throw error;

        if (!session) {
          resetToDefaults();
          router.replace("/login");
          return;
        }

        // Reset inputs when user ID changes or component mounts
        if (session.user.id !== userId) {
          setUserId(session.user.id);
          resetToDefaults();
          fetchHistory();
        }
      } catch (error) {
        console.error("Session check error:", error);
        resetToDefaults();
        router.replace("/login");
      }
    };

    setupComponent();

    // Modified auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "SIGNED_IN") {
        if (session?.user.id) {
          setUserId(session.user.id);
          resetToDefaults(); // Reset inputs on new sign in
          fetchHistory();
        }
      } else if (event === "SIGNED_OUT") {
        setUserId(null);
        setHistory([]);
        resetToDefaults(); // Reset inputs on sign out
        router.replace("/login");
      }
    });

    return () => {
      subscription.unsubscribe();
      resetToDefaults();
      setHistory([]);
    };
  }, []);

  // Replace router.addListener with useFocusEffect
  useFocusEffect(
    useCallback(() => {
      const checkAndReset = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (!session) {
          resetToDefaults();
          router.replace("/login");
        }
      };
      checkAndReset();
      return () => {
        // Clean up ketika screen loses focus
        resetToDefaults();
      };
    }, [])
  );

  const saveCalculation = async (
    volume: number,
    mol: number,
    temperature: number,
    pressure: number
  ) => {
    try {
      const isSessionValid = await checkSession();
      if (!isSessionValid) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await supabase.from("calculation_history").insert({
        user_id: session.user.id,
        volume,
        mol,
        temperature,
        pressure,
      });

      if (error) throw error;

      // Refresh history after saving
      fetchHistory();
    } catch (error) {
      console.error("Error saving calculation:", error);
      Alert.alert("Error", "Failed to save calculation");
    }
  };

  const handleSliderChange = useCallback((value: number) => {
    setSliderValue(value);
  }, []);

  const handleSlidingComplete = useCallback((value: number) => {
    setTemperature(Math.round(value).toString());
  }, []);

  const calculatePressure = useCallback(async () => {
    const isSessionValid = await checkSession();
    if (!isSessionValid) return;

    const n = parseFloat(mol);
    const T = parseFloat(temperature);
    const V = parseFloat(volume);
    const R = 8.314472;

    if (isNaN(n) || isNaN(T) || isNaN(V) || n <= 0 || T <= 0 || V <= 0) {
      setPressure("Invalid input");
      return;
    }

    const pressureValue = (n * R * T) / V;
    const result = pressureValue.toFixed(2);
    setPressure(result);

    await saveCalculation(V, n, T, parseFloat(result));
  }, [mol, temperature, volume]);

  const clearHistory = useCallback(async () => {
    try {
      const isSessionValid = await checkSession();
      if (!isSessionValid) return;

      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) return;

      const { error } = await supabase
        .from("calculation_history")
        .delete()
        .eq("user_id", session.user.id);

      if (error) throw error;

      setHistory([]);
    } catch (error) {
      console.error("Error clearing history:", error);
      Alert.alert("Error", "Failed to clear history");
    }
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContent}>
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

        <View style={styles.calculatorContainer}>
          <Text style={styles.calculatorTitle}>
            Thermodynamics Virtual Lab Calculator
          </Text>

          <View style={styles.thermometerContainer}>
            <CustomThermometerSlider
              value={sliderValue}
              onValueChange={handleSliderChange}
              onSlidingComplete={handleSlidingComplete}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Volume (m³):</Text>
            <TextInput
              style={styles.input}
              value={volume}
              onChangeText={setVolume}
              keyboardType="numeric"
              placeholder="Masukkan volume dalam m³"
            />

            <Text style={styles.inputLabel}>Jumlah Mol (mol):</Text>
            <TextInput
              style={styles.input}
              value={mol}
              onChangeText={setMol}
              keyboardType="numeric"
              placeholder="Masukkan jumlah mol"
            />

            <Text style={styles.inputLabel}>Suhu (K):</Text>
            <TextInput
              style={styles.input}
              value={temperature}
              onChangeText={setTemperature}
              keyboardType="numeric"
              placeholder="Masukkan suhu dalam K"
            />

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.calculateButton}
                onPress={calculatePressure}
              >
                <Text style={styles.calculateButtonText}>Hitung Tekanan</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.resetButton}
                onPress={resetToDefaults}
              >
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>Hasil Perhitungan</Text>
            <Text style={styles.resultValue}>{pressure} PA</Text>
          </View>

          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>History Perhitungan</Text>
            <View style={styles.historyTable}>
              <View style={styles.historyHeader}>
                <Text style={styles.historyHeaderText}>Volume</Text>
                <Text style={styles.historyHeaderText}>Jumlah Mol</Text>
                <Text style={styles.historyHeaderText}>Suhu</Text>
                <Text style={styles.historyHeaderText}>Tekanan Gas</Text>
              </View>
              <ScrollView style={{ maxHeight: 200 }}>
                {history.map((item) => (
                  <View key={item.id} style={styles.historyRow}>
                    <Text style={styles.historyCell}>{item.volume}</Text>
                    <Text style={styles.historyCell}>{item.mol}</Text>
                    <Text style={styles.historyCell}>{item.temperature}</Text>
                    <Text style={styles.historyCell}>{item.pressure}</Text>
                  </View>
                ))}
              </ScrollView>
            </View>
            <TouchableOpacity
              style={styles.clearHistoryButton}
              onPress={clearHistory}
            >
              <Text style={styles.clearHistoryButtonText}>Clear History</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  scrollContent: {
    flex: 1,
  },
  headerContainer: {
    marginTop: 40,
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
    color: "#87bba2",
    marginLeft: 8,
  },
  logo: {
    width: 42,
    height: 42,
    tintColor: "#87bba2",
  },
  calculatorContainer: {
    padding: 20,
  },
  calculatorTitle: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: "#FF8C00",
    marginBottom: 10,
    marginTop: 18,
    textAlign: "center",
  },
  thermometerContainer: {
    alignItems: "center",
    marginVertical: 50,
  },
  thermometerImage: {
    width: 150,
    height: 160,
  },
  slider: {
    width: "80%",
    height: 40,
    marginVertical: 10,
  },
  temperatureText: {
    fontSize: 16,
    fontFamily: "Montserrat-Bold",
    color: "#FF8C00",
  },
  inputContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
  },
  inputLabel: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 15,
    fontFamily: "Montserrat-Bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#FF8C00",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  calculateButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
  },
  resultContainer: {
    backgroundColor: "#FF8C00",
    borderRadius: 10,
    padding: 20,
    marginVertical: 30,
    alignItems: "center",
  },
  resultTitle: {
    color: "white",
    fontSize: 16,
    marginBottom: 10,
    fontFamily: "Montserrat-Bold",
  },
  resultValue: {
    color: "white",
    fontSize: 14,
    fontFamily: "Montserrat-Regular",
  },
  historyContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginTop: 10,
  },
  historyTitle: {
    fontSize: 16,
    color: "#333",
    marginBottom: 10,
    fontFamily: "Montserrat-Bold",
    textAlign: "center",
  },
  historyTable: {
    marginTop: 10,
  },
  historyHeader: {
    flexDirection: "row",
    backgroundColor: "#FF8C00",
    padding: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  historyHeaderText: {
    flex: 1,
    color: "white",
    fontFamily: "Montserrat-Bold",
    fontSize: 11,
    textAlign: "center",
  },
  historyRow: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
  },
  historyCell: {
    flex: 1,
    fontSize: 11,
    textAlign: "center",
    fontFamily: "Montserrat-Regular",
  },
  clearHistoryButton: {
    backgroundColor: "#FF8C00",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  clearHistoryButtonText: {
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
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    gap: 10,
  },
  calculateButton: {
    backgroundColor: "#FF8C00",
    padding: 15,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },
  resetButton: {
    backgroundColor: "#6c757d",
    padding: 15,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },
  resetButtonText: {
    color: "white",
    fontSize: 14,
    fontFamily: "Montserrat-Bold",
  },
});
