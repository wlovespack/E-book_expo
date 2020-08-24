import React, { useContext } from "react";
import { Header, Left, Button, Right, Body } from "native-base";
import { Text, AsyncStorage } from "react-native";
import { Ionicons } from '@expo/vector-icons';
//
import Context from "./Context";
//
function Head(props) {
  const { lang,theme } = useContext(Context);
  const route = props.navigation.state.routeName;
  // 
  return (
    <Header style={{ backgroundColor: theme.header }}>
      <Left>
        <Button transparent onPress={() => props.navigation.openDrawer()}>
          <Ionicons name="md-menu" size={32} color={theme.header_text} />
        </Button>
      </Left>
      <Body style={{flexDirection:'row',alignItems:'center'}}>
        <Text style={{ fontSize: 22, color: theme.header_text, left: 10 }}>
          {lang.header_title} 
        </Text>
        <Text style={{fontSize:16, color: theme.header_text,marginLeft:15}}>
          {route? ' - ' + route:''}
        </Text>
      </Body>
      <Right />
    </Header>
  );
}

export default Head;
