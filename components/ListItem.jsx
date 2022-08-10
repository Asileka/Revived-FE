import * as React from "react";
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, TextInput } from "react-native";
import SignInPage from "./SignInPage";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


import { itemsArray } from "./ItemList";

import ItemList from "./ItemList";
import AppLoading from "expo-app-loading";
import MyProfile from "./MyProfile";
import OtherUsersProfile from "./OtherUsersProfile";
import Terms from "./Terms";
import * as SplashScreen from "expo-splash-screen";

const ListItem = ({navigation, route}) => {
    const [text1, onChangeText1] = React.useState("");
     const [text2, onChangeText2] = React.useState("");
     const [text3, onChangeText3] = React.useState("");
     const [text4, onChangeText4] = React.useState("");
     
    const [number4, onChangeNumber4] = React.useState(null);
    const Drawer = createDrawerNavigator();
    const [newItem, setNewItem] = useState("");
    const [itemData, setItemData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(null);



    const handleSubmit = (event) => {
      event.preventDefault();
      setIsLoading(true);
      setError(null);
      fetch(
        `API LINK`,
        {
          method: "POST",
          body: JSON.stringify({
            username: "USERNAME HERE",
            body: `${newItem}`,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((json) =>
          setItemData((currData) => [json.comment, ...currData])
        );
      setIsLoading(false).catch((err) => {
        setNewItem("");
        setError("Something went wrong, please try again.");
      });
    };
  
    return (
      
      <SafeAreaView>
      
      
 
        <TextInput
          style={styles.input1}
          onChangeText1={onChangeText1}
     
          value={onChangeText1}
          placeholder="Category"
          keyboardType="text"
        />
        <TextInput
          style={styles.input2}
          onChangeText2={onChangeText2}

          value={onChangeText2}
          placeholder="Location (Postcode)"
          keyboardType="text"
        />
         <TextInput
          style={styles.input3}
          onChangeText3={onChangeText3}
          value={onChangeText3}
          placeholder="Item Name"
          keyboardType="text"
        />
        
            <TouchableOpacity
                style={styles.userBtn}
                onPress={handleSubmit}>
                <Text style={styles.userBtnTxt}>List It!</Text>
              </TouchableOpacity>
       
                
  
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    input1: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
        input2: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
        input3: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    input4: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
      },
      userBtn: {
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 3,
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
      },
      userBtnTxt: {
        color: 'black',
      },
  });
  
  export default ListItem;