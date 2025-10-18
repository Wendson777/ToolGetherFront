import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
  Alert,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function Register() {
  const navigation = useNavigation();

  // Estados para os inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Função para cadastrar usuário
  const handleRegister = async () => {
    try {
      const response = await fetch("http://192.168.1.24:3333/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, adress, phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", `Usuário criado: ${data.name}`);
        navigation.navigate("Login"); // volta para tela de login
      } else {
        Alert.alert("Erro", data.message);
      }
    } catch (error) {
      Alert.alert("Erro", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require("../../../assets/Logo.png")}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>

      <View style={styles.subContainer}>
        <Text style={styles.formTitle}>Cadastre-se</Text>
        <StatusBar style="auto" />

        <View style={styles.containerInput}>
          <TextInput
            style={styles.formInput}
            placeholder="Digite seu nome..."
            value={name}
            onChangeText={setName}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Digite seu e-mail..."
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.formInput}
            placeholder="Digite sua senha..."
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            style={styles.formInput}
            placeholder="Digite seu endereço..."
            value={adress}
            onChangeText={setAdress}
          />
          <TextInput
            style={styles.formInput}
            placeholder="Digite seu telefone..."
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.formButton} onPress={handleRegister}>
          <Text style={styles.textButton}>Cadastrar</Text>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#05419A",
    justifyContent: "flex-end",
  },
  subContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 25,
  },
  formTitle: {
    fontSize: 30,
    color: "#05419A",
    margin: 15,
  },
  containerInput: {
    alignItems: "center",
    width: "100%",
    gap: 15,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#05419A",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
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
  textButton: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
  },
  containerSocial: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 5,
    marginBottom: "10%",
  },
  socialButton: {
    backgroundColor: "#DB4437",
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  containerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: "5%",
  },
  logo: {
    width: "35%",
  },
});
