import * as React from "react";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import SearchBar from'./SearchBar';
import ItemList from "./ItemList";
const AllItems = () => {
  return (
    <>
  
    <View styles={styles.signinpagecontainer}>
            
      <Text h2 style={styles.signintext}>

        All Items
      </Text>
  
      <ItemList />
    </View>
    </>
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
export default AllItems;
