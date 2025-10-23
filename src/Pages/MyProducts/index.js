// Exemplo: src/Pages/NotificationListScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function MyProducts() {
  return (
    <View style={styles.container}>
      <Text>Esta é a tela de Meus Produtos!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
});
