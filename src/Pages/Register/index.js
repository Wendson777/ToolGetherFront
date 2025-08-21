import { StatusBar } from "expo-status-bar";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

export default function Register() {
  return (
    <View style={styles.conteiner}>
      <View style={styles.conteiner1}>
        <Text style={styles.formTitle}>Cadastre-se</Text>

        <StatusBar style="auto" />
        <View style={styles.conteinerInput}>
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
        </View>
      </View>

      <View style={styles.conteiner2}>
        <TouchableOpacity style={styles.formButton}>
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
  );
}

const styles = StyleSheet.create({
  conteiner: {
    flex: 1,
    backgroundColor: "#fff",
  },
  conteiner1: {
    alignItems: "center",
    justifyContent: "flex-end",
    flex: 1,
  },
  conteiner2: {
    alignItems: "center",
    flex: 1,
    paddingTop: 30,
  },
  formTitle: {
    fontSize: 36,
    color: "blue",
    margin: 10,
  },
  conteinerInput: {
    alignItems: "center",
    width: "100%",
    gap: 20,
  },
  formInput: {
    borderWidth: 1, // largura da borda
    borderColor: "blue", // cor da borda
    borderRadius: 10, // bordas arredondadas (opcional)
    padding: 10, // espaço interno
    marginVertical: 5, // espaço entre os inputs
    width: "90%",
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
  containerSocial: {
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
  singUp: {
    width: "100%",
    alignItems: "flex-end",
    // backgroundColor: "green",
    marginTop: 20,
    paddingEnd: 20,
  },
  textSingUp: {
    textDecorationLine: "underline",
    color: "blue",
    fontSize: 15,
  },
});
