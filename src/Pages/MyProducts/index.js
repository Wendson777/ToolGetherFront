import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import React, { useState } from "react";
import Header from "../../Components/Header";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { height, width, font } from "../../utils/responsive";
import Feather from "@expo/vector-icons/Feather";

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

export default function CartScreen({ navigation }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Betoneira 400l",
      price: 99.99,
      days: 10,
      dates: "01/03/25 - 10/03/25",
      image: require("../../../assets/images/betoneira.jpg"),
    },
    {
      id: 2,
      name: "Bicicleta GTSM",
      price: 49.99,
      days: 2,
      dates: "11/03/25 - 12/03/25",
      image: require("../../../assets/images/bicicleta.webp"),
    },
    {
      id: 3,
      name: "Kit Câmera DSLR Nikon",
      price: 150.0,
      days: 5,
      dates: "20/03/25 - 25/03/25",
      image: require("../../../assets/images/kitcamera.jpg"),
    },
  ]);

  const removeItemFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.price * item.days, 0);
  };

  const subtotal = calculateSubtotal();
  const total = subtotal;

  return (
    <View style={styles.mainContainer}>
      <Header navigation={navigation} showBackButton={true} />

      {cartItems.length === 0 ? (
        <View style={styles.emptyCartContainer}>
          <Feather name="shopping-cart" size={font(8)} color="#ccc" />
          <Text style={styles.emptyCartText}>Seus favoritos está vazio!</Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar às Compras</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollViewFlex}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.sectionTitle}>Meus Produtos</Text>

            <View style={styles.gridContainer}>
              {cartItems.map((item) => (
                <View key={item.id} style={styles.gridItem}>
                  <Image source={item.image} style={styles.gridImage} />
                  <Text style={styles.gridName} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <Text style={styles.gridPrice}>
                    {formatarPreco(item.price)}/dia
                  </Text>
                  <TouchableOpacity
                    style={styles.removeButtonGrid}
                    onPress={() => removeItemFromCart(item.id)}
                  >
                    <MaterialIcons
                      name="delete-outline"
                      size={font(3)}
                      color="#FF0000"
                    />
                  </TouchableOpacity>
                </View>
              ))}
            </View>

            {/* <View style={styles.summaryContainer}>
              <Text style={styles.sectionTitle}>Resumo do Pedido</Text>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Subtotal</Text>
                <Text style={styles.summaryText}>
                  {formatarPreco(subtotal)}
                </Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={styles.summaryText}>Taxa de Serviço</Text>
                <Text style={styles.summaryText}>R$ 0,00</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryRow}>
                <Text style={styles.totalText}>Total a Pagar</Text>
                <Text style={styles.totalValue}>{formatarPreco(total)}</Text>
              </View>
            </View> */}

            <View style={{ height: height(12) }} />
          </ScrollView>

          {/* <View style={styles.checkoutButtonContainer}>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() => alert("Função de Checkout implementada!")}
            >
              <Text style={styles.checkoutButtonText}>
                Finalizar Aluguel {formatarPreco(total)}
              </Text>
            </TouchableOpacity>
          </View> */}
        </>
      )}
    </View>
  );
}

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
    paddingHorizontal: width(4),
    paddingBottom: height(2),
  },
  sectionTitle: {
    fontSize: font(2.2),
    fontWeight: "bold",
    color: "#05419A",
    marginBottom: height(1.5),
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  gridItem: {
    width: "48%",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: width(2),
    marginBottom: height(2),
    padding: width(2),
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  gridImage: {
    width: "100%",
    height: width(40),
    borderRadius: width(2),
    marginBottom: height(1),
  },
  gridName: {
    fontSize: font(1.9),
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  gridPrice: {
    fontSize: font(1.6),
    color: "#05419A",
    fontWeight: "bold",
    textAlign: "center",
  },
  removeButtonGrid: {
    position: "absolute",
    top: width(2),
    right: width(2),
    padding: width(1),
  },
  summaryContainer: {
    padding: width(4),
    backgroundColor: "#f9f9f9",
    borderRadius: width(3),
    marginBottom: height(2),
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: height(0.5),
  },
  summaryText: {
    fontSize: font(1.8),
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: height(1),
  },
  totalText: {
    fontSize: font(2.2),
    fontWeight: "bold",
    color: "#333",
  },
  totalValue: {
    fontSize: font(2.2),
    fontWeight: "bold",
    color: "#05419A",
  },
  checkoutButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    padding: width(4),
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#eee",
    elevation: 10,
  },
  checkoutButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: height(2),
    borderRadius: width(2),
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "white",
    fontSize: font(2.2),
    fontWeight: "bold",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: width(8),
  },
  emptyCartText: {
    fontSize: font(2.5),
    color: "#999",
    marginTop: height(2),
    marginBottom: height(3),
  },
  backButton: {
    backgroundColor: "#05419A",
    paddingVertical: height(1.5),
    paddingHorizontal: width(6),
    borderRadius: width(2),
  },
  backButtonText: {
    color: "white",
    fontSize: font(2),
    fontWeight: "bold",
  },
});
