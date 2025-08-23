import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const navigation = useNavigation();

  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // quando o componente monta, lê o nome salvo
    AsyncStorage.getItem("usuario").then((nome) => {
      if (nome) setUserName(nome);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.conteinerPesquisa}>
        <AntDesign name="search1" size={24} color="black" />
      </View>
      <View>
        {userName ? (
          <Text>Olá {userName}!</Text>
        ) : (
          <TouchableOpacity
            style={styles.Login}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.textRegister}>Login</Text>
          </TouchableOpacity>
        )}
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
  Login: {
    backgroundColor: "red",
  },
});
