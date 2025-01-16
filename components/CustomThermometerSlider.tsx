import React, { useCallback, useRef } from "react";
import Slider from "@react-native-community/slider";
import { View, Text, StyleSheet, Image, Platform } from "react-native";

interface CustomThermometerSliderProps {
  value: number;
  onValueChange: (value: number) => void;
  onSlidingComplete: (value: number) => void;
}

const CustomThermometerSlider: React.FC<CustomThermometerSliderProps> = ({
  value,
  onValueChange,
  onSlidingComplete,
}) => {
  const isSliding = useRef(false);
  const lastValidValue = useRef(value);

  const safeValue = Math.max(273, Math.min(373, value));

  const handleValueChange = useCallback(
    (newValue: number) => {
      const validValue = Math.round(newValue);
      if (isSliding.current) {
        lastValidValue.current = validValue;
        onValueChange(validValue);
      }
    },
    [onValueChange]
  );

  const handleSlidingStart = useCallback(() => {
    isSliding.current = true;
    lastValidValue.current = safeValue;
  }, [safeValue]);

  const handleSlidingComplete = useCallback(
    (newValue: number) => {
      const validValue = Math.round(newValue);
      isSliding.current = false;
      lastValidValue.current = validValue;
      onSlidingComplete(validValue);
    },
    [onSlidingComplete]
  );

  // Generate graduation marks with 5K intervals
  const graduations = Array.from({ length: 21 }).map((_, index) => {
    const temperature = 273 + index * 5;
    const isMainMark = index % 10 === 0; // Every 50K
    const isMediumMark = index % 2 === 0; // Every 10K

    return (
      <View key={index} style={styles.graduationWrapper}>
        <View
          style={[
            styles.graduation,
            isMediumMark && styles.mediumGraduation,
            isMainMark && styles.largeGraduation,
          ]}
        />
        {isMainMark && (
          <Text style={styles.graduationLabel}>{temperature}K</Text>
        )}
      </View>
    );
  });

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/thermometer.png")}
        style={styles.thermometerImage}
        resizeMode="contain"
      />
      <View style={styles.sliderContainer}>
        <View style={styles.trackContainer}>
          <View style={styles.customTrackBackground} />
          <Slider
            style={styles.slider}
            minimumValue={273}
            maximumValue={373}
            value={safeValue}
            onValueChange={handleValueChange}
            onSlidingStart={handleSlidingStart}
            onSlidingComplete={handleSlidingComplete}
            minimumTrackTintColor="#FF4B4B"
            maximumTrackTintColor="#E0E0E0"
            thumbTintColor="#FF8C00"
            step={1}
          />
          <View style={styles.graduationContainer}>{graduations}</View>
        </View>
      </View>
      <Text style={styles.valueText}>{Math.round(safeValue)}K</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  thermometerImage: {
    width: 80,
    height: 80,
    marginBottom: 30,
  },
  sliderContainer: {
    width: "100%",
    paddingHorizontal: 10,
  },
  trackContainer: {
    position: "relative",
    height: 80,
  },
  customTrackBackground: {
    position: "absolute",
    width: "100%",
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
    top: "50%",
    marginTop: -2,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  graduationContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  graduationWrapper: {
    alignItems: "center",
  },
  graduation: {
    width: 1,
    height: 5,
    backgroundColor: "#BDBDBD",
  },
  mediumGraduation: {
    height: 8,
    width: 1.5,
  },
  largeGraduation: {
    height: 12,
    width: 2,
    backgroundColor: "#757575",
  },
  graduationLabel: {
    fontSize: 10,
    color: "#666",
    marginTop: 4,
  },
  valueText: {
    fontSize: 32,
    color: "#FF8C00",
    fontWeight: "bold",
    marginTop: 20,
  },
});

export default CustomThermometerSlider;
