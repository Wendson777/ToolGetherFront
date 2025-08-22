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

export default function Register() {
  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Image
          source={require("../../../assets/Logo.png")}
          resizeMode="contain"
          style={styles.image}
        />
      </View>
      <View style={styles.container1}>
          <Text style={styles.formTitle}>Cadastre-se</Text>

        <StatusBar style="auto" />

        <View style={styles.containerInput}>
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

          <TextInput
            style={styles.formInput}
            placeholder="Digite seu endereço..."
            autoCapitalize="none"
            secureTextEntry
          />

          <TextInput
            style={styles.formInput}
            placeholder="Digite seu telefone..."
            autoCapitalize="none"
            secureTextEntry
          />
        </View>

        <View style={styles.container2}>
          <TouchableOpacity style={styles.formButton}>
            <Text style={styles.textButton}>Entrar</Text>
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
  container: {
    flex: 1,
    backgroundColor: "#05419A",
    justifyContent: "flex-end"
  },
  container1: {
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "white",
    borderRadius: 25,
  },
  container2: {
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  formTitle: {
    fontSize: 36,
    color: "#05419A",
    margin: 20
  },
  containerInput: {
    alignItems: "center",
    width: "100%",
    gap: 20,
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
    padding: 10,
  },

  socialButton: {
    backgroundColor: "#DB4437", 
    padding: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: "30%",
  },
  containerLogo: {
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "45%",
  },
});
