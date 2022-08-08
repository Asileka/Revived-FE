import { StatusBar } from "expo-status-bar";
import { DatePickerAndroid, StyleSheet, Text, View } from "react-native";
import { Avatar } from "@rneui/themed";
import Avatars from "./components/Avatars";
import SignInPage from "./components/SignInPage";
import AppLoading from "expo-app-loading";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 3000);

export default function App() {
  const [loaded] = useFonts({
    Montserrat: require("./assets/fonts/Pacifico-Regular.ttf"),
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      <SignInPage />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d8575",
    alignItems: "center",
    justifyContent: "center",
  },
});
