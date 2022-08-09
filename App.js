import { StatusBar } from "expo-status-bar";
import {
  DatePickerAndroid,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import ItemList from "./components/ItemList";
import AppLoading from "expo-app-loading";
import MyProfile from "./components/MyProfile";
import OtherUsersProfile from "./components/OtherUsersProfile";
import Terms from "./components/Terms";
import * as SplashScreen from "expo-splash-screen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import AllItems from "./components/AllItems";

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

const Stack = createStackNavigator();
function MainItemsPage({ navigation }) {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Items In Your Area" component={ItemList} />
      <Stack.Screen name="Profile" component={OtherUsersProfile} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer style={{ backgroundColor: "black" }}>
      <Drawer.Navigator
        id="1"
        style={{ backgroundColor: "black" }}
        drawerContentOptions={{ backgroundColor: "green" }}
        initialRouteName="All Items"
      >
        <Drawer.Screen
          style={{ backgroundColor: "black" }}
          name="All Items"
          component={MainItemsPage}
        />
        <Drawer.Screen name="My Profile" component={MyProfile} />

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
