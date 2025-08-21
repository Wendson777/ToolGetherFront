import React, { useEffect } from "react";
import { View, Image, StyleSheet } from "react-native";

export default function Splash({ navigation }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home"); // vai para Home depois de 2 segundos
    }, 2000); // tempo em milissegundos (2000 = 2s)

    return () => clearTimeout(timer); // limpa o timer se sair da tela
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../../../assets/Logo.png")} // coloque sua logo aqui
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05419A", // cor de fundo da splash
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 200, // largura da logo
    height: 200, // altura da logo
  },
});
