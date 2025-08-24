import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../../Pages/Home";
import Login from "../../Pages/Login";

const Drawer = createDrawerNavigator();

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
      <Drawer.Screen name="Login" component={Login} />
    </Drawer.Navigator>
  );
}
