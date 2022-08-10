import { Text, Input, Button } from "@rneui/themed";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function sendLogin(email, password) {
    return axios
      .post(`https://revive.com/api/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        return res.status;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <View>
      <Text h2>Sign In</Text>
      <Input
        placeholder="Email"
        onChangeText={(newEmail) => setEmail(newEmail)}
        defaultValue={email}
      />

      <Input
        placeholder="Password"
        secureTextEntry={true}
        onChangeText={(newPassword) => setPassword(newPassword)}
        defaultValue={password}
      />

      <Button title="Log In" />
      <Text h2>Or</Text>
      <Button title="Create An Account" />
    </View>
  );
};

export default SignIn;
