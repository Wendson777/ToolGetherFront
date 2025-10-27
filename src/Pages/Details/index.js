import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import Header from "../../Components/Header";
import { AntDesign } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

import { height, width, font } from "../../utils/responsive";

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

const RatingStars = ({ rating, size = font(2.5), color = "#FFC400" }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - Math.ceil(rating);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Ionicons name="star" size={size} color={color} key={`full-${i}`}/>
    );
  }

  if (hasHalfStar) {
    stars.push(
      <Ionicons name="star-half" size={size} color={color} key="half-star" />
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <AntDesign
        name="staro"
        size={size}
        color={color}
        key={`empty-${i}`}
      />
    );
  }

  return <View style={styles.ratingContainer}>{stars}</View>;
};

export default function Details({ route, navigation }) {
  const { produto } = route.params;

  const rating = produto.rating || 4.2;
  const reviewsCount = produto.reviewsCount || 120;

  const [isExpanded, setIsExpanded] = useState(false);
  const DESCRIPTION_MAX_LINES = 4;

  function navigateToRentCheckout() {
    navigation.navigate("RentCheckout", {
      product: produto,
    });
  }

  const descriptionText = produto.description || "Descrição não disponível.";
  const showMoreButton = descriptionText.split('\n').length > DESCRIPTION_MAX_LINES || descriptionText.length > 200;

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header navigation={navigation} showBackButton={true} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: produto.url || "https://via.placeholder.com/300" }}
            style={styles.mainImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.detailsContainer}>
          <Text style={styles.productName}>{produto.name}</Text>

          <View style={styles.ratingRow}>
            <RatingStars rating={rating} />
            <Text style={styles.reviewCountText}>
              ({reviewsCount} avaliações)
            </Text>
          </View>


          <View style={styles.priceContainer}>
            <Text style={styles.priceTag}>{formatarPreco(produto.price)}</Text>
            <Text style={styles.priceDuration}>/ dia</Text>
          </View>

          <Text style={styles.sectionTitle}>Descrição</Text>
          <Text
            style={styles.descriptionText}
            numberOfLines={isExpanded ? undefined : DESCRIPTION_MAX_LINES}
          >
            {descriptionText}
          </Text>

          {showMoreButton && (
            <TouchableOpacity onPress={toggleDescription} style={styles.readMoreButton}>
              <Text style={styles.readMoreText}>
                {isExpanded ? "Ver Menos" : "Ver Mais"}
              </Text>
              <AntDesign
                name={isExpanded ? "up" : "down"}
                size={font(1.25)}
                color="#2f2e2eff"
                style={styles.readMoreIcon}
              />
            </TouchableOpacity>
          )}

          <Text style={styles.sectionTitle}>Detalhes</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Disponibilidade:</Text>
            <Text style={styles.infoValue}>
              {produto.stock > 0
                ? `Em estoque (${produto.stock} unid.)`
                : "Esgotado"}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Localização:</Text>
            <Text style={styles.infoValue}>
              {produto.location || "Não informado"}
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.favoriteButton}>
          <Feather name="heart" size={font(4)} color="#05419A" />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buyNowButton,
            produto.stock <= 0 && styles.disabledButton,
          ]}
          onPress={navigateToRentCheckout}
          disabled={produto.stock <= 0}
        >
          <Text style={styles.buttonText}>
            ALUGAR
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingBottom: height(2.5),
  },
  imageContainer: {
    width: width(100),
    height: height(40),
    backgroundColor: "#f5f5f5",
    justifyContent: "center",
    alignItems: "center",
  },
  mainImage: {
    width: "100%",
    height: "100%",
  },
  detailsContainer: {
    padding: width(5),
  },
  productName: {
    fontSize: font(3.5),
    fontWeight: "bold",
    color: "#333",
    marginBottom: height(0.5),
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height(1.5),
  },
  ratingContainer: {
    flexDirection: "row",
    marginRight: width(2),
  },
  reviewCountText: {
    fontSize: font(1.8),
    color: "#666",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: height(2.5),
  },
  priceTag: {
    fontSize: font(4),
    fontWeight: "bold",
    color: "#FF6347",
  },
  priceDuration: {
    fontSize: font(2.2),
    color: "#666",
    marginLeft: width(1),
  },
  sectionTitle: {
    fontSize: font(2.5),
    fontWeight: "bold",
    color: "#05419A",
    marginTop: height(2),
    marginBottom: height(1),
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: height(0.6),
  },
  descriptionText: {
    fontSize: font(2),
    color: "#444",
    lineHeight: font(3),
    textAlign: "justify",
  },
  readMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: height(1),
    marginBottom: height(1.5),
  },
  readMoreText: {
    fontSize: font(2),
    color: "#2f2e2eff",
    fontWeight: "bold",
    marginRight: width(1),
  },
  readMoreIcon: {
    marginTop: 2,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: height(1),
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  infoLabel: {
    fontSize: font(2),
    fontWeight: "600",
    color: "#666",
  },
  infoValue: {
    fontSize: font(2),
    color: "#333",
  },
  footer: {
    flexDirection: "row",
    padding: width(4),
    borderTopWidth: 1,
    borderTopColor: "#eee",
    backgroundColor: "#fff",
  },
  favoriteButton: {
    width: width(15),
    height: width(15),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: width(7.5),
    borderWidth: 1,
    borderColor: "#05419A",
    marginRight: width(2.5),
  },
  buyNowButton: {
    flex: 1,
    backgroundColor: "#05419A",
    padding: height(1),
    borderRadius: width(7.5),
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
  buttonText: {
    color: "#fff",
    fontSize: font(3),
    fontWeight: "bold",
  },
});