import * as React from "react";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const SignInPage = () => {
  return (
    <View styles={styles.signinpagecontainer}>
      <Text h2 style={styles.signintext}>
        Sign In
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  signinpagecontainer: {
    flexDirection: "column",
  },
  signintext: {
    fontSize: 50,
  },
});
export default SignInPage;
