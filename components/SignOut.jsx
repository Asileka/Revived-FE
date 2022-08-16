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
      <Button
        onPress={signOutPress}
        color="#6cb8b0"
        title="Sign Out"
        buttonStyle={styles.button}
      />
    </View>
  );
};

export default SignOut;
const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    marginBottom: 36,
  },
});
