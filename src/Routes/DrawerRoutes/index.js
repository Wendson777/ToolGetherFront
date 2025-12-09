import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../../Pages/Home";
import Userconfig from "../../Pages/Userconfig";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";
import NotificationListScreen from "../../Pages/NotificationListScreen";
import MyProducts from "../../Pages/MyProducts";

import ProductRegistration from "../../Pages/ProductRegistration";

import Chats from "../../Pages/Chats";
import { Text, TouchableOpacity } from "react-native";
import { height, width, font } from "../../utils/responsive";
import DrawerNotificationLabel from "../../Pages/DrawerNotificationLabel";

const Drawer = createDrawerNavigator();

const useTotalUnreadChats = () => {
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
  const unreadCount = useTotalUnreadChats();

  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerType: "slide",
        drawerStyle: {
          width: width(75),
          backgroundColor: "#05419A",
        },
        drawerActiveTintColor: "#F5F5F5",
        drawerInactiveTintColor: "#DCDCDC",
        drawerActiveBackgroundColor: "#0A58B5",
        drawerLabelStyle: {
          fontSize: font(2.5),
          marginLeft: width(0),
          fontWeight: "500",
        },
        drawerItemStyle: {
          borderBottomWidth: 1,
          borderBottomColor: "rgba(255, 255, 255, 0.2)",
          paddingVertical: height(2),
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerItemStyle: { height: height(0), overflow: "hidden" },
        }}
      />

      <Drawer.Screen
        name="Meu perfil"
        component={Userconfig}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={32} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Meus produtos"
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
        name="Notificações"
        component={NotificationListScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="notifications-outline" size={32} color={color} />
          ),
        }}
      />

      <Drawer.Screen
        name="ChatScreen"
        component={Chats}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles-outline" size={32} color={color} />
          ),
          drawerLabel: ({ focused, color }) => (
            <DrawerNotificationLabel
              label="Chat"
              focused={focused}
              color={color}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="LogoutFunction"
        component={Logout}
        options={{
          drawerItemStyle: { height: 0, overflow: "hidden" },
        }}
      />
    </Drawer.Navigator>
  );
}
