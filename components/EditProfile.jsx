import * as React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

import { Text, Card, Button, Icon } from "@rneui/themed";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { SafeAreaView, TextInput } from "react-native";

import { useState, useEffect } from "react";

const EditUsername = ({ navigation, route }) => {
  const [text1, onChangeText1] = React.useState("");
  const [text2, onChangeText2] = React.useState("");
  const [text3, onChangeText3] = React.useState("");
  const [text4, onChangeText4] = React.useState("");

  const [username, setUsername] = useState('');
  const [err, setErr] = useState("");



  const [number4, onChangeNumber4] = React.useState(null);
  const Drawer = createDrawerNavigator();
  const [newItem, setNewItem] = useState("");
  const [itemData, setItemData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

 


 

  const HandleChangeUsername = () => {
    setIsLoading(true);
 
    setErr(null);
    fetch(`https://revive-be.herokuapp.com/users/62f22cae71df4420fddf2cbc`, {
      method: "PATCH",
      body: JSON.stringify({
    
        name: 'John',

       
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => 
      response.json())
      .then((json) => {
      
        setIsLoading(false);
      })
      .catch((err) => {

        setErr("Something went wrong, please try again.");
      });
  };

  
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input1}
        onChangeText1={onChangeText1}
        value={onChangeText1}
        placeholder=" Enter A New Username"
        keyboardType="text"
      />

      
     

    

      <TouchableOpacity style={styles.userBtn} onPress={HandleChangeUsername}>
        <Text style={styles.userBtnTxt}>Save</Text>
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
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 3,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "black",
  },
});

export default EditUsername;
