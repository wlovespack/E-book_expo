import React, { useContext } from "react";
import { Header, Left, Button, Right, Body } from "native-base";
import { Text } from "react-native";
import { Ionicons } from '@expo/vector-icons';
//
import Context from "./Context";
//
function Head(props) {
  const { lang,theme } = useContext(Context);

  return (
    <Header style={{ backgroundColor: theme.header }}>
      <Left>
        <Button transparent onPress={() => props.navigation.openDrawer()}>
          <Ionicons name="md-menu" size={32} color={theme.header_text} />
        </Button>
      </Left>
      <Body>
        <Text style={{ fontSize: 22, color: theme.header_text, left: 10 }}>
          {lang.header_title}
        </Text>
      </Body>
      <Right />
    </Header>
  );
}

export default Head;
