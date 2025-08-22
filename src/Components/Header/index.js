import React from "react";
import { View, Text, StyleSheet } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

export default function Header() {
  return (
    <View style={styles.container}>
      <View style={styles.conteinerPesquisa}>
        <AntDesign name="search1" size={24} color="black" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "11%",
    width: "100%",
    padding: 12,
    backgroundColor: "#05419A",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  conteinerPesquisa: {
    alignItems: "flex-end",
    width: "40%",
    backgroundColor: "white",
    borderRadius: 25,
    padding: 4,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
