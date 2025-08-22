import React from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";

export default function Header() {
  return (
    <View style={styles.container}>
      <TextInput></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 16,
    backgroundColor: "#6200ee",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
