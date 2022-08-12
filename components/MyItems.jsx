import * as React from "react";

import { useState, useEffect } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, Card, Button, Icon } from "@rneui/themed";
import axios from "axios";

const MyItemCards = () => {
  const [items, setItems] = useState([]);
  const [itemData, setItemData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://revive-be.herokuapp.com/api/items/`)
      .then((items) => {
        setItemData(() => {
          return items;
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (event) => {
    event.preventDefault();
    setIsLoading(true);
    fetch(`https://revive-be.herokuapp.com/api/items/${itemData._id}`, {
      method: "DELETE",
    }).then(() => {
      console.log(`deleted ${itemData._id}`);
      setIsLoading(false);
    });
  };

  return (
    <>
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
                <Text>Owner: {i.itemowner}</Text>
                <Text>Added: {i.itemcreateddate}</Text>
                <Text style={{ marginBottom: 10 }}>Item Description</Text>

                <TouchableOpacity style={styles.userBtn} onPress={handleDelete}>
                  <Text style={styles.userBtnTxt}>Delete Item</Text>
                </TouchableOpacity>
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
  },
  fonts: {
    marginBottom: 8,
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  userBtn: {
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 3,
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "black",
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
});

export default MyItemCards;
