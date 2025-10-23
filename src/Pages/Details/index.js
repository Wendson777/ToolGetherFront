import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import Header from "../../Components/Header"; // Ajuste o caminho conforme sua estrutura
import { AntDesign } from "@expo/vector-icons";

// Função auxiliar de formatação de preço (necessária para exibir R$)
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

// O componente recebe `route` para pegar os parâmetros e `navigation` para navegar
export default function Details({ route, navigation }) {
  // 1. Recebe o objeto do produto da tela anterior (Home ou CategoryProducts)
  const { produto } = route.params;

  // 2. Função para navegar para a tela de aluguel
  function navigateToRentCheckout() {
    navigation.navigate("RentCheckout", {
      product: produto, // Passa o objeto do produto
    });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header navigation={navigation} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Imagem Principal */}
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: produto.url || "https://via.placeholder.com/300" }}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{produto.name}</Text>

          <View style={styles.priceContainer}>
            <Text style={styles.priceTag}>{formatarPreco(produto.price)}</Text>
            <Text style={styles.priceDuration}>/ dia</Text>
          </View>

          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text style={styles.descriptionText}>
            {produto.description || "Descrição não disponível."}
          </Text>

          <Text style={styles.sectionTitle}>Detalhes</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Disponibilidade:</Text>
            <Text style={styles.infoValue}>
              {produto.stock > 0
                ? `Em estoque (${produto.stock} unid.)`
                : "Esgotado"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Localização:</Text>
            <Text style={styles.infoValue}>
              {produto.location || "Não informado"}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.favoriteButton}>
          <AntDesign name="hearto" size={24} color="#05419A" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buyNowButton,
            produto.stock <= 0 && styles.disabledButton,
          ]}
          onPress={navigateToRentCheckout}
          disabled={produto.stock <= 0}
        >
          <Text style={styles.buttonText}>
            {produto.stock > 0 ? "Alugar Agora" : "Esgotado"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    width: "90%",
    height: "90%",
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 20,
  },
  priceTag: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6347",
  },
  priceDuration: {
    fontSize: 18,
    color: "#666",
    marginLeft: 5,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#05419A",
    marginTop: 15,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: "#444",
    lineHeight: 24,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#666",
  },
  infoValue: {
    fontSize: 16,
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  favoriteButton: {
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#05419A",
    marginRight: 10,
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#05419A",
    padding: 18,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#aaa", // Cor para botão desabilitado
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});
