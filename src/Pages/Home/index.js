import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "../../Components/Header";

import Octicons from "@expo/vector-icons/Octicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { AntDesign } from "@expo/vector-icons";

const list = [
  {
    id: 1,
    label: "Bicicleta",
    value: "300,90",
    date: "17/09/2025",
    type: 0, //debito
  },

  {
    id: 2,
    label: "Furadeira",
    value: "500,00",
    date: "17/09/2025",
    type: 1, //credito
  },
  {
    id: 3,
    label: "Martelo",
    value: "500,00",
    date: "17/09/2025",
    type: 1, //credito
  },
];

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />

      <View style={styles.ultimosItens}>
        <Text style={styles.title}>Ultimos Itens Alugados</Text>
      </View>
      <View style={styles.container3}>
        <View>
          <Text style={styles.titleContainer3}>Baseado no que você viu</Text>
        </View>
      </View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  ultimosItens: {
    backgroundColor: "#999",
    width: "90%",
    height: "30%",
    borderRadius: 18,
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
  },
  container3: {
    justifyContent: "flex-start",
    alignItems: "flex-start",
    flex: 1,
    width: "100%",
    padding: 20,
  },
});
