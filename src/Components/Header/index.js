import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { height, width, font } from "../../utils/responsive";
import { Ionicons } from "@expo/vector-icons";

export default function Header({ navigation, showBackButton = false }) {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("user").then((name) => {
      if (name) setUserName(name);
    });
  }, []);

  const leftButton = showBackButton ? (
    <TouchableOpacity
      style={styles.menu}
      onPress={() => navigation && navigation.goBack()}
    >
      <Ionicons name="arrow-back" size={30} color="white" />
    </TouchableOpacity>
  ) : (
    <TouchableOpacity
      style={styles.menu}
      onPress={() =>
        navigation && navigation.dispatch(DrawerActions.toggleDrawer())
      }
    >
      <Feather name="menu" size={font(4.5)} color="white" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {leftButton}

      <View style={styles.conteinerPesquisa}>
        <TextInput
          style={styles.searchInput}
          placeholder="Pesquisa..."
          placeholderTextColor="#999"
        />
        <Feather name="search" size={font(2.5)} color="#05419A" />
      </View>

      <View style={styles.loginContainer}>
        {!userName && (
          <TouchableOpacity
            style={styles.LoginButtonIcon}
            onPress={() => navigation && navigation.navigate("Login")}
          >
            <Feather name="user" size={font(4)} color="#fff" />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cart}>
        <TouchableOpacity
          onPress={() => navigation && navigation.navigate("Cart")}
        >
          <AntDesign name="star" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: height(12),
    width: width(100),
    paddingTop: width(2),
    paddingHorizontal: width(2),
    paddingBottom: height(1.75),
    backgroundColor: "#05419A",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  menu: {
    height: height(4.5),
    width: width(9),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#05419A",
  },
  conteinerPesquisa: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 0.8,
    marginLeft: width(2),
    marginRight: width(2),
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: font(3),
    paddingRight: width(2),
    paddingLeft: width(2),
    height: height(4.5),
  },
  loginContainer: {
    height: height(4.5),
    fontSize: font(2),
    justifyContent: "center",
  },
  LoginButtonIcon: {
    alignItems: "center",
    justifyContent: "center",
    width: width(9),
    height: height(4.5),
  },
  userName: {
    color: "white",
    fontSize: font(2),
  },
  searchInput: {
    fontSize: font(2),
    flex: 1,
    height: height(4),
    paddingVertical: 0,
  },
  cart: {
    height: height(4.5),
    alignItems: "center",
    justifyContent: "center",
    width: width(9),
    marginRight: width(2),
  },
});
