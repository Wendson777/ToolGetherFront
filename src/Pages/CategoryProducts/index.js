import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  StatusBar, // Adicionado para garantir o controle da barra de status
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context"; // 🚨 Removido
import Header from "../../Components/Header";
import { AntDesign } from "@expo/vector-icons";

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

export default function CategoryProducts({ route, navigation }) {
  const { categoryId, categoryName } = route.params;

  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  async function fetchCategoryProducts() {
    setIsError(false);
    setIsLoading(true);

    const URL = `${API_BASE_URL}/products/category/${categoryId}`;

    try {
      const response = await fetch(URL);

      if (!response.ok) {
        throw new Error(
          `Erro ao buscar produtos para ID ${categoryId}: ${response.status}`
        );
      }

      const productsData = await response.json();
      setProducts(productsData);
    } catch (err) {
      console.error("Erro na requisição de categoria:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategoryProducts();

    // Garante que a barra de status tenha o esquema de cores correto
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor("#05419A");
  }, [categoryId]);

  function navigateToDetails(produto) {
    navigation.navigate("Details", { produto: produto });
  }

  return (
    // 🚨 MUDANÇA 1: Troca de SafeAreaView para View
    <View style={styles.mainContainer}>
      <Header navigation={navigation} showBackButton={true} />

      <View style={styles.headerTitle}>
        <Text style={styles.title}>Produtos em "{categoryName}"</Text>
      </View>

      {/* 🚨 ScrollView ocupa o espaço restante */}
      <ScrollView
        style={styles.scrollViewFlex}
        contentContainerStyle={styles.scrollContent}
      >
        {isLoading && (
          <ActivityIndicator
            size="large"
            color="#05419A"
            style={{ marginTop: 50 }}
          />
        )}

        {isError && (
          <Text style={styles.errorText}>
            Não foi possível carregar os produtos desta categoria.
          </Text>
        )}

        {!isLoading && products.length === 0 && !isError && (
          <Text style={styles.noProductsText}>
            Nenhum produto encontrado na categoria "{categoryName}".
          </Text>
        )}

        <View style={styles.productList}>
          {products.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.productItem}
              onPress={() => navigateToDetails(item)}
              activeOpacity={0.7}
            >
              <Image
                source={{ uri: item.url || "https://via.placeholder.com/120" }}
                style={styles.productImage}
                resizeMode="contain"
              />
              <Text style={styles.text_preco}>{formatarPreco(item.price)}</Text>
              <Text style={{ textAlign: "center", paddingHorizontal: 5 }}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // 🚨 MUDANÇA 2: Novo container principal
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff", // Fundo principal branco
  },

  // 🚨 Novo estilo para o ScrollView ocupar o espaço
  scrollViewFlex: {
    flex: 1,
  },

  // Estilo original safeArea (agora obsoleto)
  // safeArea: { flex: 1, backgroundColor: "#fff" },

  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: "#fff", // Garante que o ScrollView é branco
  },
  headerTitle: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9", // Mantendo o fundo cinza claro para esta seção
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#05419A",
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingTop: 10,
  },
  productItem: {
    marginBottom: 15,
    paddingVertical: 10,
    width: "48%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    alignItems: "center",
    elevation: 0.5,
    // shadowColor: "#000",
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
  },
  productImage: {
    width: "90%",
    height: 120,
    marginBottom: 5,
  },
  text_preco: {
    color: "#05419A",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginTop: 50,
  },
  noProductsText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#666",
  },
});
