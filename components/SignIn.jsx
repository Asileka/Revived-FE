import { Text, Input, Button, Divider } from "@rneui/themed";
import { useState, createContext, useContext } from "react";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { userContext } from "./Contexts";
import axios from "axios";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [wantsToSignUp, setWantsToSignUp] = useState(false);
  const [success, setSuccess] = useState("");
  const [disableRegister, setDisableRegister] = useState(false);
  const [disableLogin, setDisableLogin] = useState(false);
  const [currentUserID, setCurrentUserID] = useState("1");
  const { loggedUserID, setLoggedUserID } = useContext(userContext);

  function sendLogin() {
    return axios
      .post(`https://revive-be.herokuapp.com/api/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        setSuccess("Success!");
        setDisableLogin(true);
        setLoggedUserID(res.data);
        console.log(res.data);
        return res.status;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function sendRegister() {
    return axios
      .post(`https://revive-be.herokuapp.com/api/register`, {
        email: email,
        password: password,
        name: name,
      })
      .then((res) => {
        setSuccess("Success! You can now Log In");
        setDisableRegister(true);
        return res.status;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function signUpPress() {
    setWantsToSignUp(true);
  }
  function notSignUpPress() {
    setWantsToSignUp(false);
  }
  const firstSignIn = () => {
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
        <Text h2>{success}</Text>
        <Text h2>{loggedUserID}</Text>
        <Button
          onPress={sendLogin}
          disabled={disableLogin}
          disabledStyle={stylesignin.disabledButton}
          color="green"
          title="Log In"
        >
          Log In{" "}
        </Button>
        <Text style={stylesignin.ortext}>or</Text>
        <Button onPress={signUpPress} color="green" title="Create An Account" />
      </View>
    );
  };
  const register = () => {
    return (
      <View>
        <Text h2>{success}</Text>
        <Text h2>Creating New Account</Text>
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
        <Input
          placeholder="Your Name"
          onChangeText={(newName) => setName(newName)}
          defaultValue={name}
        />
        <Text h2>{success}</Text>
        <Button
          onPress={sendRegister}
          disabled={disableRegister}
          disabledStyle={stylesignin.disabledButton}
          color="green"
          title="Sign Up"
        ></Button>
        <Text style={stylesignin.ortext}>Already Have An Account?</Text>
        <Button onPress={notSignUpPress} color="green" title="Sign In" />
      </View>
    );
  };
  const signInDisplayScreens = () => {
    if (!wantsToSignUp) {
      return firstSignIn();
    }
    if (wantsToSignUp) {
      return register();
    }
  };
  return signInDisplayScreens();
};

export default SignIn;
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
