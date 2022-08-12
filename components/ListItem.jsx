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
import { useState, useEffect, useContext } from "react";
import { userContext } from "./Contexts";

const ListItem = ({ navigation, route }) => {
  const { loggedUserID, setLoggedUserID } = useContext(userContext);
  // const [text1, onChangeText1] = React.useState("");
  // const [text2, onChangeText2] = React.useState("");
  // const [text3, onChangeText3] = React.useState("");
  // const [text4, onChangeText4] = React.useState("");
  const [itemName, setItemName] = useState("Black Dress");
  const [itemPostcode, setItemPostcode] = useState("M163JD");
  const [itemCategory, setItemCategory] = useState("clothing");
  const [newItem, setNewItem] = useState("");
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    fetch(`https://revive-be.herokuapp.com/api/items`, {
      method: "POST",
      body: JSON.stringify({
        itemname: itemName,
        itemlocation: itemPostcode,
        itemcategory: itemCategory,
        itemownerid: loggedUserID,
        itemowner: "Adam J",
        claimed: "available",
        itemimgurl: `https://cdn.luxe.digital/media/2021/02/24170750/best-little-black-dresses-grace-karin-review-luxe-digital%402x.jpg`,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => console.log(response.data))
      .catch((err) => {
        setItemData("");
        setError("Something went wrong, please try again.");
      });
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input1}
        onChangeText={(newItemName) => setItemName(newItemName)}
        defaultValue={itemName}
        placeholder="Item Name"
        keyboardType="text"
      />
      <TextInput
        style={styles.input2}
        onChangeText={(newItemPostcode) => setItemPostcode(newItemPostcode)}
        defaultValue={itemPostcode}
        placeholder="Postcode"
        keyboardType="text"
      />
      <TextInput
        style={styles.input3}
        placeholder="Category"
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
