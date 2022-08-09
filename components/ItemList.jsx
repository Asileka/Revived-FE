import * as React from "react";
import { Text } from "@rneui/themed";
import { StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

const ItemList = () => {


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



  return (
    <View>
      <Text h2>Sign In</Text>
    </View>
  );
};

export default ItemList;
