<<<<<<< HEAD
import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from "react-native";
import ListItem from "./ListItem";
import MyItemCards from "./MyItems";
const MyProfile = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const fetchItems = async () => {
    try {
      const list = [];
      await firestore()
        .collection("items")
        .where("userId", "==", route.params ? route.params.userId : user.uid)
        .orderBy("postTime", "desc")
        .get()
        .then((querySnapshot) => {
          // console.log('Total Posts: ', querySnapshot.size);
          querySnapshot.forEach((doc) => {
            const { userId, post, postImg, postTime, likes, comments } =
              doc.data();
            list.push({
              id: doc.id,
              userId,
              userName: "Test Name",
              userImg:
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
              postTime: postTime,
              post,
              postImg,
              liked: false,
              likes,
              comments,
            });
          });
        });
      setItems(list);
      if (loading) {
        setLoading(false);
      }
      console.log("Items: ", items);
    } catch (e) {
      console.log(e);
    }
  };
  const getUser = async () => {
    await firestore()
      .collection("users")
      .doc(route.params ? route.params.userId : user.uid)
      .get()
      .then((documentSnapshot) => {
        if (documentSnapshot.exists) {
          console.log("User Data", documentSnapshot.data());
          setUserData(documentSnapshot.data());
        }
      });
  };
  useEffect(() => {
    getUser();
    fetchItems();
    navigation.addListener("focus", () => setLoading(!loading));
  }, [navigation, loading]);
  const handleDelete = () => {};
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
        showsVerticalScrollIndicator={false}
      >
        <Image
          style={styles.userImg}
          source={{
            uri: userData
              ? userData.userImg ||
                "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg"
              : "https://lh5.googleusercontent.com/-b0PKyNuQv5s/AAAAAAAAAAI/AAAAAAAAAAA/AMZuuclxAM4M1SCBGAO7Rp-QP6zgBEUkOQ/s96-c/photo.jpg",
          }}
        />
        <Text style={styles.userName}>
          {userData ? userData.fname || "Peter" : "Peter"}{" "}
          {userData ? userData.lname || "Jones" : "Jones"}
        </Text>
        {/* <Text>{route.params ? route.params.userId : user.uid}</Text> */}
        <Text style={styles.aboutUser}>
          {userData
            ? userData.about || "No details added."
            : "No details added"}
        </Text>
        <Text style={styles.aboutUser}>
          {userData
            ? userData.about || "Chosen Charity: CHARITY"
            : "Chosen Charity: CHARITY"}
        </Text>
        <View style={styles.userBtnWrapper}>
          {route.params ? (
            <>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Message</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={() => {}}>
                <Text style={styles.userBtnTxt}>Follow</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.userBtn}
                onPress={() => {
                  navigation.navigate("EditProfile");
                }}
              >
                <Text style={styles.userBtnTxt}>Edit Profile</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.userBtn} onPress={ListItem}>
                <Text style={styles.userBtnTxt}>List Item</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{items.length}</Text>
            <Text style={styles.userInfoSubTitle}>Items Available</Text>
          </View>
          <View style={styles.userInfoItem}>
            <Text style={styles.userInfoTitle}>{items.length}</Text>
            <Text style={styles.userInfoSubTitle}>Items Donated</Text>
          </View>
        </View>
        {items.map((item) => (
          <PostCard key={item.id} item={item} onDelete={handleDelete} />
        ))}
        {
          //////// ITEM LIST
        }
        <MyItemCards />
      </ScrollView>
    </SafeAreaView>
  );
};
export default MyProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: "600",
    color: "#666",
    textAlign: "center",
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    marginBottom: 10,
  },
  userBtn: {
    borderColor: "green",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "black",
  },
  userInfoWrapper: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginVertical: 20,
  },
  userInfoItem: {
    justifyContent: "center",
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "center",
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
});
=======
import * as React from "react";
import { View, ScrollView, StyleSheet, Image, TouchableOpacity, } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, Card, Button, Icon } from "@rneui/themed";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, TextInput } from "react-native";
import SignInPage from "./SignInPage";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";


import { itemsArray } from "./ItemList";

import ItemList from "./ItemList";
import AppLoading from "expo-app-loading";
import MyProfile from "./MyProfile";
import OtherUsersProfile from "./OtherUsersProfile";
import Terms from "./Terms";
import * as SplashScreen from "expo-splash-screen";

const ListItem = ({navigation, route}) => {
    const [text1, onChangeText1] = React.useState("");
     const [text2, onChangeText2] = React.useState("");
     const [text3, onChangeText3] = React.useState("");
     const [text4, onChangeText4] = React.useState("");
     
    const [number4, onChangeNumber4] = React.useState(null);
    const Drawer = createDrawerNavigator();
    const [newItem, setNewItem] = useState("");
    const [itemData, setItemData] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const [error, setError] = useState(null);



    const handleSubmit = (event) => {
      event.preventDefault();
      setIsLoading(true);
      setError(null);
      fetch(
        `API LINK`,
        {
          method: "POST",
          body: JSON.stringify({
            username: "USERNAME HERE",
            body: `${newItem}`,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
        .then((response) => response.json())
        .then((json) =>
          setItemData((currData) => [json.comment, ...currData])
        );
      setIsLoading(false).catch((err) => {
        setNewItem("");
        setError("Something went wrong, please try again.");
      });
    };
  
    return (
      
      <SafeAreaView>
      
      
 
        <TextInput
          style={styles.input1}
          onChangeText1={onChangeText1}
     
          value={onChangeText1}
          placeholder="Category"
          keyboardType="text"
        />
        <TextInput
          style={styles.input2}
          onChangeText2={onChangeText2}

          value={onChangeText2}
          placeholder="Location (Postcode)"
          keyboardType="text"
        />
         <TextInput
          style={styles.input3}
          onChangeText3={onChangeText3}
          value={onChangeText3}
          placeholder="Item Name"
          keyboardType="text"
        />
        
            <TouchableOpacity
                style={styles.userBtn}
                onPress={handleSubmit}>
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
>>>>>>> be0ee9f36116bb43a759a974f9f66af99440b64e
