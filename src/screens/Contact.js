import React from "react";
import {Text} from 'react-native';
import Screen from "../Screen";
//

function Contact(props) {
  return (
    <Screen {...props}>
      <Text> Hello from Contact screen!!!</Text>
    </Screen>
  );
}

export default Contact;
