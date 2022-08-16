import * as React from "react";

import { useState, useEffect, useContext } from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { userContext } from "./Contexts";

const MyItemCards = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [itemData, setItemData] = useState([]);
  const { loggedUserID, setLoggedUserID } = useContext(userContext);
  const [changeClaimed, setChangeClaimed] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://revive-be.herokuapp.com/api/users/${loggedUserID}/items`)
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
  }, [changeClaimed]);
  const handleMarkAsClaimed = () => {
    fetch(`https://revive-be.herokuapp.com/api/items/${itemData._id}`, {
      method: "PATCH",
      body: JSON.stringify({
        claimed: true,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((json) => {
        setIsLoading(false);
        setChangeClaimed(true);
        console.log("success");
      })
      .catch((err) => {
        setErr("Something went wrong, please try again.");
        console.log(err);
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
                <Text>{i.claimed ? "Claimed" : "Available"}</Text>
                <Text>Added: {i.itemcreateddate}</Text>
                <Text style={{ marginBottom: 10 }}>Item Description</Text>
                <Button
                  onPress={handleMarkAsClaimed}
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
                  title="Mark As Claimed"
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

export default MyItemCards;
