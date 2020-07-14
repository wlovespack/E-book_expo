import React, { useContext } from "react";
import { Header, Left, Button, Right, Body } from "native-base";
import { Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
//
import languageContext from "./Language/languageContext";
//
function Head(props) {
  const { lang } = useContext(languageContext);
  return (
    <Header style={{ backgroundColor: "rgb(20,100,170)" }}>
      <Left>
        <Button transparent onPress={() => props.navigation.openDrawer()}>
          <Ionicons name="md-menu" size={32} color="#fff" />
        </Button>
      </Left>
      <Body>
        <Text style={{ fontSize: 22, color: "#fff", left: 10 }}>
          {lang.header_title}
        </Text>
      </Body>
      <Right />
    </Header>
  );
}

export default Head;
