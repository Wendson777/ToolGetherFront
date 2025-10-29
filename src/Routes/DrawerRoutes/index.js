import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../../Pages/Home";
import Userconfig from "../../Pages/Userconfig";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import NotificationListScreen from "../../Pages/NotificationListScreen";
import DrawerNotificationLabel from "../../Pages/DrawerNotificationLabel";
import MyProducts from "../../Pages/MyProducts";
import ProductRegistration from "../../Pages/ProductRegistration";

const Drawer = createDrawerNavigator();

// 🚨 SIMULAÇÃO: Hook para a contagem, para ser usado no drawerIcon
const useTotalUnreadChats = () => {
  // Retorna a contagem da simulação
  // (A contagem REAL está sendo obtida dentro do DrawerNotificationLabel)
  return 3;
};

function Logout({ navigation }) {
  React.useEffect(() => {
    async function doLogout() {
      try {
        await AsyncStorage.removeItem("user");
        await AsyncStorage.removeItem("token");

        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: "Home" }],
          })
        );
      } catch (error) {
        console.log("Erro ao fazer logout:", error);
      }
    }
    doLogout();
  }, [navigation]);

  return null;
}

export default function DrawerRoutes() {
  const unreadCount = useTotalUnreadChats(); // Obtém a contagem de notificação

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 250 },
        drawerActiveTintColor: "#05419A", // Cor do texto/ícone ativo
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Meu Perfil"
        component={Userconfig}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Meus Produtos"
        component={MyProducts}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="archive-outline" size={size} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="Cadastro de Produtos"
        component={ProductRegistration}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="archive-outline" size={size} color={color} />
          ),
        }}
      />
      {/* 🚨 NOVA ROTA DE CHATS E SOLICITAÇÕES */}
      <Drawer.Screen
        name="ChatsAndRequests"
        component={NotificationListScreen}
        options={{
          // Ícone dinâmico: usa 'chatbubbles' se houver mensagens não lidas
          drawerIcon: ({ color, size }) => (
            <Ionicons
              name={unreadCount > 0 ? "chatbubbles" : "chatbubbles-outline"}
              size={size}
              color={color}
            />
          ),
          // Rótulo personalizado com a contagem de notificação (badge)
          drawerLabel: ({ focused, color }) => (
            <DrawerNotificationLabel
              label="Chat"
              // O count é passado internamente no componente para fins de estilização.
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Logout"
        component={Logout}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}
