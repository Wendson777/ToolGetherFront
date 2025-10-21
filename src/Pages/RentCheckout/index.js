import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  StatusBar,
} from "react-native";
import Header from "../../Components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

function formatarPreco(valor) {
  if (typeof valor !== "number" || isNaN(valor)) {
    const numero = parseFloat(valor);
    if (!isNaN(numero)) {
      valor = numero;
    } else {
      return "R$ 0,00";
    }
  }
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(valor);
}

// 🚨 ATENÇÃO: Verifique se este é o IP correto da sua rede Wi-Fi!
const API_BASE_URL = "http://192.168.68.106:3333";

export default function RentCheckout({ route, navigation }) {
  const { product } = route.params;

  const [rentalDays, setRentalDays] = useState("1");
  const [totalPrice, setTotalPrice] = useState(product.price * 1);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    const days = parseInt(rentalDays) || 1;
    setTotalPrice(product.price * days);
  }, [rentalDays, product.price]);

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor("#05419A");
  }, []);

  async function handleRent() {
    if (isProcessing) return;

    const days = parseInt(rentalDays);
    if (isNaN(days) || days <= 0) {
      Alert.alert("Erro", "Por favor, insira um número de dias válido.");
      return;
    }

    setIsProcessing(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId");

      console.log("Token Recuperado:", token ? "SIM" : "NÃO");
      console.log("UserId Recuperado:", userId);

      if (!token || !userId) {
        Alert.alert(
          "Acesso Negado",
          "Você precisa estar logado para alugar um produto."
        );
        navigation.navigate("Login");
        return;
      }

      // 🚨 ALTERAÇÃO: Mapeando nomes de campos para o backend (duration e price)
      const rentData = {
        productId: product._id,
        userId: userId,
        duration: days, // Antes: rentalDays
        price: totalPrice, // Antes: totalAmount
        startDate: new Date().toISOString(), // Adicionando data de início
      };

      // 🚨 ALTERAÇÃO: Rota alterada para /rent
      const response = await fetch(`${API_BASE_URL}/rent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(rentData),
      });

      if (!response.ok) {
        // 🚨 NOVO TRATAMENTO DE ERRO: Tenta ler como JSON, se falhar, lê como texto
        const responseBody = await response.text();
        console.error("Status da Resposta:", response.status);
        console.error("Corpo da Resposta (TEXTO):", responseBody);

        let errorMessage = `Erro de Servidor: Status ${response.status}.`;

        try {
          const errorData = JSON.parse(responseBody);
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // Se falhou ao parsear, o body não é JSON (é HTML ou texto simples)
          errorMessage += ` Resposta não é JSON. Conteúdo inicial: ${responseBody.substring(
            0,
            50
          )}...`;
        }

        throw new Error(errorMessage);
      }

      // Se a resposta for OK (2xx), continua
      // Se o backend retorna 201 com body, pode-se usar await response.json() aqui.
      // Caso contrário, apenas continua com a mensagem de sucesso.

      Alert.alert(
        "Sucesso!",
        `Aluguel de ${product.name} confirmado por ${days} dias.`
      );

      navigation.popToTop();
    } catch (error) {
      Alert.alert("Erro no Aluguel", error.message);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Confirmar Aluguel</Text>

        <View style={styles.productSummary}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.pricePerDay}>
            Valor diário: {formatarPreco(product.price)}
          </Text>
        </View>

        <Text style={styles.label}>Duração do Aluguel (Dias):</Text>
        <TextInput
          style={styles.input}
          value={rentalDays}
          onChangeText={(text) => setRentalDays(text.replace(/[^0-9]/g, ""))}
          keyboardType="numeric"
          placeholder="Ex: 5"
        />

        <View style={styles.summaryBox}>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryText}>Dias de Aluguel:</Text>
            <Text style={styles.summaryValue}>{rentalDays} dias</Text>
          </View>
          <View style={styles.summaryItem}>
            <Text style={styles.summaryText}>Preço por Dia:</Text>
            <Text style={styles.summaryValue}>
              {formatarPreco(product.price)}
            </Text>
          </View>
          <View style={styles.summaryTotal}>
            <Text style={styles.summaryTotalText}>Total:</Text>
            <Text style={styles.summaryTotalValue}>
              {formatarPreco(totalPrice)}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={[
            styles.rentButton,
            isProcessing && { backgroundColor: "#ccc" },
          ]}
          onPress={handleRent}
          disabled={isProcessing}
        >
          {isProcessing ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.rentButtonText}>Confirmar Aluguel</Text>
          )}
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
  scrollContent: { padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#05419A",
  },

  productSummary: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  productName: { fontSize: 18, fontWeight: "bold" },
  pricePerDay: { fontSize: 16, color: "#555", marginTop: 5 },

  label: { fontSize: 16, marginTop: 15, marginBottom: 5, fontWeight: "600" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    fontSize: 16,
    marginBottom: 20,
    backgroundColor: "#fff",
  },

  summaryBox: {
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 8,
    padding: 15,
    marginBottom: 30,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
  },
  summaryText: { fontSize: 16, color: "#333" },
  summaryValue: { fontSize: 16, fontWeight: "600" },
  summaryTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  summaryTotalText: { fontSize: 18, fontWeight: "bold", color: "#05419A" },
  summaryTotalValue: { fontSize: 18, fontWeight: "bold", color: "#FF6347" },

  rentButton: {
    backgroundColor: "#05419A",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  rentButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
