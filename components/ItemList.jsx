import * as React from "react";

import { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
const Cards = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState([]);
  const [itemCategory, setItemCategory] = useState("");

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(`https://revive-be.herokuapp.com/api/items/`)
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((items) => {
  //       setItemData(() => {
  //         return items;
  //       });
  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       setError({ err });
  //     });
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://revive-be.herokuapp.com/api/items/`, {
        params: {
          category: itemCategory,
        },
      })
      .then((items) => {
        setItemData(items.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [itemCategory]);

  return (
    <>
      <ScrollView>
        <Picker
          selectedValue={itemCategory}
          onValueChange={(itemValue) => setItemCategory(itemValue)}
        >
          <Picker.Item label="Pick a category" value="" />
          <Picker.Item label="All items" value="" />
          <Picker.Item label="Clothing" value="clothing" />
          <Picker.Item label="Books" value="books" />
          <Picker.Item label="Games" value="games" />
          <Picker.Item label="Electronics" value="electronics" />
          <Picker.Item label="Food" value="food" />
          <Picker.Item label="Household" value="household" />
          <Picker.Item label="Other" value="other" />
        </Picker>
        <View style={styles.container}>
          {itemData.map((i) => {
            return (
              <Card key={i._id}>
                <Card.Title>{i.itemname}</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={{ padding: 0 }}
                  source={{
                    uri: i.itemimgurl,
                  }}
                />
                <Text>Category: {i.itemcategory}</Text>
                <Text>Location: {i.itemlocation}</Text>

                <Text
                  style={styles.link}
                  onPress={() =>
                    navigation.navigate("Profile", {
                      itemOwnerID: i.itemownerid,
                    })
                  }
                >
                  Owner: {i.itemowner}
                </Text>
                <Text>Added: {i.itemcreateddate}</Text>
                <Text>{i.claimed ? "Claimed" : "Available"}</Text>
                <Text style={{ marginBottom: 10 }}>
                  Description: {i.itemdescription}
                </Text>
                <Button
                  color="#f24646"
                  size="sm"
                  icon={<Icon name="favorite-border" color="#ffffff" />}
                />
                <Button
                  icon={
                    <Icon
                      name="email"
                      color="#ffffff"
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
                  buttonStyle={{
                    borderRadius: 0,
                    backgroundColor: "#4287f5",
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  title="Message Seller"
                />
              </Card>
            );
          })}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0d8575",
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  link: {
    color: "#3993bd",

    textDecorationLine: "underline",
  },
});

export default Cards;
