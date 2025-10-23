import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// 🚨 SIMULAÇÃO: Hook para simular a contagem de chats não lidos.
// Você deve substituir isso pela sua lógica real (fetch/socket ao backend)
const useTotalUnreadChats = () => {
  // Retorna um número fixo (ex: 3) ou 0 para fins de teste
  return 3;
};

export default function DrawerNotificationLabel({ label }) {
  const count = useTotalUnreadChats();
  const hasNotifications = count > 0;

  return (
    <View style={styles.container}>
      <Text style={[styles.label, hasNotifications && styles.labelActive]}>
        {label}
      </Text>

      {/* Badge (Contagem) */}
      {hasNotifications && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{count > 99 ? "99+" : count}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingRight: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: "normal",
    color: "#333",
  },
  labelActive: {
    fontWeight: "bold",
    color: "#05419A",
  },
  badge: {
    marginLeft: 10,
    backgroundColor: "#FF6347",
    borderRadius: 15,
    minWidth: 26,
    height: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
