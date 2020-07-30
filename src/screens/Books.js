import React from "react";
import {Text} from 'react-native';
import Screen from "../Screen";
//

function Books(props) {
  return (
    <Screen {...props}>
      <Text> Hello from Books screen!!!</Text>
    </Screen>
  );
}

export default Books;
