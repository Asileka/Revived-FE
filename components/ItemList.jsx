import * as React from "react";

import { useState, useEffect } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { NavigationContainer } from "@react-navigation/native";

import SearchBar from "./SearchBar";

const Cards = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://revive-be.herokuapp.com/api/items/`)
      .then((response) => {
        return response.json();
      })
      .then((items) => {
        setItemData(() => {
          return items;
        });
        setIsLoading(false);
      })
      .catch((err) => {
        setError({ err });
      });
  }, [setItemData]);

  return (
    <>
      <SearchBar />
      <ScrollView>
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
                <Text style={{ marginBottom: 10 }}>Item Description</Text>
                <Button
                  color="#f24646"
                  size="sm"
                  icon={<Icon name="favorite-border" color="#ffffff" />}
                />
                <Button
                  icon={
                    <Icon
                      name="add"
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
                  title="CLAIM NOW"
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
    color: "#000000",

    textDecorationLine: "underline",
  },
});

export default Cards;
