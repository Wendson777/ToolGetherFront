import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  SafeAreaView, // Mantido para segurança
} from "react-native";

import React, { useState, useEffect } from "react";
import Header from "../../Components/Header";

// Importações de Ícones (Mantidas)
import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { AntDesign } from "@expo/vector-icons";

function formatarPreco(valor) {
  if (typeof valor !== "number" || isNaN(valor)) {
    console.error("Entrada inválida. Por favor, forneça um número.");
    return null;
  }

  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return formatter.format(valor);
}

export default function Home() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  async function getProducts() {
    try {
      setIsError(false);
      setIsLoading(true);
      const response = await fetch("https://dummyjson.com/products");
      const productsData = await response.json();
      setProducts(productsData?.products);
    } catch (err) {
      setIsError(true);
      alert("Erro ao buscar produtos, tente novamente mais tarde!");
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    
    <SafeAreaView style={styles.safeArea}>
     
      <Header />

      {/* 3. ScrollView que ocupa o espaço restante (flex: 1) e rola o conteúdo */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Carrossel horizontal (Mantido) */}
        <ScrollView
          style={styles.carrossel}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >
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
          {isError && <Text>Opssss.... erro ao buscar produtos</Text>}

          {isLoading ? (
            <Text>Carregando produtos...</Text>
          ) : (
            // Listagem com .map()
            <View style={styles.productList}>
              {products.map((item) => (
                <View key={item.id.toString()} style={styles.productItem}>
                  <Text>{item.title}</Text>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={{ width: 100, height: 100 }}
                  />
                  <Text>{formatarPreco(item.price)}</Text>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// -------------------------------------------------------------------

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
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
  },
  container3: {
    width: "100%",
    paddingHorizontal: 20,
  },
  productList: {
    paddingBottom: 20,
  },
  productItem: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 10,
  },
});
