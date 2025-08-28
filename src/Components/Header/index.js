import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header() {
  const navigation = useNavigation();

  const [userName, setUserName] = useState(null);

  useEffect(() => {
    // quando o componente monta, lê o nome salvo
    AsyncStorage.getItem("user").then((name) => {
      if (name) setUserName(name);
    });
  }, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.menu}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Feather name="menu" size={36} color="white" />
      </TouchableOpacity>

      <View style={styles.conteinerPesquisa}>
        <TextInput style={styles.searchInput} placeholder="Pesquisa..." />
        <AntDesign name="search1" size={24} color="black" />
      </View>
      <View>
        {!userName && (
          <TouchableOpacity
            style={styles.Login}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={styles.textRegister}>Login</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.cart}>
        <TouchableOpacity
          // style={styles.Login}
          onPress={() => navigation.navigate("Cart")}
        >
          <AntDesign name="shoppingcart" size={24} color="#05419A" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: "11%",
    width: "100%",
    padding: 8,
    backgroundColor: "#05419A",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  conteinerPesquisa: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    // width: "40%",
    backgroundColor: "white",
    borderRadius: 25,
    paddingRight: 6,
    paddingLeft: 6,
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
  userName: {
    color: "white",
    fontSize: 16,
  },
  searchInput: {
    fontSize: 12,
  },
  cart: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    backgroundColor: "white",
    // borderWidth: 3,
    // borderColor: "#fff",
    borderRadius: 100,
  },
});
