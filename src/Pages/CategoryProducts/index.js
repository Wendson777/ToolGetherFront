import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";

import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";

const MY_API_URL = "http://192.168.1.24:3333/getproducts";

function formatarPreco(valor) {
  if (typeof valor !== "number" || isNaN(valor)) {
    const numero = parseFloat(valor);
    if (!isNaN(numero)) {
      valor = numero;
    } else {
      console.error("Entrada inválida. Por favor, forneça um número.");
      return "R$ 0,00";
    }
  }

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(valor);
}

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getProducts() {
    try {
      setIsError(false);
      setIsLoading(true);

      const response = await fetch(MY_API_URL);

      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const productsData = await response.json();
      let productsList = productsData;

      setProducts(productsList);
    } catch (err) {
      console.error("Erro na requisição da API:", err);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  function mudarTela(produto) {
    if (navigation && navigation.navigate) {
      navigation.navigate("Details", { produto: produto });
    } else {
      console.warn(
        "A navegação não está configurada ou 'navigation' não foi passada."
      );

      console.log("Produto Clicado (sem navegação):", produto.name);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ScrollView
          style={styles.carrossel}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {/* Exemplo de botão no carrossel: */}
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.areaButton}>
              <Octicons name="tools" size={30} color="black" />
            </View>
            <Text style={styles.labelButton}>Ferramentas</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.areaButton}>
              <MaterialIcons name="pedal-bike" size={40} color="black" />
            </View>
            <Text style={styles.labelButton}>Mobilidade</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.areaButton}>
              <FontAwesome6 name="champagne-glasses" size={30} color="black" />
            </View>
            <Text style={styles.labelButton}>Eventos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.areaButton}>
              <MaterialIcons name="camera-alt" size={30} color="black" />
            </View>
            <Text style={styles.labelButton}>Equipamentos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.areaButton}>
              <FontAwesome name="soccer-ball-o" size={24} color="black" />
            </View>
            <Text style={styles.labelButton}>Futebol</Text>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.ultimosItens}>
          <Text style={styles.title}>Ultimos Itens Alugados</Text>
        </View>

        <View style={styles.container3}>
          <Text style={styles.titleContainer3}>Baseado no que você viu</Text>

          {isError && (
            <Text
              style={{ color: "red", textAlign: "center", paddingVertical: 10 }}
            >
              Opssss.... erro ao buscar produtos. Tente novamente!
            </Text>
          )}

          {isLoading ? (
            <View style={{ paddingVertical: 20 }}>
              <ActivityIndicator size="large" color="#05419A" />
              <Text style={{ textAlign: "center", marginTop: 10 }}>
                Carregando produtos...
              </Text>
            </View>
          ) : (
            <View style={styles.productList}>
              {products.map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.productItem}
                  onPress={() => mudarTela(item)}
                  activeOpacity={0.7}
                >
                  <Image
                    source={{
                      uri: item.url || "https://via.placeholder.com/120",
                    }}
                    style={{ width: 120, height: 120 }}
                    resizeMode="contain"
                  />
                  <Text style={styles.text_preco}>
                    {formatarPreco(item.price)}
                  </Text>
                  <Text style={{ textAlign: "center", paddingHorizontal: 5 }}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          {/* Caso não haja produtos para exibir */}
          {!isLoading && !isError && products.length === 0 && (
            <Text style={{ textAlign: "center", paddingVertical: 20 }}>
              Nenhum produto encontrado.
            </Text>
          )}
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
    paddingBottom: 20,
  },

  carrossel: {
    maxHeight: 84,
    marginBottom: 14,
    marginTop: 18,
    paddingEnd: 14,
    paddingStart: 14,
  },
  actionButton: {
    alignItems: "center",
    marginRight: 32,
  },
  areaButton: {
    backgroundColor: "#ecf0f1",
    height: 60,
    width: 60,
    alignItems: "center",
    borderRadius: 30,
    justifyContent: "center",
  },
  labelButton: {
    marginTop: 4,
    textAlign: "center",
    fontWeight: "bold",
  },
  titleContainer3: {
    color: "#05419A",
    fontSize: 24,
    marginBottom: 10,
    fontWeight: "bold", // Adicionado para destacar o título
  },
  container3: {
    width: "100%",
    paddingHorizontal: 20,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between", // Distribui o espaço entre os itens
    paddingBottom: 20,
  },
  // Estilo aplicado ao TouchableOpacity, mantendo o visual do View
  productItem: {
    marginBottom: 15,
    paddingVertical: 10, // Ajustado para dar espaço interno
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "48%", // Mantido para exibir 2 colunas
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    alignItems: "center",
    // elevation: 3, // Sombra para Android
    // shadowColor: "#000", // Sombra para iOS
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 3,
  },

  text_preco: {
    color: "#05419A",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5, // Espaçamento vertical
  },
});
