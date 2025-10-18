import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Dimensions, // Importado para ajudar a centralizar
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { DrawerActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width } = Dimensions.get("window");

// Recebe 'navigation' e 'showBackButton' via props
export default function Header({ navigation, showBackButton = false }) {
  const [userName, setUserName] = useState(null);

  useEffect(() => {
    AsyncStorage.getItem("user").then((name) => {
      if (name) setUserName(name);
    });
  }, []);

  // Determina o conteúdo do botão do canto esquerdo
  const leftButton = showBackButton ? (
    // Se for a tela de detalhes, exibe o botão de voltar
    <TouchableOpacity
      style={styles.menu}
      onPress={() => navigation && navigation.goBack()}
    >
      <AntDesign name="arrowleft" size={36} color="white" />
    </TouchableOpacity>
  ) : (
    // Senão, exibe o botão de menu lateral
    <TouchableOpacity
      style={styles.menu}
      onPress={() =>
        navigation && navigation.dispatch(DrawerActions.toggleDrawer())
      }
    >
      <Feather name="menu" size={36} color="white" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {leftButton}

      <View style={styles.conteinerPesquisa}>
        <TextInput style={styles.searchInput} placeholder="Pesquisa..." />
        <AntDesign name="search1" size={24} color="black" />
      </View>

      <View>
        {!userName && (
          <TouchableOpacity
            style={styles.Login}
            onPress={() => navigation && navigation.navigate("Login")}
          >
            <Text style={styles.textRegister}>Login</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* 4. CARRINHO (Mantido) */}
      <View style={styles.cart}>
        <TouchableOpacity
          onPress={() => navigation && navigation.navigate("Cart")}
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
  menu: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
    // Adicione margem se necessário para separação
    // marginRight: 5,
  },
  conteinerPesquisa: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: "white",
    borderRadius: 25,
    paddingRight: 6,
    paddingLeft: 6,
    height: 35,
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  Login: {
    backgroundColor: "white",
    borderRadius: 8,
    height: 35,
    justifyContent: "center",
  },
  userName: {
    color: "white",
    fontSize: 16,
  },
  searchInput: {
    fontSize: 12,
    flex: 1, // Permite que o input preencha o espaço
    height: 30, // Adicionado para garantir que o input seja clicável
  },
  cart: {
    alignItems: "center",
    justifyContent: "center",
    width: 36,
    height: 36,
    backgroundColor: "white",
    borderRadius: 100,
    marginLeft: 5, // Pequena margem para separação
  },
  textRegister: {
    // Adicione estilos se necessário, pois não estão definidos no seu styles.Login
    color: "#05419A",
    fontWeight: "bold",
    padding: 5,
    fontSize: 12,
  },
});
