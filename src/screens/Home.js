import React, { useContext } from "react";
import {Text} from 'react-native';
//component
import Screen from "../Screen";
//context
import languageContext from './../Language/languageContext';
//
function Home(props) {
  const {lang} = useContext(languageContext);
  
  return (
    <Screen {...props}>
      <Text> Hello from home screen!!!</Text>
      <Text> {lang.header_title}</Text>
    </Screen>
  );
}

export default Home;
