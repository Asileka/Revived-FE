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

import { userContext } from "./Contexts";

const OtherUsersProfile = ({ navigation, route }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deleted, setDeleted] = useState(false);
  const [userData, setUserData] = useState("");
  const [itemData, setItemData] = useState([]);
  const { loggedUserID, setLoggedUserID } = useContext(userContext);
  const { itemOwnerID } = route.params;

  useEffect(() => {
    setIsLoading(true);
    fetch(`https://revive-be.herokuapp.com/api/users/${itemOwnerID}`)
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
            uri:
              userData.avatar ||
              "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
          }}
        />
        <Text style={styles.userName}>{userData.name || ""} </Text>

        <Text style={styles.aboutUser}>Chosen Charity: {userData.charity}</Text>
        <View style={styles.userBtnWrapper}></View>
        <View style={styles.userInfoWrapper}>
          <View style={styles.userInfoItem}>
            {/* <Text style={styles.userInfoTitle}>{userData.items.length}</Text> */}
            <Text style={styles.userInfoSubTitle}>Total items</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OtherUsersProfile;

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
