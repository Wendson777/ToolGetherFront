import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "./src/Pages/Splash";
// import Home from "./src/Pages/Home";
import Login from "./src/Pages/Login";
import Register from "./src/Pages/Register";
import Cart from "./src/Pages/Cart";
import DrawerRoutes from "./src/Routes/DrawerRoutes";
import Details from "./src/Pages/Details";
import CategoryProducts from "./src/Pages/CategoryProducts";
import RentCheckout from "./src/Pages/RentCheckout";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Home"
          component={DrawerRoutes}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="Details"
          component={Details}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="CategoryProducts"
          component={CategoryProducts}
        />

        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="RentCheckout"
          component={RentCheckout}
        />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
