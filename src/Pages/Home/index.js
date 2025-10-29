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

// Importações de Ícones
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { height, width, font } from "../../utils/responsive"; // 👈 FUNÇÕES RESPONSIVAS
import { AntDesign } from "@expo/vector-icons";

// --- FUNÇÕES DE LÓGICA (MANTIDAS) ---
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

  return formatter.format(valor).replace(/\s/g, ""); // Remove espaço após o R$
}

function getCategoryIcon(name) {
  const lowerName = name ? name.toLowerCase() : "";
  if (lowerName.includes("ferramenta"))
    return <Octicons name="tools" size={font(3)} color="black" />;
  if (lowerName.includes("mobilidade"))
    return <MaterialIcons name="pedal-bike" size={font(3)} color="black" />;
  if (lowerName.includes("evento"))
    return (
      <FontAwesome6 name="champagne-glasses" size={font(3)} color="black" />
    );
  if (lowerName.includes("equipamento") || lowerName.includes("câmera"))
    return <MaterialIcons name="camera-alt" size={font(3)} color="black" />;
  if (lowerName.includes("futebol") || lowerName.includes("esporte"))
    return <FontAwesome name="soccer-ball-o" size={font(3)} color="black" />;
  return <AntDesign name="appstore-o" size={font(3)} color="black" />;
}

export default function Home({ navigation }) {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isError, setIsError] = useState(false);

  // Simulação de itens alugados para o layout
  const rentedItems = [
    {
      id: 1,
      name: "Betoneira 400l",
      price: 99.99,
      dates: "01/03/25 - 10/03/25",
      image: "https://via.placeholder.com/60x60/F0D900/000000?text=B",
    },
    {
      id: 2,
      name: "Bicicleta GTSM",
      price: 49.99,
      dates: "11/03/25 - 12/02/25",
      image: "https://via.placeholder.com/60x60/999999/FFFFFF?text=B",
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

  // --- RENDERIZAÇÃO ---
  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} />

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
            <Text style={{ paddingHorizontal: width(4), alignSelf: "center" }}>
              Carregando categorias...
            </Text>
          ) : (
            categories.map((cat, index) => (
              <TouchableOpacity
                key={cat._id}
                style={[
                  styles.actionButton,
                  // Adiciona um padding extra para o último item para não cortar a rolagem
                  index === categories.length - 1 && {
                    paddingRight: width(4),
                  },
                ]}
                onPress={() => navigateToCategory(cat._id, cat.name)}
              >
                <View style={styles.areaButton}>
                  {getCategoryIcon(cat.name)}
                </View>
                {/* O texto "Futebol" é o mais longo na imagem, 
                    então o font(1.6) ajusta bem para duas linhas. */}
                <Text style={styles.labelButton}>{cat.name}</Text>
              </TouchableOpacity>
            ))
          )}
        </ScrollView>
        <View style={styles.carrosselDivider} />

        {/* ÚLTIMOS ITENS ALUGADOS */}
        <View style={styles.rentedItemsContainer}>
          <View style={styles.rentedHeader}>
            <Text style={styles.rentedTitle}>Últimos itens alugados</Text>
            <TouchableOpacity>
              <Text style={styles.rentedViewMore}>Ver mais</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.rentedList}>
            {rentedItems.map((item) => (
              <View key={item.id} style={styles.rentedItem}>
                <Image
                  source={{ uri: item.image }}
                  style={styles.rentedImage}
                />
                <View style={styles.rentedDetails}>
                  <Text style={styles.rentedItemName}>{item.name}</Text>
                  <Text style={styles.rentedItemPrice}>
                    {formatarPreco(item.price)} por dia
                  </Text>
                  <Text style={styles.rentedItemDates}>{item.dates}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* BASEADO NO QUE VOCÊ VIU */}
        <View style={styles.container3}>
          <Text style={styles.titleContainer3}>Baseado no que você viu</Text>
          {isError && (
            <Text style={{ fontSize: font(2), color: "red" }}>
              Opssss.... erro ao buscar produtos
            </Text>
          )}

          {isLoadingProducts ? (
            <Text style={{ fontSize: font(2) }}>Carregando produtos...</Text>
          ) : (
            <View style={styles.productList}>
              {/* O map foi limitado a 4 itens para se assemelhar ao layout da imagem */}
              {products.slice(0, 4).map((item) => (
                <TouchableOpacity
                  key={item._id}
                  style={styles.productItem}
                  onPress={() => mudarTela(item)}
                  activeOpacity={0.7}
                >
                  {/* Ícone de avaliação (Estrela) */}
                  <View style={styles.ratingContainer}>
                    <AntDesign name="star" size={font(1.5)} color="#FFC700" />
                    <Text style={styles.ratingText}>
                      {/* Simulação de avaliação */}
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
                    {/* Linha para garantir que o nome do produto não quebre o layout */}
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
    </View>
  );
}

// --- ESTILOS RESPONSIVOS ---
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewFlex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: "#fff",
  },

  // ------------------------------------
  // ESTILOS: CARROSSEL DE CATEGORIAS
  // ------------------------------------
  carrossel: {
    maxHeight: height(12), // Altura aproximada para 60px de ícone + 20px de texto
    paddingVertical: height(1.5),
    paddingHorizontal: width(4),
  },
  actionButton: {
    alignItems: "center",
    marginRight: width(7), // Espaçamento entre os ícones
  },
  areaButton: {
    backgroundColor: "#ecf0ff", // Fundo mais claro para os ícones
    height: width(12), // 60px em width(100)
    width: width(12),
    alignItems: "center",
    borderRadius: width(6),
    justifyContent: "center",
  },
  labelButton: {
    marginTop: height(0.5),
    textAlign: "center",
    fontWeight: "600",
    fontSize: font(1.6), // Tamanho de fonte pequeno
    width: width(12), // Fixa a largura para o texto quebrar corretamente
  },
  carrosselDivider: {
    height: height(0.1),
    backgroundColor: "#E0E0E0",
    marginHorizontal: width(4),
    marginBottom: height(1.5),
  },

  // ------------------------------------
  // ESTILOS: ÚLTIMOS ITENS ALUGADOS
  // ------------------------------------
  rentedItemsContainer: {
    backgroundColor: "#f5f5f5", // Cor de fundo do bloco
    width: width(92),
    minHeight: height(25), // Altura mínima para dois itens
    borderRadius: width(4),
    alignSelf: "center",
    marginBottom: height(2),
    padding: width(4),
  },
  rentedHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height(1),
  },
  rentedTitle: {
    fontSize: font(2.2),
    fontWeight: "bold",
    color: "#333",
  },
  rentedViewMore: {
    fontSize: font(1.8),
    color: "#666",
  },
  rentedList: {
    marginTop: height(1),
  },
  rentedItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: height(1),
  },
  rentedImage: {
    width: width(15), // 60px
    height: width(15),
    borderRadius: width(1),
    marginRight: width(4),
    backgroundColor: "white", // Adiciona fundo para placeholder
  },
  rentedDetails: {
    flex: 1,
    justifyContent: "center",
  },
  rentedItemName: {
    fontSize: font(1.8),
    fontWeight: "bold",
    color: "#333",
  },
  rentedItemPrice: {
    fontSize: font(1.6),
    color: "#05419A",
    fontWeight: "bold",
    marginVertical: height(0.1),
  },
  rentedItemDates: {
    fontSize: font(1.4),
    color: "#666",
  },

  // ------------------------------------
  // ESTILOS: BASEADO NO QUE VOCÊ VIU (LISTA DE PRODUTOS)
  // ------------------------------------
  titleContainer3: {
    color: "#05419A",
    fontSize: font(2.5), // Tamanho para o título grande
    marginBottom: height(1.5),
    fontWeight: "bold",
  },
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
    width: width(44), // Garante dois itens por linha com espaçamento
    backgroundColor: "#f9f9f9",
    borderRadius: width(2),
    marginBottom: height(2),
    overflow: "hidden", // Importante para o rating ficar no topo
  },
  productImage: {
    width: "100%",
    height: width(40), // Altura proporcional à largura do item
    resizeMode: "contain",
    marginBottom: height(1),
    backgroundColor: "white", // Fundo branco para a imagem
  },
  productTextContainer: {
    paddingHorizontal: width(2),
    paddingBottom: height(1),
  },
  text_preco: {
    color: "#05419A",
    fontSize: font(2.5), // Fonte grande para o preço
    fontWeight: "bold",
    marginVertical: height(0.5),
  },
  productName: {
    fontSize: font(1.8),
    color: "#333",
    marginBottom: height(0.5),
  },
  ratingContainer: {
    position: "absolute",
    top: height(1),
    left: width(2),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: width(1),
    paddingHorizontal: width(1),
    paddingVertical: height(0.2),
    zIndex: 10, // Garante que a estrela fique por cima da imagem
  },
  ratingText: {
    color: "white",
    fontSize: font(1.6),
    fontWeight: "bold",
    marginLeft: width(0.5),
  },
});
