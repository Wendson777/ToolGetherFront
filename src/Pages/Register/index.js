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
import { height, width, font } from "../../utils/responsive";

export default function Register() {
  const navigation = useNavigation();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adress, setAdress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleRegister = async () => {
    try {
      const response = await fetch("http://10.0.0.136:3333/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, adress, phoneNumber }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Sucesso", `Usuário criado: ${data.name}`);
        navigation.navigate("Login");
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
            <FontAwesome name="google" size={font(3.6)} color="white" />
          </Pressable>

          <Pressable
            style={[
              styles.socialButton,
              { backgroundColor: "#3b5998", marginLeft: width(10) },
            ]}
          >
            <FontAwesome name="facebook" size={font(3.6)} color="white" />
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
  containerLogo: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: height(5),
  },
  logo: {
    width: width(50),
  },
  subContainer: {
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: height(3.5),
  },
  formTitle: {
    fontSize: font(4.5),
    color: "#05419A",
    margin: height(2.2),
  },
  containerInput: {
    alignItems: "center",
    width: width(100),
    gap: height(1.5),
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#05419A",
    borderRadius: height(1.5),
    padding: height(1.5),
    marginVertical: height(0.5),
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
    marginTop: height(2),
  },
  textButton: {
    color: "white",
    fontSize: font(3),
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
});