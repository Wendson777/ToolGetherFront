import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../../Pages/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CommonActions } from "@react-navigation/native";

const Drawer = createDrawerNavigator();

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

  return null; // não renderiza nada
}

export default function DrawerRoutes() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false, // vamos usar nosso Header customizado
        drawerStyle: { width: 250 }, // largura do menu lateral
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={Home} />

      <Drawer.Screen name="Logout" component={Logout} />
    </Drawer.Navigator>
  );
}
