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

// URL base da sua API
const API_BASE_URL = "http://192.168.68.106:3333";

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
      // 1. Obter ID e Token
      const storedId = await AsyncStorage.getItem("userId");
      const storedToken = await AsyncStorage.getItem("token");

      if (!storedId || !storedToken) {
        Alert.alert("Erro", "Sessão expirada. Faça login novamente.");
        // navigation.navigate('Login'); // Descomente para redirecionar
        return;
      }

      setUserId(storedId);
      setUserToken(storedToken);

      // 2. Requisição GET para buscar os dados
      const response = await fetch(`${API_BASE_URL}/profile/${storedId}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`, // Use se a rota GET for protegida
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
      // 3. Requisição PUT para atualizar os dados
      const response = await fetch(`${API_BASE_URL}/profile/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`, // Use se a rota PUT for protegida
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

      // Opcional: atualizar o nome do usuário no armazenamento local
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
        <Text style={{ marginTop: 10 }}>Carregando perfil...</Text>
      </View>
    );
  }

  return (
    // 🚨 Container principal com a correção de layout
    <View style={styles.mainContainer}>
      <Header navigation={navigation} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Meu Perfil</Text>

        {/* Nome */}
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          value={userData.name}
          onChangeText={(text) => setUserData({ ...userData, name: text })}
          placeholder="Seu nome completo"
        />

        {/* Email (Não editável) */}
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={[styles.input, styles.disabledInput]}
          value={userData.email}
          editable={false}
          placeholder="Seu email"
        />

        {/* Endereço */}
        <Text style={styles.label}>Endereço</Text>
        <TextInput
          style={styles.input}
          value={userData.adress}
          onChangeText={(text) => setUserData({ ...userData, adress: text })}
          placeholder="Rua, Número, Bairro"
        />

        {/* Telefone */}
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

        {/* Botão de Salvar */}
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleSave}
          disabled={isSaving}
        >
          <Text style={styles.saveButtonText}>
            {isSaving ? "Salvando..." : "Salvar Alterações"}
          </Text>
        </TouchableOpacity>

        {/* Link para alterar senha */}
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
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#05419A",
    marginBottom: 30,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  disabledInput: {
    backgroundColor: "#f0f0f0",
    color: "#666",
  },
  saveButton: {
    backgroundColor: "#05419A",
    padding: 15,
    borderRadius: 8,
    marginTop: 30,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linkButton: {
    padding: 10,
    marginTop: 20,
    alignItems: "center",
  },
  linkButtonText: {
    color: "#FF6347",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
