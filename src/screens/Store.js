import React from "react";
import {Text} from 'react-native';
import Screen from "../Screen";
//

function Store(props) {
  return (
    <Screen {...props}>
      <Text> Hello from Store screen!!!</Text>
    </Screen>
  );
}

export default Store;
