import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import Header from "../../Components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { height, width, font } from "../../utils/responsive";

const API_BASE_URL = "http://10.98.122.176:3333";

export default function ProfileEditScreen({ navigation }) {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    adress: "",
    phoneNumber: "",
  });
  const [userId, setUserId] = useState(null);
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  async function fetchUserData() {
    setIsLoading(true);
    try {
      const storedId = await AsyncStorage.getItem("userId");
      const storedToken = await AsyncStorage.getItem("token");

      if (!storedId || !storedToken) {
        Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
        return;
      }

      setUserId(storedId);
      setUserToken(storedToken);

      const response = await fetch(`${API_BASE_URL}/profile/${storedId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Erro ao buscar dados: ${response.status}`);
      }

      const data = await response.json();
      setUserData({
        name: data.name,
        email: data.email,
        adress: data.adress,
        phoneNumber: data.phoneNumber,
      });
    } catch (error) {
      console.error("Erro ao carregar dados do usuário:", error);
      Alert.alert("Erro", "Não foi possível carregar seus dados de perfil.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSave() {
    if (!userId || !userToken) {
      Alert.alert("Erro", "Sessão inválida. Faça login novamente.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify({
          name: userData.name,
          adress: userData.adress,
          phoneNumber: userData.phoneNumber,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Falha desconhecida ao atualizar");
      }

      Alert.alert("Sucesso", "Seu perfil foi atualizado com sucesso!");

      if (result.user.name) {
        await AsyncStorage.setItem("user", result.user.name);
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      Alert.alert(
        "Erro",
        `Não foi possível salvar as alterações: ${error.message}`
      );
    } finally {
      setIsSaving(false);
    }
  }

  useEffect(() => {
    fetchUserData();
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor("#05419A");
  }, []);

  if (isLoading) {
    return (
      <View style={[styles.mainContainer, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#05419A" />
        <Text style={{ marginTop: height(1.5) }}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Meu Perfil</Text>

        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={userData.name}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
          placeholder="Seu nome completo"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={userData.email}
          editable={false}
          placeholder="Seu email"
        />

        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={userData.adress}
          onChangeText={(text) => setUserData({ ...userData, adress: text })}
          placeholder="Rua, Número, Bairro"
        />

        <Text style={styles.label}>Telefone</Text>
        <TextInput
          style={styles.input}
          value={userData.phoneNumber}
          onChangeText={(text) =>
            setUserData({ ...userData, phoneNumber: text })
          }
          placeholder="(XX) XXXXX-XXXX"
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.linkButton}
          onPress={() =>
            Alert.alert(
              "Funcionalidade",
              "Navegar para a tela de Alteração de Senha"
            )
          }
        >
          <Text style={styles.linkButtonText}>Alterar Senha</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  loadingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    padding: width(5),
  },
  title: {
    fontSize: font(4),
    fontWeight: "bold",
    color: "#05419A",
    marginTop: height(2),
    marginBottom: height(3),
    textAlign: "center",
  },
  label: {
    fontSize: font(2.25),
    fontWeight: "bold",
    color: "#05419A",
    marginTop: height(1.5),
    marginBottom: height(0.5),
  },
  input: {
    borderWidth: 1,
    borderColor: "#05419A",
    borderRadius: width(2),
    padding: width(3),
    fontSize: font(2.25),
    backgroundColor: "#fff",
    height: height(6),
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#666",
  },
  saveButton: {
    backgroundColor: "#05419A",
    padding: height(2),
    borderRadius: width(2),
    marginTop: height(3),
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: font(2.25),
    fontWeight: "bold",
  },
  linkButton: {
    padding: height(1),
    marginTop: height(2),
    alignItems: "flex-end",
  },
  linkButtonText: {
    color: "#FF6347",
    fontSize: font(2.25),
    textDecorationLine: "underline",
  },
});
