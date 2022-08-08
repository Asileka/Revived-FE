import * as React from "react";
import { Avatar } from "@rneui/base";

const Avatars = () => {
  return (
    <Avatar
      activeOpacity={0.2}
      avatarStyle={{}}
      containerStyle={{ backgroundColor: "#BDBDBD" }}
      icon={{}}
      iconStyle={{}}
      imageProps={{}}
      onLongPress={() => alert("onLongPress")}
      onPress={() => alert("onPress")}
      overlayContainerStyle={{}}
      placeholderStyle={{}}
      rounded
      size="large"
      source={{
        uri: "https://uifaces.co/our-content/donated/6MWH9Xi_.jpg",
      }}
      title="P"
      titleStyle={{}}
    />
  );
};
export default Avatars;
