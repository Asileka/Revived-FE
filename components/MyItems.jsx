import * as React from "react";
import { View, ScrollView, StyleSheet, Image } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, Card, Button, Icon } from "@rneui/themed";
const itemsArray = [
  {
    itemid: 1,
    itemname: "Golden Prada dress size M",
    itemlocation: "M205TG",
    itemcategory: "clothing",
    itemowner: "Kate Bush",
    ifclaimed: "unclaimed",
    itemcreateddate: "20.06.22",
    itemimgurl:
      "https://a.1stdibscdn.com/prada-gold-metallic-leather-dress-fairytale-for-sale/1121189/v_80933021574347855196/8093302_master.jpg",
  },
  {
    itemid: 2,
    itemname: "Pink dress size S",
    itemlocation: "SK35TG",
    itemcategory: "clothing",
    itemowner: "Will Shake",
    ifclaimed: "unclaimed",
    itemcreateddate: "10.07.22",
    itemimgurl:
      "http://picture-cdn.wheretoget.it/kite0f-l-610x610-dress-weedingdress-weeding-pink-beautiful-fashion-long+dress-elegant-blush-rose-petas-white-floor+length-light+pink-prom+dress-line+prom+dress-pinkdress-shoulder+prom+dress.jpg",
  },
];
const MyItemCards = () => {

  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState("");
  const [err, setErr] = useState("");

  const handleDelete = (event) => {
    event.preventDefault();
    setIsLoading(true);
    setErr(null);
    fetch(`https://adam-nc-news.herokuapp.com/api/comments/${comment_id}`, {
      method: "DELETE",
    }).then(() => {
      setItems((curr) => {
        return items.filter((item) => {
          return item.item !== item;
        });
      });
      setIsLoading(false);
    });
  };


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
                <Text>Category: {i.itemcategory}</Text>
                <Text>Location: {i.itemlocation}</Text>
                <Text>Owner: {i.itemowner}</Text>
                <Text>Added: {i.itemcreateddate}</Text>
                <Text style={{ marginBottom: 10 }}>Item Description</Text>
                <Button color= 'pink'
                 
                  buttonStyle={{
                    
                    borderRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    marginBottom: 0,
                  }}
                  title="Delete Item"
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

export default MyItemCards;