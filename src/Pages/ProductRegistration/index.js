// src/Pages/ProductRegistration.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Header from "../../Components/Header";
// 🚨 Importação das funções responsivas
import { height, width, font } from "../../utils/responsive";

export default function ProductRegistration({ navigation }) {
  const [productName, setProductName] = useState("");
  const [productValue, setProductValue] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [description, setDescription] = useState("");
  const [selectedImages, setSelectedImages] = useState(0);

  useEffect(() => {
    StatusBar.setBarStyle("light-content", true);
    StatusBar.setBackgroundColor("#05419A");
  }, []);

  const handleQuantityChange = (type) => {
    setQuantity((prev) => {
      if (type === "increment") {
        return prev + 1;
      } else if (type === "decrement" && prev > 1) {
        return prev - 1;
      }
      return prev;
    });
  };

  const handleImageSelection = () => {
    setSelectedImages((prev) => prev + 1);
    Alert.alert("Ação", "Abrir o seletor de imagens.");
  };

  const handleRegistration = () => {
    if (!productName || !productValue || !description || selectedImages === 0) {
      Alert.alert(
        "Erro",
        "Por favor, preencha todos os campos e selecione pelo menos uma imagem."
      );
      return;
    }

    Alert.alert(
      "Sucesso (Simulado)",
      `Produto "${productName}" pronto para ser enviado ao backend!`
    );
    console.log({
      productName,
      productValue,
      quantity,
      description,
      selectedImages,
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header navigation={navigation} showBackButton={true} />

      <View style={styles.mainContent}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <Text style={styles.title}>Cadastro de Produto</Text>

          <TextInput
            style={styles.input}
            placeholder="Digite o nome do produto..."
            placeholderTextColor="#999"
            value={productName}
            onChangeText={setProductName}
          />

          <TextInput
            style={styles.input}
            placeholder="Digite o valor do produto..."
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={productValue}
            onChangeText={(text) =>
              setProductValue(text.replace(/[^0-9,.]/g, ""))
            }
          />

          <View style={styles.quantityContainer}>
            <Text style={styles.quantityLabel}>Quantidade disponível</Text>
            <View style={styles.quantityControls}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange("decrement")}
                disabled={quantity <= 1}
              >
                <Text
                  style={[
                    styles.quantityButtonText,
                    quantity <= 1 && { opacity: 0.5 },
                  ]}
                >
                  -
                </Text>
              </TouchableOpacity>
              <Text style={styles.quantityInput}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange("increment")}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Digite a descrição do produto..."
            placeholderTextColor="#999"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
          />

          <TouchableOpacity
            style={styles.imagePicker}
            onPress={handleImageSelection}
          >
            {/* O size do Ionicons pode precisar ser ajustado manualmente ou usando font() */}
            <Ionicons name="image-outline" size={font(4)} color={"#05419A"} />
            <Text style={styles.imagePickerText}>Selecione as imagens...</Text>
            {selectedImages > 0 && (
              <Text style={styles.imageCountText}>
                ({selectedImages} selecionada{selectedImages > 1 ? "s" : ""})
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleRegistration}
        >
          <Text style={styles.submitButtonText}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#05419A",
  },
  mainContent: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContent: {
    paddingHorizontal: width(5), // 20px / ~375px de largura = ~5.3%
    paddingTop: height(1.5), // 10px / ~667px de altura = ~1.5%
    paddingBottom: height(3), // 20px / ~667px de altura = ~3%
  },
  title: {
    fontSize: font(3.8), // Aprox. 24px
    fontWeight: "bold",
    marginBottom: height(2.5), // Aprox. 20px
    color: "#05419A",
    textAlign: "center", // Alterado para left para seguir o padrão da imagem
  },
  input: {
    height: height(6.5), // Aprox. 50px
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: width(4), // Aprox. 15px
    marginBottom: height(2), // Aprox. 15px
    fontSize: font(2.3), // Aprox. 16px
    color: "#333",
    backgroundColor: "#fff",
  },
  textArea: {
    height: height(15), // Aprox. 100px
    textAlignVertical: "top",
    paddingTop: height(2), // Aprox. 15px
  },
  quantityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width(4),
    height: height(6.5),
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: height(2),
    backgroundColor: "#fff",
  },
  quantityLabel: {
    fontSize: font(2.3), // Aprox. 16px
    color: "#333",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    paddingHorizontal: width(2.5), // Aprox. 10px
  },
  quantityButtonText: {
    fontSize: font(3.3), // Aprox. 22px
    fontWeight: "bold",
    color: "#05419A",
  },
  quantityInput: {
    fontSize: font(2.8), // Aprox. 18px
    width: width(8), // Aprox. 30px
    textAlign: "center",
    color: "#333",
  },
  imagePicker: {
    flexDirection: "row",
    alignItems: "center",
    height: height(8), // Aprox. 60px
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: width(4),
    marginBottom: height(2),
    backgroundColor: "#fff",
  },
  imagePickerText: {
    marginLeft: width(2.5), // Aprox. 10px
    fontSize: font(2.3), // Aprox. 16px
    color: "#05419A",
    fontWeight: "600",
  },
  imageCountText: {
    marginLeft: width(2.5),
    fontSize: font(2), // Aprox. 14px
    color: "#666",
  },
  submitButton: {
    backgroundColor: "#05419A",
    paddingVertical: height(2.5), // Aprox. 18px
    alignItems: "center",
    justifyContent: "center",
    width: width(100),
  },
  submitButtonText: {
    color: "#fff",
    fontSize: font(3), // Aprox. 20px
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  simulatedSendIcon: {
    position: "absolute",
    bottom: height(2), // Aprox. 20px
    right: width(8), // Aprox. 30px
    padding: width(1.5),
    zIndex: 10,
  },
});
