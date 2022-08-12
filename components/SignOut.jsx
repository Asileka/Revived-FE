import { Text, Input, Button, Divider } from "@rneui/themed";
import { useState, createContext, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { userContext } from "./Contexts";

const SignOut = () => {
  const { loggedUserID, setLoggedUserID } = useContext(userContext);

  function signOutPress() {
    setLoggedUserID(null);
  }

  return (
    <View>
      <Button onPress={signOutPress} color="green" title="Sign Out" />
    </View>
  );
};

export default SignOut;
const stylesignin = StyleSheet.create({
  ortext: {
    color: "black",
    marginTop: 30,
    textAlign: "center",
    fontSize: 20,
    marginBottom: 36,
  },
  loginbutton: {
    backgroundColor: "black",
  },
  disabledButton: {
    color: "#abc7ac",
  },
});
