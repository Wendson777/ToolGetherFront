import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import Header from "../../Components/Header";
import { AntDesign, Feather } from "@expo/vector-icons";

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

export default function Details({ route, navigation }) {
  const { produto } = route.params;

  if (!produto) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Produto não encontrado! 🙁</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image
          source={{ uri: produto.url || "https://via.placeholder.com/300" }}
          style={styles.productImage}
          resizeMode="cover"
        />

        <View style={styles.detailsBox}>
          <View style={styles.headerInfo}>
            <Text style={styles.productName}>{produto.name}</Text>
            <Text style={styles.productPrice}>
              {formatarPreco(produto.price)}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Feather name="briefcase" size={18} color="#05419A" />
            <Text style={styles.infoText}>Fabricante:</Text>
            <Text style={styles.infoValue}>
              {produto.manufacturer || "Não Informado"}
            </Text>
          </View>

          <Text style={styles.productDescription}>{produto.description}</Text>

          {/* <Text style={styles.sectionTitle}>Detalhes Adicionais</Text>

          <View style={styles.footerRow}>
            <Feather name="tag" size={16} color="#333" />
            <Text style={styles.footerText}>Categoria ID:</Text>
            <Text style={styles.footerValue}>
              {produto.category || "ID Desconhecido"}
            </Text>
          </View>

          <View style={styles.footerRow}>
            <Feather name="user" size={16} color="#333" />
            <Text style={styles.footerText}>ID do Dono:</Text>
            <Text style={styles.footerValue}>
              {produto.idOwner || "ID Desconhecido"}
            </Text>
          </View> */}

          <TouchableOpacity
            style={styles.buyNowButton}
            disabled={produto.stock <= 0}
          >
            <Text style={styles.buttonText}>Alugar Agora</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.addToCartButton}
            disabled={produto.stock <= 0}
          >
            <Text style={styles.buttonText}>Consultar Loja</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const buttonBase = {
  padding: 15,
  borderRadius: 8,
  alignItems: "center",
  marginBottom: 10,
  width: "90%",
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: 40,
  },

  backImageButton: {
    position: "absolute",
    top: 10,
    left: 20,
    zIndex: 10,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 20,
    padding: 5,
  },

  productImage: {
    width: "100%",
    height: 350,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  detailsBox: {
    paddingHorizontal: 20,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerInfo: {
    // flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },
  productName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",
    flexShrink: 1,
    marginRight: 10,
    textAlign: "center",
  },
  productPrice: {
    fontSize: 26,
    fontWeight: "900",
    color: "#05419A",
    textAlign: "center",
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  infoText: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    marginRight: 5,
    color: "#333",
  },
  infoValue: {
    fontSize: 16,
    color: "#666",
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#05419A",
    marginTop: 20,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: "#05419A50",
    paddingBottom: 5,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    color: "#444",
    padding: 10,
  },

  footerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "bold",
    marginLeft: 8,
    color: "#555",
  },
  footerValue: {
    fontSize: 14,
    color: "#777",
    marginLeft: 5,
  },

  rentButton: {
    backgroundColor: "#FF6347",
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    elevation: 5,
  },
  rentButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 20,
    color: "red",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#05419A",
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  actionButtonContainer: {
    padding: 15,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  addToCartButton: {
    ...buttonBase,
    backgroundColor: "#00A86B",
  },
  buyNowButton: {
    ...buttonBase,
    backgroundColor: "#6A5ACD",
    marginBottom: 12,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "bold",
  },
});
