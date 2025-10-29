import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { height, width, font } from "../../utils/responsive";
const useTotalUnreadChats = () => {
  return 3; 
};

export default function DrawerNotificationLabel({ label, color, focused }) {
  const count = useTotalUnreadChats();
  const hasNotifications = count > 0;

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: color,
          fontSize: font(2.5),
          marginLeft: width(0),
          fontWeight: focused ? "600" : "600",
        }}
      >
        {label}
      </Text>

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
  },
  badge: {
    marginLeft: width(10),
    backgroundColor: "#FF6347",
    borderRadius: 15,
    minWidth: width(7),
    height: height(3.25),
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: width(2),
  },
  badgeText: {
    color: "white",
    fontSize: font(2),
    fontWeight: "bold",
  },
});