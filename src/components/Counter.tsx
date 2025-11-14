import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CounterProps } from "../types/components/counter";

const Counter: React.FC<CounterProps> = ({
  min = 0,
  max = 10,
  step = 1,
  initialValue = 0,
  onValueChange = () => { },
  width = 120,
  height = 50
}) => {

  const [value, setValue] = useState(
    Math.min(Math.max(initialValue, min), max)
  );

  const handleDecrement = () => {
    if (value > min) {
      const newValue = value - step;
      setValue(newValue);
      onValueChange(newValue);
    }
  };

  const handleIncrement = () => {
    if (value < max) {
      const newValue = value + step;
      setValue(newValue);
      onValueChange(newValue);
    }
  };

  const disableMinus = value <= min;
  const disablePlus = value >= max;

  return (
    <View style={[styles.container, { width, height }]}>
      <TouchableOpacity
        onPress={handleDecrement}
        disabled={disableMinus}
        style={[styles.button, disableMinus && { opacity: 0.4 }]}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>-</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.valueContainer}>
        <Text style={styles.valueText}>{value}</Text>
      </View>

      <TouchableOpacity
        onPress={handleIncrement}
        disabled={disablePlus}
        style={[styles.button, disablePlus && { opacity: 0.4 }]}
      >
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
    backgroundColor: "#f5f5f5",
  },
  button: {
    width: 40,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "black",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 3,
    width: 25,
  },
  valueContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  valueText: {
    color: "black",
    fontSize: 18,
    fontWeight: "600",
  },
});
