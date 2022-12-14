import * as React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";

import { Text, Card, Button, Icon } from "@rneui/themed";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { SafeAreaView, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import { userContext } from "./Contexts";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";

const ListItem = ({ navigation, route }) => {
  const { loggedUserID, setLoggedUserID } = useContext(userContext);
  const [itemName, setItemName] = useState("");
  const [itemPostcode, setItemPostcode] = useState("");
  const [itemCategory, setItemCategory] = useState("clothing");
  const [itemDescription, setItemDescription] = useState("");
  const [newItem, setNewItem] = useState("");
  const [itemData, setItemData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [disableButton, setDisableButtun] = useState(false);
  const [disableListAnother, setDisableListAnother] = useState(true);

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
  const handleListAnother = () => {
    setDisableButtun(false);
    setDisableListAnother(true);
    setImage(null);
    setItemCategory("");
    setItemDescription("");
    setItemPostcode("");
    setItemName("");
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    setDisableButtun(true);
    setDisableListAnother(false);
    let formData = new FormData();

    formData.append("itemname", itemName);
    formData.append("itemlocation", itemPostcode);
    formData.append("itemownerid", loggedUserID);
    formData.append("itemcategory", itemCategory);
    formData.append("itemdescription", itemDescription);
    formData.append("itemimage", {
      uri: image,
      name: "itemimage",
      type: "image/jpeg",
    });

    fetch(`https://revive-be.herokuapp.com/api/users/${loggedUserID}/items`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => console.log("posted"))
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
      <TextInput
        style={styles.input3}
        onChangeText={(newItemDescription) =>
          setItemDescription(newItemDescription)
        }
        defaultValue={itemDescription}
        placeholder="Describe your item"
      />
      <Text style={styles.text}>Pick item category:</Text>
      <Picker
        style={styles.categoryPicker}
        selectedValue={itemCategory}
        onValueChange={(itemValue) => setItemCategory(itemValue)}
      >
        <Picker.Item label="Pick a category" value="clothing" />
        <Picker.Item label="Clothing" value="clothing" />
        <Picker.Item label="Books" value="books" />
        <Picker.Item label="Games" value="games" />
        <Picker.Item label="Electronics" value="electronics" />
        <Picker.Item label="Food" value="food" />
        <Picker.Item label="Household" value="household" />
        <Picker.Item label="Other" value="other" />
      </Picker>

      <Button
        title="Pick an image from camera roll"
        color="#30ab7e"
        onPress={pickImage}
        buttonStyle={styles.userBtn}
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button
        color="#30ab7e"
        title="List It!"
        buttonStyle={styles.userBtn}
        disabled={disableButton}
        disabledStyle={styles.disabledButton}
        onPress={handleSubmit}
      />
      <Button
        color="#30ab7e"
        buttonStyle={styles.userBtn}
        title="List Another Item"
        disabled={disableListAnother}
        disabledStyle={styles.disabledButton}
        onPress={handleListAnother}
      />
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
    marginBottom: 10,
  },
  disabledButton: {
    color: "#abc7ac",
  },
  categoryPicker: {
    alignItems: "center",
    color: "#308691",
  },
  text: {
    marginLeft: 8,
  },
});

export default ListItem;
