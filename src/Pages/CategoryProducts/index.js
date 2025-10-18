import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
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
  }, [categoryId]);

  function navigateToDetails(produto) {
    navigation.navigate("Details", { produto: produto });
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header navigation={navigation} showBackButton={true} />

      <View style={styles.headerTitle}>
        <Text style={styles.title}>Produtos em "{categoryName}"</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  headerTitle: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#f9f9f9",
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
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
