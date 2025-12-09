import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { height, width, font } from "../../utils/responsive";
import { AntDesign } from "@expo/vector-icons";

const API_BASE_URL = "http://192.168.0.101:3333";
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
  return formatter.format(valor).replace(/\s/g, "");
}

function getCategoryIcon(name) {
  // Reduzi um pouco o tamanho dos ícones para ficar mais harmônico no rodapé
  const iconSize = font(2.2);
  const lowerName = name ? name.toLowerCase() : "";
  if (lowerName.includes("ferramenta"))
    return <Octicons name="tools" size={iconSize} color="black" />;
  if (lowerName.includes("mobilidade"))
    return <MaterialIcons name="pedal-bike" size={iconSize} color="black" />;
  if (lowerName.includes("evento"))
    return (
      <FontAwesome6 name="champagne-glasses" size={iconSize} color="black" />
    );
  if (lowerName.includes("equipamento") || lowerName.includes("câmera"))
    return <MaterialIcons name="camera-alt" size={iconSize} color="black" />;
  if (lowerName.includes("futebol") || lowerName.includes("esporte"))
    return <FontAwesome name="soccer-ball-o" size={iconSize} color="black" />;
  return <AntDesign name="appstore-o" size={iconSize} color="black" />;
}

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isError, setIsError] = useState(false);

  const rentedItems = [
    {
      id: 1,
      name: "Betoneira 400l",
      price: 99.99,
      dates: "01/03/25 - 10/03/25",
      image: require("../../../assets/images/betoneira.jpg"),
    },
    {
      id: 2,
      name: "Bicicleta GTSM",
      price: 49.99,
      dates: "11/03/25 - 12/02/25",
      image: require("../../../assets/images/bicicleta.webp"),
    },
  ];

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
    StatusBar.setBarStyle("light-content", true);
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
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />

      {/* Conteúdo Principal (Rented + Products) */}
      <ScrollView
        style={styles.scrollViewFlex}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.rentedItemsContainer}>
          <View style={styles.rentedHeader}>
            <Text style={styles.sectionTitle}>Últimos itens alugados</Text>
            <TouchableOpacity>
              <Text style={styles.viewMoreText}>Ver mais</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rentedList}>
            {rentedItems.map((item) => (
              <View key={item.id} style={styles.rentedItem}>
                <Image source={item.image} style={styles.rentedImage} />
                <View style={styles.rentedDetails}>
                  <Text style={styles.rentedItemName}>{item.name}</Text>
                  <Text style={styles.rentedItemPrice}>
                    {formatarPreco(item.price)}{" "}
                    <Text style={styles.perDayText}>/dia</Text>
                  </Text>
                  <Text style={styles.rentedItemDates}>{item.dates}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.container3}>
          <Text style={styles.sectionTitle}>Baseado no que você viu</Text>
          {isError && (
            <Text style={{ fontSize: font(1.6), color: "red", marginTop: 10 }}>
              Opssss.... erro ao buscar produtos
            </Text>
          )}
          {isLoadingProducts ? (
            <Text style={{ fontSize: font(1.6), marginTop: 10 }}>
              Carregando produtos...
            </Text>
          ) : (
            <View style={styles.productList}>
              {products.slice(0, 4).map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.productItem}
                  onPress={() => mudarTela(item)}
                  activeOpacity={0.9}
                >
                  <View style={styles.ratingContainer}>
                    <AntDesign name="star" size={font(1.2)} color="#FFC700" />
                    <Text style={styles.ratingText}>
                      {item.rating || (item._id.charCodeAt(0) % 5) / 10 + 4.5}
                    </Text>
                  </View>
                  <Image
                    source={{ uri: item.url }}
                    style={styles.productImage}
                  />
                  <View style={styles.productTextContainer}>
                    <Text style={styles.text_preco}>
                      {formatarPreco(item.price)}
                    </Text>
                    <Text
                      style={styles.productName}
                      numberOfLines={1}
                    >{`Bicicleta KSW...`}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>
      </ScrollView>

      {/* Barra de Categorias Fixa no Rodapé (Estilo Instagram/Menu) */}
      <View style={styles.bottomCategoryBar}>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.bottomCategoryContent}
        >
          {isLoadingCategories ? (
            <Text style={styles.loadingText}>Carregando...</Text>
          ) : (
            categories.map((cat) => (
              <TouchableOpacity
                key={cat._id}
                style={styles.bottomCategoryItem}
                onPress={() => navigateToCategory(cat._id, cat.name)}
              >
                <View style={styles.bottomIconContainer}>
                  {getCategoryIcon(cat.name)}
                </View>
                <Text style={styles.bottomCategoryLabel} numberOfLines={1}>
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F4F6F8", // Fundo levemente cinza para destacar os cards brancos
  },
  scrollViewFlex: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: height(12), // Espaço extra para o conteúdo não ficar escondido atrás da barra fixa
    paddingTop: height(2),
  },

  // --- Estilos Padronizados de Texto (Vendas/E-commerce) ---
  sectionTitle: {
    fontSize: font(2.0), // ~18-20px
    fontWeight: "700",
    color: "#1A1A1A",
    marginBottom: height(1),
  },
  viewMoreText: {
    fontSize: font(1.4), // ~12-14px
    color: "#05419A",
    fontWeight: "600",
  },

  // --- Itens Alugados ---
  rentedItemsContainer: {
    backgroundColor: "#fff",
    width: width(92),
    borderRadius: width(3),
    alignSelf: "center",
    marginBottom: height(2.5),
    padding: width(4),
    elevation: 2, // Sombra leve no Android
    shadowColor: "#000", // Sombra no iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  rentedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height(1),
  },
  rentedList: {
    marginTop: height(0.5),
  },
  rentedItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height(1.2),
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
  },
  rentedImage: {
    width: width(14),
    height: width(14),
    borderRadius: width(2),
    marginRight: width(3),
    backgroundColor: "#f0f0f0",
  },
  rentedDetails: {
    flex: 1,
    justifyContent: "center",
  },
  rentedItemName: {
    fontSize: font(1.6), // ~14-16px
    fontWeight: "600",
    color: "#333",
    marginBottom: 2,
  },
  rentedItemPrice: {
    fontSize: font(1.6),
    color: "#05419A",
    fontWeight: "700",
  },
  perDayText: {
    fontSize: font(1.2),
    color: "#888",
    fontWeight: "400",
  },
  rentedItemDates: {
    fontSize: font(1.2),
    color: "#888",
    marginTop: 2,
  },

  // --- Lista de Produtos ---
  container3: {
    width: width(92),
    alignSelf: "center",
  },
  productList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productItem: {
    width: width(44),
    backgroundColor: "#fff",
    borderRadius: width(2),
    marginBottom: height(2),
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productImage: {
    width: "100%",
    height: width(40),
    resizeMode: "contain",
    backgroundColor: "#fff",
  },
  productTextContainer: {
    paddingHorizontal: width(2.5),
    paddingVertical: height(1),
  },
  text_preco: {
    color: "#05419A",
    fontSize: font(1.8), // ~16-18px (Padrão de preço)
    fontWeight: "700",
    marginBottom: 2,
  },
  productName: {
    fontSize: font(1.4), // ~12-14px (Nome do produto)
    color: "#555",
    fontWeight: "400",
  },
  ratingContainer: {
    position: "absolute",
    top: height(1),
    left: width(2),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 2,
    zIndex: 10,
  },
  ratingText: {
    color: "white",
    fontSize: font(1.2),
    fontWeight: "bold",
    marginLeft: 4,
  },

  // --- Barra Inferior Fixa (Categorias) ---
  bottomCategoryBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E5E5",
    height: height(10), // Altura fixa para a barra
    justifyContent: "center",
    elevation: 10, // Sombra forte para destacar que está flutuando
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  bottomCategoryContent: {
    alignItems: "center",
    paddingHorizontal: width(2),
  },
  bottomCategoryItem: {
    alignItems: "center",
    justifyContent: "center",
    width: width(20), // Largura fixa para cada item parecer uma "tab"
    height: "100%",
  },
  bottomIconContainer: {
    marginBottom: height(0.5),
    // Removi o círculo cinza para ficar mais limpo, estilo Instagram
  },
  bottomCategoryLabel: {
    fontSize: font(1.1), // ~10-11px (Padrão de label de menu inferior)
    color: "#333",
    textAlign: "center",
    fontWeight: "500",
  },
  loadingText: {
    paddingHorizontal: width(4),
    fontSize: font(1.4),
    color: "#666",
  },
});
