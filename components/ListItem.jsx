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
import * as ImagePicker from "expo-image-picker";

const ListItem = ({ navigation, route }) => {
  const { loggedUserID, setLoggedUserID } = useContext(userContext);
  const [itemName, setItemName] = useState("Black Dress");
  const [itemPostcode, setItemPostcode] = useState("M163JD");
  const [itemCategory, setItemCategory] = useState("clothing");
  const [newItem, setNewItem] = useState("");
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    let formData = FormData();

    formData.append("itemname", itemName);
    formData.append("itemlocation", itemPostcode);
    formData.append("itemownerid", loggedUserID);
    formData.append("claimed", loggedUserID);
    formData.append("itemimage");

    fetch(`https://revive-be.herokuapp.com/api/items`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
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
      />
      <TextInput
        style={styles.input2}
        onChangeText={(newItemPostcode) => setItemPostcode(newItemPostcode)}
        defaultValue={itemPostcode}
        placeholder="Postcode"
      />
      <TextInput style={styles.input3} placeholder="Category" />
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
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
