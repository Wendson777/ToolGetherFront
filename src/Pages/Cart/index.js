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
import { AntDesign } from "@expo/vector-icons";
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
      image: require('../../../assets/images/betoneira.jpg'),
    },
    {
      id: 2,
      name: "Bicicleta GTSM",
      price: 49.99,
      days: 2,
      dates: "11/03/25 - 12/03/25",
      image: require('../../../assets/images/bicicleta.webp'),
    },
    {
      id: 3,
      name: "Kit Câmera DSLR Nikon",
      price: 150.0,
      days: 5,
      dates: "20/03/25 - 25/03/25",
      image: require('../../../assets/images/kitcamera.jpg'),
    },
  ]);

  const removeItemFromCart = (itemId) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce(
      (sum, item) => sum + item.price * item.days,
      0
    );
  };

  const subtotal = calculateSubtotal();
  const total = subtotal;

  const CartItem = ({ item }) => {
    const itemTotal = item.price * item.days;

    let imageSource;

    if (typeof item.image === 'string' && item.image.startsWith('http')) {
        imageSource = { uri: item.image };
    } else if (typeof item.image === 'number') {
        imageSource = item.image;
    } else {
        imageSource = require('../../../assets/images/betoneira.jpg');
    }

    return (
      <View style={cartStyles.cartItem}>
        <Image
          source={imageSource}
          style={cartStyles.cartImage}
        />
        <View style={cartStyles.cartDetails}>
          <Text style={cartStyles.cartItemName} numberOfLines={1}>{item.name}</Text>
          <Text style={cartStyles.cartItemPrice}>
            {formatarPreco(item.price)}/dia (x{item.days} dias)
          </Text>
          <Text style={cartStyles.cartItemDates}>Período: {item.dates}</Text>
          <Text style={cartStyles.cartItemTotal}>
            Total: {formatarPreco(itemTotal)}
          </Text>
        </View>
        <TouchableOpacity
          style={cartStyles.removeButton}
          onPress={() => removeItemFromCart(item.id)}
        >
          <MaterialIcons name="delete-outline" size={font(3)} color="#FF0000" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={cartStyles.mainContainer}>
      <Header navigation={navigation}/>

      {cartItems.length === 0 ? (
        <View style={cartStyles.emptyCartContainer}>
          <Feather name="shopping-cart" size={font(8)} color="#ccc" />
          <Text style={cartStyles.emptyCartText}>Seu carrinho está vazio!</Text>
          <TouchableOpacity
            style={cartStyles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={cartStyles.backButtonText}>Voltar às Compras</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <ScrollView
            style={cartStyles.scrollViewFlex}
            contentContainerStyle={cartStyles.scrollContent}
          >
            <View style={cartStyles.cartListContainer}>
              <Text style={cartStyles.sectionTitle}>Itens para Alugar</Text>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </View>

            <View style={cartStyles.summaryContainer}>
              <Text style={cartStyles.sectionTitle}>Resumo do Pedido</Text>
              <View style={cartStyles.summaryRow}>
                <Text style={cartStyles.summaryText}>Subtotal</Text>
                <Text style={cartStyles.summaryText}>
                  {formatarPreco(subtotal)}
                </Text>
              </View>
              <View style={cartStyles.summaryRow}>
                <Text style={cartStyles.summaryText}>Taxa de Serviço</Text>
                <Text style={cartStyles.summaryText}>R$ 0,00</Text>
              </View>
              <View style={cartStyles.divider} />
              <View style={cartStyles.summaryRow}>
                <Text style={cartStyles.totalText}>Total a Pagar</Text>
                <Text style={cartStyles.totalValue}>
                  {formatarPreco(total)}
                </Text>
              </View>
            </View>

            <View style={{ height: height(12) }} />
          </ScrollView>

          <View style={cartStyles.checkoutButtonContainer}>
            <TouchableOpacity
              style={cartStyles.checkoutButton}
              onPress={() => alert("Função de Checkout implementada!")}
            >
              <Text style={cartStyles.checkoutButtonText}>
                Finalizar Aluguel {formatarPreco(total)}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const cartStyles = StyleSheet.create({
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
    cartListContainer: {
        marginTop: height(2),
        marginBottom: height(3),
    },
    sectionTitle: {
        fontSize: font(2.2),
        fontWeight: "bold",
        color: "#05419A",
        marginBottom: height(1.5),
    },
    cartItem: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: height(1.5),
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    cartImage: {
        width: width(18),
        height: width(18),
        borderRadius: width(2),
        marginRight: width(4),
        backgroundColor: '#f0f0f0',
    },
    cartDetails: {
        flex: 1,
        justifyContent: "center",
    },
    cartItemName: {
        fontSize: font(1.9),
        fontWeight: "bold",
        color: "#333",
    },
    cartItemPrice: {
        fontSize: font(1.6),
        color: "#666",
        marginVertical: height(0.1),
    },
    cartItemDates: {
        fontSize: font(1.4),
        color: "#999",
    },
    cartItemTotal: {
        fontSize: font(1.8),
        fontWeight: "bold",
        color: "#05419A",
        marginTop: height(0.5),
    },
    removeButton: {
        padding: width(2),
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
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: width(4),
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#eee',
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: width(8),
    },
    emptyCartText: {
        fontSize: font(2.5),
        color: '#999',
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
    }
});