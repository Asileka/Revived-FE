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

const ListItem = ({ navigation, route }) => {
  const [text1, onChangeText1] = React.useState("");
  const [text2, onChangeText2] = React.useState("");
  const [text3, onChangeText3] = React.useState("");
  const [text4, onChangeText4] = React.useState("");

  const [number4, onChangeNumber4] = React.useState(null);
  const Drawer = createDrawerNavigator();
  const [newItem, setNewItem] = useState("");
  const [itemData, setItemData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState(null);

 


  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    fetch(
      `https://revive-be.herokuapp.com/items`,
      {
        method: "POST",
        body: JSON.stringify({
          itemname: `${text1}`,
          itemlocation: `${text2}`,
          itemcategory: `${text3}`,
          itemowner:  'blank',
        claimed: 'blank',
          itemimgurl: `${text4}`,
         
         
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) =>
        setItemData((currData) => [json.itemcategory, ...currData])
      ).catch((err) => {
      setItemData("");
      setError("Something went wrong, please try again.");
    });
  };

  
  return (
    <SafeAreaView>
      <TextInput
        style={styles.input1}
        onChangeText1={onChangeText1}
        value={onChangeText1}
        placeholder="Item Name"
        keyboardType="text"
      />
      <TextInput
        style={styles.input2}
        onChangeText2={onChangeText2}
        value={onChangeText2}
        placeholder="Location"
        keyboardType="text"
      />
      <TextInput
        style={styles.input3}
        onChangeText3={onChangeText3}
        value={onChangeText3}
        placeholder="Category"
        keyboardType="text"
      />
        <TextInput
        style={styles.input4}
        onChangeText3={onChangeText4}
        value={onChangeText4}
        placeholder="Enter IMG URL"
        keyboardType="text"
      />

    

      <TouchableOpacity style={styles.userBtn} onPress={handleSubmit}>
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

export default ListItem;
