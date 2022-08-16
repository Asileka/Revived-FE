import * as React from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { SafeAreaView, TextInput } from "react-native";
import { useState, useEffect, useContext } from "react";
import { userContext } from "./Contexts";
import * as ImagePicker from "expo-image-picker";

const EditUsername = () => {
  const { loggedUserID, setLoggedUserID } = useContext(userContext);
  const [newName, setNewName] = useState("");
  const [newCharity, setNewCharity] = useState("");
  const [err, setErr] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(null);
  const [disableButton, setDisableButton] = useState(false);

  const pickImage = async () => {
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
  const handleSubmitAvatar = (event) => {
    event.preventDefault();
    setIsLoading(true);

    let formDataAvatar = new FormData();

    formDataAvatar.append("avatar", {
      uri: image,
      name: "avatar",
      type: "image/jpeg",
    });

    fetch(`https://revive-be.herokuapp.com/api/users/${loggedUserID}/avatar`, {
      method: "POST",
      body: formDataAvatar,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => console.log("picture success"))
      .catch((err) => {
        console.log(err);
      });
  };

  const HandleChangeUsername = () => {
    fetch(`https://revive-be.herokuapp.com/api/users/${loggedUserID}`, {
      method: "PATCH",
      body: JSON.stringify({
        name: newName,
        charity: newCharity,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((json) => {
        setIsLoading(false);
        console.log("success");
      })
      .catch((err) => {
        setErr("Something went wrong, please try again.");
        console.log(err);
      });
  };

  return (
    <SafeAreaView>
      <TextInput
        style={styles.input1}
        onChangeText={(newNewName) => setNewName(newNewName)}
        defaultValue={newName}
        placeholder="New Name"
      />
      <TextInput
        style={styles.input1}
        onChangeText={(newNewCharity) => setNewCharity(newNewCharity)}
        defaultValue={newCharity}
        placeholder="Charity of choice"
      />

      <TouchableOpacity style={styles.userBtn} onPress={HandleChangeUsername}>
        <Text style={styles.userBtnTxt}>Save</Text>
      </TouchableOpacity>

      <Button
        color="#30ab7e"
        buttonStyle={styles.userBtn}
        title="Pick an image for your profile picture"
        onPress={pickImage}
      />
      {image && (
        <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
      )}
      <Button
        color="#30ab7e"
        buttonStyle={styles.userBtn}
        title="Set this image as your profile picture"
        onPress={handleSubmitAvatar}
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
    color: "#6cb8b0",
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 3,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  userBtnTxt: {
    color: "black",
  },
});

export default EditUsername;
