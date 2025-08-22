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

export default function Actions() {
  return (
    <View style={styles.container}>
      <Header />

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
      <View>
        <Text>Baseado no que você viu</Text>
      </View>
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
  },
  title: {
    fontSize: 18,
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
});
