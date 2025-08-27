import { View, Text, StyleSheet } from "react-native";
export default function Cart() {
  return (
    <View style={styles.teste}>
      <Text style={{ fontSize: 30 }}>Carrinho de compras</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  teste: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
