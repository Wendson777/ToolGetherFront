import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import Header from "../../Components/Header";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Função auxiliar para formatar preço (copiada das suas outras telas)
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

const API_BASE_URL = "http://192.168.1.24:3333";

export default function RentCheckout({ route, navigation }) {
  // Produto enviado da tela de Detalhes
  const { product } = route.params;

  const [rentalDays, setRentalDays] = useState("1"); // Duração do aluguel em dias
  const [totalPrice, setTotalPrice] = useState(product.price * 1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Efeito para recalcular o preço total quando a duração mudar
  useEffect(() => {
    const days = parseInt(rentalDays) || 1;
    setTotalPrice(product.price * days);
  }, [rentalDays, product.price]);

  // Função principal de aluguel
  async function handleRent() {
    if (isProcessing) return;

    // 1. Validação
    const days = parseInt(rentalDays);
    if (isNaN(days) || days <= 0) {
      Alert.alert("Erro", "Por favor, insira um número de dias válido.");
      return;
    }

    setIsProcessing(true);

    try {
      // 2. Obtém o token e o ID do usuário (CRUCIAL para a API)
      const token = await AsyncStorage.getItem("token");
      const userId = await AsyncStorage.getItem("userId"); // Assumindo que você salva o ID

      console.log("Token Recuperado:", token ? "SIM" : "NÃO");
      console.log("UserId Recuperado:", userId);

      if (!token || !userId) {
        Alert.alert(
          "Acesso Negado",
          "Você precisa estar logado para alugar um produto."
        );
        navigation.navigate("Login"); // Redireciona para o login
        return;
      }

      // 3. Monta o objeto de dados da transação
      const rentData = {
        productId: product._id,
        userId: userId, // Id do locatário
        ownerId: product.idOwner, // Id do dono do produto
        rentalDays: days,
        totalAmount: totalPrice,
        // Aqui você pode adicionar data de início, etc.
      };

      // 4. Envia a requisição para o Backend
      const response = await fetch(`${API_BASE_URL}/rents`, {
        // 💡 NOVA ROTA: POST /rents
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Envia o token para autenticação
        },
        body: JSON.stringify(rentData),
      });

      if (!response.ok) {
        // Trata erros de validação (400) ou servidor (500)
        const errorData = await response.json();
        throw new Error(errorData.message || "Erro ao processar o aluguel.");
      }

      // 5. Sucesso
      Alert.alert(
        "Sucesso!",
        `Aluguel de ${product.name} confirmado por ${days} dias.`
      );

      // Navega de volta para a Home ou para a tela de Pedidos
      navigation.popToTop(); // Volta para a tela principal (Home)
    } catch (error) {
      Alert.alert("Erro no Aluguel", error.message);
    } finally {
      setIsProcessing(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header navigation={navigation} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Confirmar Aluguel</Text>

        {/* Resumo do Produto */}
        <View style={styles.productSummary}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.pricePerDay}>
            Valor diário: {formatarPreco(product.price)}
          </Text>
        </View>

        {/* Input de Duração */}
        <Text style={styles.label}>Duração do Aluguel (Dias):</Text>
        <TextInput
          style={styles.input}
          value={rentalDays}
          onChangeText={(text) => setRentalDays(text.replace(/[^0-9]/g, ""))} // Apenas números
          keyboardType="numeric"
          placeholder="Ex: 5"
        />

        {/* Resumo do Pedido */}
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

        {/* Botão de Confirmação */}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#fff" },
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
