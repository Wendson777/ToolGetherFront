import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar, // Adicionado para garantir o controle da barra de status
} from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context"; // 🚨 Removido
import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";

// Importações de Ícones
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";

const API_BASE_URL = "http://192.168.1.24:3333";
const MY_API_URL = `${API_BASE_URL}/getproducts`;

function formatarPreco(valor) {
  if (typeof valor !== "number" || isNaN(valor)) {
    const numero = parseFloat(valor);
    if (!isNaN(numero)) {
      valor = numero;
    } else {
      return "R$ 0,00";
    }
  }

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(valor);
}

function getCategoryIcon(name) {
  const lowerName = name ? name.toLowerCase() : "";
  if (lowerName.includes("ferramenta"))
    return <Octicons name="tools" size={30} color="black" />;
  if (lowerName.includes("mobilidade"))
    return <MaterialIcons name="pedal-bike" size={30} color="black" />;
  if (lowerName.includes("evento"))
    return <FontAwesome6 name="champagne-glasses" size={30} color="black" />;
  if (lowerName.includes("equipamento") || lowerName.includes("câmera"))
    return <MaterialIcons name="camera-alt" size={30} color="black" />;
  if (lowerName.includes("futebol") || lowerName.includes("esporte"))
    return <FontAwesome name="soccer-ball-o" size={24} color="black" />;
  return <AntDesign name="appstore-o" size={30} color="black" />;
}

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isError, setIsError] = useState(false);

  async function getCategories() {
    try {
      const response = await fetch(`${API_BASE_URL}/categories`);
      if (!response.ok) {
        throw new Error(`Erro HTTP ao buscar categorias: ${response.status}`);
      }
      const categoriesData = await response.json();
      setCategories(categoriesData);
    } catch (err) {
      console.error("Erro ao buscar categorias:", err);
    } finally {
      setIsLoadingCategories(false);
    }
  }

  async function getProducts() {
    try {
      setIsError(false);
      setIsLoadingProducts(true);

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
      setIsLoadingProducts(false);
    }
  }

  useEffect(() => {
    getCategories();
    getProducts();

    // Garante que a barra de status tenha o esquema de cores correto (ícones brancos)
    StatusBar.setBarStyle("light-content", true);
    // Define o fundo da Status Bar (só afeta Android)
    StatusBar.setBackgroundColor("#05419A");
  }, []);

  function navigateToCategory(categoryId, categoryName) {
    navigation.navigate("CategoryProducts", {
      categoryId: categoryId,
      categoryName: categoryName,
    });
  }

  function mudarTela(produto) {
    navigation.navigate("Details", { produto: produto });
  }

  return (
    // 🚨 Troca de SafeAreaView para View
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />

      {/* 🚨 ScrollView ocupa o espaço restante */}
      <ScrollView
        style={styles.scrollViewFlex}
        contentContainerStyle={styles.scrollContent}
      >
        <ScrollView
          style={styles.carrossel}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
          {isLoadingCategories ? (
            <Text style={{ paddingHorizontal: 15, alignSelf: "center" }}>
              Carregando categorias...
            </Text>
          ) : (
            categories.map((cat) => (
              <TouchableOpacity
                key={cat._id}
                style={styles.actionButton}
                onPress={() => navigateToCategory(cat._id, cat.name)}
              >
                <View style={styles.areaButton}>
                  {getCategoryIcon(cat.name)}
                </View>
                <Text style={styles.labelButton}>{cat.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>

        <View style={styles.ultimosItens}>
          <Text style={styles.title}>Ultimos Itens Alugados</Text>
        </View>

        <View style={styles.container3}>
          <Text style={styles.titleContainer3}>Baseado no que você viu</Text>
          {isError && <Text>Opssss.... erro ao buscar produtos</Text>}

          {isLoadingProducts ? (
            <Text>Carregando produtos...</Text>
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
                    source={{ uri: item.url }}
                    style={{ width: 120, height: 120 }}
                  />
                  <Text style={styles.text_preco}>
                    {formatarPreco(item.price)}
                  </Text>
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // 🚨 Container Principal: Branco, ocupa a tela toda.
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // 🚨 ScrollView: Ocupa o espaço abaixo do Header.
  scrollViewFlex: {
    flex: 1,
  },

  // 🚨 ScrollContent: Garante que o fundo do conteúdo interno seja branco.
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingBottom: 20,
  },

  ultimosItens: {
    backgroundColor: "#999",
    width: "90%",
    height: 180,
    borderRadius: 18,
    alignSelf: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
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
    fontWeight: "bold",
  },
  container3: {
    width: "100%",
    paddingHorizontal: 20,
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingBottom: 20,
  },
  productItem: {
    marginBottom: 15,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    width: "48%",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    shadowColor: "#000",
    alignItems: "center",
  },

  text_preco: {
    color: "#05419A",
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
});
