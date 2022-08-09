import * as React from "react";
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { SafeAreaView, TextInput } from "react-native";

const ListItem = ({navigation, route}) => {
    const [text1, onChangeText1] = React.useState("");
     const [text2, onChangeText2] = React.useState("");
     const [text3, onChangeText3] = React.useState("");
     const [text4, onChangeText4] = React.useState("");
     
    const [number4, onChangeNumber4] = React.useState(null);
  
    return (
      <SafeAreaView>
        <TextInput
          style={styles.input1}
          onChangeText1={onChangeText1}
          value={onChangeText1}
          placeholder="Title"
          keyboardType="text"
        />
        <TextInput
          style={styles.input2}
          onChangeText2={onChangeText2}
          value={onChangeText2}
          placeholder="Size"
          keyboardType="text"
        />
         <TextInput
          style={styles.input3}
          onChangeText3={onChangeText3}
          value={onChangeText3}
          placeholder="Description"
          keyboardType="text"
        />
         <TextInput
          style={styles.input3}
          onChangeText4={onChangeText4}
          value={onChangeText4}
          placeholder="Condition"
          keyboardType="text"
        />
         <TextInput
          style={styles.input4}
          onChangeNumber4={onChangeNumber4}
          value={onChangeNumber4}
          placeholder="Quantity"
          keyboardType="numeric"
        />
            <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate('EditProfile');
                }}>
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
        borderColor: 'green',
        borderWidth: 2,
        borderRadius: 3,
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        marginHorizontal: 5,
      },
      userBtnTxt: {
        color: 'black',
      },
  });
  
  export default ListItem;