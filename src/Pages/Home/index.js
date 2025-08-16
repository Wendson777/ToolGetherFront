// src/Pages/Home/index.js
import { StatusBar } from "expo-status-bar";
import { View, Text, StyleSheet, TextInput, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Home() {
  return (
    <View style={styles.conatiner}>
      <Text style={styles.formTitle}>Entre na sua conta</Text>

      <StatusBar style="auto" />
      <TextInput
        style={styles.formInput}
        placeholder="Digite seu e-mail..."
        keyboardType="email-addres"
        autoCapitalize="none"
        autoComplete="email"
      />
      <TextInput
        style={styles.formInput}
        placeholder="Digite sua senha..."
        autoCapitalize="none"
        secureTextEntry
      />

      <Pressable style={styles.formButton}>
        <Text style={styles.textButoon}>Entrar</Text>
      </Pressable>
      <Text style={{ textAlign: "center" }}>Acessar com</Text>
      <View style={styles.subContainer}>
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
  );
}

const styles = StyleSheet.create({
  conatiner: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    backgroundColor: "#fff",
  },
  formTitle: {
    fontSize: 36,
    color: "blue",
    margin: 10,
  },
  formInput: {
    borderWidth: 1, // largura da borda
    borderColor: "blue", // cor da borda
    borderRadius: 10, // bordas arredondadas (opcional)
    padding: 10, // espaço interno
    marginVertical: 5, // espaço entre os inputs
    width: "80%",
    // height: "7%",
    fontSize: 20,
  },
  formButton: {
    backgroundColor: "blue",
    width: "80%",
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
  subContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
  },

  socialButton: {
    backgroundColor: "#DB4437", // vermelho Google
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
