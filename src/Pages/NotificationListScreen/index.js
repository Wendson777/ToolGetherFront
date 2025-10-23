// Exemplo: src/Pages/NotificationListScreen.js
import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function NotificationListScreen() {
  return (
    <View style={styles.container}>
      <Text>Esta é a tela de Chats e Solicitações!</Text>
      <Text>Aqui você verá todas as conversas ativas.</Text>
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
