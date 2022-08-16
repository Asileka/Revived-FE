import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

import SearchBar from "./components/SearchBar";
import ItemList from "./components/ItemList";
import AppLoading from "expo-app-loading";
import MyProfile from "./components/MyProfile";
import OtherUsersProfile from "./components/OtherUsersProfile";

import MyMap from "./components/MapView";
import * as SplashScreen from "expo-splash-screen";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import MyItemCards from "./components/MyItems";
import ListItem from "./components/ListItem";
import SignIn from "./components/SignIn";
import EditUsername from "./components/EditProfile";
import SignOut from "./components/SignOut";
import { userContext } from "./components/Contexts";

function DetailsScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>No new messages</Text>
    </View>
  );
}
function FavouriteScreen() {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text>Favoutite items feature coming soon</Text>
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
    <Stack.Navigator>
      <Stack.Screen name="Items In Your Area" component={ItemList} />
      <Stack.Screen name="Profile" component={OtherUsersProfile} />
    </Stack.Navigator>
  );
}

function App() {
  const [loggedUserID, setLoggedUserID] = useState(null);
  return (
    <NavigationContainer>
      <userContext.Provider value={{ loggedUserID, setLoggedUserID }}>
        <Drawer.Navigator
          id="1"
          screenOptions={{
            headerStyle: {
              backgroundColor: "#0d8575",
            },
            headerTintColor: "#edf7f6",
            headerTitleStyle: {
              fontWeight: "bold",
            },
          }}
          initialRouteName="All Items"
        >
          {loggedUserID ? (
            <>
              <Drawer.Screen
                style={{ backgroundColor: "black" }}
                name="All Items"
                component={MainItemsPage}
              />

              <Drawer.Screen name="My Profile" component={MyProfile} />
              <Drawer.Screen name="List Item" component={ListItem} />
              <Drawer.Screen name="Inbox" component={DetailsScreen} />
              <Drawer.Screen name="My Items" component={MyItemCards} />
              <Drawer.Screen name="Favourites" component={FavouriteScreen} />
              <Drawer.Screen name="Edit Profile" component={EditUsername} />
              <Drawer.Screen name="Map" component={MyMap} />
              <Drawer.Screen name="Sign Out" component={SignOut} />
            </>
          ) : (
            <>
              <Drawer.Screen name="Sign In" component={SignIn} />
            </>
          )}
        </Drawer.Navigator>
      </userContext.Provider>
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
