import * as React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, Card, Button, Icon } from "@rneui/themed";
const itemsArray = [
  {
    itemid: 1,
    itemname: "Golden Prada dress size M",
    itemimgurl:
      "https://a.1stdibscdn.com/prada-gold-metallic-leather-dress-fairytale-for-sale/1121189/v_80933021574347855196/8093302_master.jpg",
  },
  {
    itemid: 2,
    itemname: "Pink dress size S",
    itemimgurl:
      "http://picture-cdn.wheretoget.it/kite0f-l-610x610-dress-weedingdress-weeding-pink-beautiful-fashion-long+dress-elegant-blush-rose-petas-white-floor+length-light+pink-prom+dress-line+prom+dress-pinkdress-shoulder+prom+dress.jpg",
  },
];
const Cards = () => {
  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          {itemsArray.map((i) => {
            return (
              <Card key={i.itemid}>
                <Card.Title>{i.itemname}</Card.Title>
                <Card.Divider />
                <Card.Image
                  style={{ padding: 0 }}
                  source={{
                    uri: i.itemimgurl,
                  }}
                />
                <Text style={{ marginBottom: 10 }}>Item Description</Text>
                <Button
                  icon={
                    <Icon
                      name="favorite-border"
                      color="#ffffff"
                      iconStyle={{ marginRight: 10 }}
                    />
                  }
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
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  title="BUY NOW"
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
});

export default Cards;
