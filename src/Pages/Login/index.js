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
import { width, height, font } from "../../utils/responsive";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    try {
      const emailTratado = email.trim().toLowerCase();
      const response = await fetch("http://10.0.0.136:3333/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: emailTratado, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login OK:", data);

        await AsyncStorage.setItem("token", data.token);

        if (data.userId) {
          await AsyncStorage.setItem("userId", data.userId);
        }

        if (data.user) {
          await AsyncStorage.setItem("user", data.user);
          Alert.alert("Sucesso", `Bem-vindo ${data.user}!`);
        } else {
          Alert.alert("Sucesso", "Bem-vindo!");
          await AsyncStorage.setItem("user", "Usuário");
        }

        navigation.replace("Home");
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
              keyboardType="email-address"
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
              value={password}
              onChangeText={setPassword}
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
          <Text style={{ textAlign: "center", fontSize: font(2.2) }}>Acessar com</Text>
          <View style={styles.containerSocial}>
            <Pressable style={styles.socialButton}>
              <FontAwesome name="google" size={font(3)} color="white" />
            </Pressable>

            <Pressable
              style={[
                styles.socialButton,
                { backgroundColor: "#3b5998", marginLeft: width(3) },
              ]}
            >
              <FontAwesome name="facebook" size={font(3)} color="white" />
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
  },
  conteinerLogo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height(8)
  },
  logo: {
    width: width(50), 
  },
  subConteiner: {
    backgroundColor: "#fff",
    borderRadius: height(3.5),
  },
  conteiner1: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  conteiner2: {
    alignItems: "center",
    paddingTop: height(2),
  },
  textTitle: {
    fontSize: font(4.0), 
    color: "#05419A",
    margin: height(2.2),
  },
  conteinerInput: {
    alignItems: "center",
    width: width(100), 
    gap: height(1.5),
  },
  formInput: {
    borderWidth: 1, 
    borderColor: "#05419A", 
    borderRadius: height(1.5),
    padding: height(1.5),
    marginVertical: height(0.7),
    width: width(90), 
    fontSize: font(2.5), 
  },
  formButton: {
    backgroundColor: "#05419A",
    width: width(90), 
    marginBottom: height(1.5),
    padding: height(1.5),
    borderRadius: height(1.5),
    alignItems: "center",
  },
  textButoon: {
    color: "white",
    fontSize: font(3.0), 
    fontWeight: "bold",
  },
  containerSocial: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: height(0.7),
    marginBottom: height(3),
  },
  socialButton: {
    backgroundColor: "#DB4437",
    padding: height(1.5),
    borderRadius: height(0.7),
    justifyContent: "center",
    alignItems: "center",
  },
  Register: {
    width: width(100), 
    alignItems: "flex-end",
    paddingEnd: width(5),
  },
  textRegister: {
    textDecorationLine: "underline",
    color: "#05419A",
    fontSize: font(2.0), 
  },
});