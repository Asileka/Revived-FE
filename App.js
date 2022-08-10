import { StatusBar } from "expo-status-bar";
import {
  DatePickerAndroid,
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import SearchBar from "./components/SearchBar";
import ItemList from "./components/ItemList";
import AppLoading from "expo-app-loading";
import MyMap from "./components/MapView";
import MyProfile from "./components/MyProfile";
import OtherUsersProfile from "./components/OtherUsersProfile";
import Terms from "./components/Terms";
import * as SplashScreen from "expo-splash-screen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";

import ListItem from "./components/ListItem";
import SignIn from "./components/SignIn";

function DetailsScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Details Screen</Text>
    </View>
  );
}
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 3000);

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();
const EditNav = createStackNavigator();
function MainItemsPage({ navigation }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { elevation: 0 },

        cardStyle: { backgroundColor: "black" },
      }}
    >
      <Stack.Screen name="Items In Your Area" component={ItemList} />
      <Stack.Screen name="Profile" component={OtherUsersProfile} />
    </Stack.Navigator>
  );
}

function App() {
  return (
    <>
      <SearchBar color="red" />
      <NavigationContainer style={{ backgroundColor: "black" }}>
        <Drawer.Navigator
          color="red"
          id="1"
          style={{ backgroundColor: "black" }}
          drawerContentOptions={{ backgroundColor: "green" }}
          initialRouteName="All Items"
        >
          <Drawer.Screen fontColor="red" name="Sign In" component={SignIn} />
          <Drawer.Screen name="My Profile" component={MyProfile} />
          <Drawer.Screen name="List Item" component={ListItem} />
          <Drawer.Screen
            color="#ff5c5c"
            name="Other Users Profile"
            component={OtherUsersProfile}
          />

          <Drawer.Screen name="Inbox" component={DetailsScreen} />
          <Drawer.Screen name="Categories" component={DetailsScreen} />
          <Drawer.Screen name="Favourites" component={DetailsScreen} />
          <Drawer.Screen name="Map" component={MyMap} />
          <Drawer.Screen name="Terms" component={Terms} />

          <Drawer.Screen name="Log Out" component={DetailsScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </>
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
