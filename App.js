import { StatusBar } from "expo-status-bar";
import {
  DatePickerAndroid,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";

import SignInPage from "./components/SignInPage";
import AppLoading from "expo-app-loading";
import MyProfile from "./components/MyProfile";
import OtherUsersProfile from "./components/OtherUsersProfile";
import Terms from "./components/Terms";
import * as SplashScreen from "expo-splash-screen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </View>
  );
}
function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Details Screen</Text>
    </View>
  );
}
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 3000);

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer style={{ backgroundColor: "black" }}>
      <Drawer.Navigator
        style={{ backgroundColor: "black" }}
        drawerContentOptions={{ backgroundColor: "green" }}
        initialRouteName="Home"
      >
        <Drawer.Screen
          style={{ backgroundColor: "black" }}
          name="All Items"
          component={SignInPage}
        />
        <Drawer.Screen name="My Profile" component={MyProfile} />
        <Drawer.Screen
          name="Other Users Profile"
          component={OtherUsersProfile}
        />
        <Drawer.Screen name="Inbox" component={DetailsScreen} />
        <Drawer.Screen name="Categories" component={DetailsScreen} />
        <Drawer.Screen name="Favourites" component={DetailsScreen} />
        <Drawer.Screen name="Map" component={DetailsScreen} />
        <Drawer.Screen name="Terms" component={DetailsScreen} />
        <Drawer.Screen name="Sign In" component={DetailsScreen} />
        <Drawer.Screen name="Log Out" component={DetailsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  NavigationContainer: {
    backgroundColor: "black",
  },
});
export default App;
