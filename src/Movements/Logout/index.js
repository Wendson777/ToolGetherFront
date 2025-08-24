// function Logout({ navigation }) {
//   React.useEffect(() => {
//     async function doLogout() {
//       try {
//         await AsyncStorage.removeItem("user");
//         await AsyncStorage.removeItem("token");
//         navigation.replace("Login"); // redireciona pra tela de login
//       } catch (error) {
//         console.log("Erro ao fazer logout:", error);
//       }
//     }
//     doLogout();
//   }, [navigation]);

//   return null; // não precisa renderizar nada, só executa
// }
