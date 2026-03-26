import React, { useState } from "react";
import { View, Text, TextInput, Picker, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ConverterScreen = () => {
  const [input, setInput] = useState("");
  const [unit, setUnit] = useState("m-to-ft");

  const convert = () => {
    const value = parseFloat(input);
    if (isNaN(value)) return "";
    switch (unit) {
      case "m-to-ft": return (value * 3.28084).toFixed(2);
      case "ft-to-m": return (value / 3.28084).toFixed(2);
      case "acre-to-sqft": return (value * 43560).toFixed(2);
      default: return "";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Unit Converter</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter value"
        keyboardType="numeric"
        value={input}
        onChangeText={setInput}
      />

      <Picker selectedValue={unit} onValueChange={(itemValue) => setUnit(itemValue)}>
        <Picker.Item label="Meters to Feet" value="m-to-ft" />
        <Picker.Item label="Feet to Meters" value="ft-to-m" />
        <Picker.Item label="Acres to Sq.Feet" value="acre-to-sqft" />
      </Picker>

      <Text style={styles.result}>Result: {convert()}</Text>
    </SafeAreaView>
  );
};

export default ConverterScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20 },
  title: { fontSize: 22, fontWeight: "bold", textAlign: "center", marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  result: { fontSize: 18, marginTop: 20, textAlign: "center", fontWeight: "bold" },
});
