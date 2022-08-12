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

import MyItemCards from "./MyItems";
import { userContext } from "./Contexts";

const MyProfile = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState(null);
  const [itemData, setItemData] = useState([]);
  const { loggedUserID, setLoggedUserID } = useContext(userContext);

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://revive-be.herokuapp.com/api/users/${loggedUserID}`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setUserData(() => {
          return data;
        });
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError({ err });
      });
  }, [setUserData]);

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
  //       console.log(err);
  //       setError({ err });
  //     });
  // }, [setItemData]);

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
        <Text style={styles.userName}>{userData.name || ""} </Text>

        <Text style={styles.aboutUser}>Chosen Charity: {userData.charity}</Text>
        <View style={styles.userBtnWrapper}>
          <>
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => {
                navigation.navigate("EditProfile");
              }}
            >
              <Text style={styles.userBtnTxt}>Edit</Text>
            </TouchableOpacity>
          </>
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
        {/* <MyItemCards itemData={itemData} /> */}
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
    borderColor: "#2e64e5",
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: "#2e64e5",
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
