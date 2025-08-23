import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin() {
    try {
      const emailTratado = email.trim().toLowerCase();
      const response = await fetch("http://192.168.1.110:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailTratado, password: senha }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login OK:", data);

        //Exemplo: salvar o token e nome do usuário
        await AsyncStorage.setItem("token", data.token);
        await AsyncStorage.setItem("usuario", data.usuario);

        Alert.alert("Sucesso", `Bem-vindo ${data.usuario}!`);

        navigation.replace("Home"); // vai para tela Home
      } else {
        Alert.alert("Erro", data.message || "Falha no login");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível conectar ao servidor");
      console.error(error);
    }
  }

  return (
    <View style={styles.conteiner}>
      <View style={styles.conteinerLogo}>
        <Image
          style={styles.logo}
          source={require("../../../assets/Logo.png")}
          resizeMode="contain"
        />
      </View>
      <View style={styles.subConteiner}>
        <View style={styles.conteiner1}>
          <Text style={styles.textTitle}>Entre na sua conta</Text>

          <StatusBar style="auto" />
          <View style={styles.conteinerInput}>
            <TextInput
              style={styles.formInput}
              placeholder="Digite seu e-mail..."
              keyboardType="email-addres"
              autoCapitalize="none"
              autoComplete="email"
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              style={styles.formInput}
              placeholder="Digite sua senha..."
              autoCapitalize="none"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
          </View>
        </View>

        <Pressable
          style={styles.Register}
          onPress={() => navigation.navigate("Register")}
        >
          <Text style={styles.textRegister}>Não tem uma conta?</Text>
        </Pressable>

        <View style={styles.conteiner2}>
          <TouchableOpacity style={styles.formButton} onPress={handleLogin}>
            <Text style={styles.textButoon}>Entrar</Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center" }}>Acessar com</Text>
          <View style={styles.containerSocial}>
            <Pressable style={styles.socialButton}>
              <FontAwesome name="google" size={24} color="white" />
            </Pressable>

            <Pressable
              style={[
                styles.socialButton,
                { backgroundColor: "#3b5998", marginLeft: 10 },
              ]}
            >
              <FontAwesome name="facebook" size={24} color="white" />
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#05419A",
    justifyContent: "flex-end",
  },
  conteinerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: "60%",
  },
  subConteiner: {
    // flex: 1,
    backgroundColor: "#fff",
    borderRadius: 25,
  },
  conteiner1: {
    alignItems: "center",
    justifyContent: "flex-end",
    // flex: 1,
  },
  conteiner2: {
    alignItems: "center",
    // flex: 1,
    paddingTop: 30,
  },
  textTitle: {
    fontSize: 30,
    color: "#05419A",
    margin: 25,
    // marginBottom: 30,
  },
  conteinerInput: {
    alignItems: "center",
    width: "100%",
    gap: 15,
  },
  formInput: {
    borderWidth: 1, // largura da borda
    borderColor: "#05419A", // cor da borda
    borderRadius: 10, // bordas arredondadas (opcional)
    padding: 10, // espaço interno
    marginVertical: 5, // espaço entre os inputs
    width: "90%",
    fontSize: 20,
  },
  formButton: {
    backgroundColor: "#05419A",
    width: "90%",
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  textButoon: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  containerSocial: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    marginBottom: 20,
  },
  socialButton: {
    backgroundColor: "#DB4437", // vermelho Google
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  Register: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 20,
    paddingEnd: 20,
  },
  textRegister: {
    textDecorationLine: "underline",
    color: "#05419A",
    fontSize: 16,
  },
});
