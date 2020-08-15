import React, { useState, useEffect } from "react";
//thrid-party plugins
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Spinner } from "native-base";
import { AsyncStorage } from "react-native";
import * as Network from 'expo-network';
//Components
import Home from "./src/screens/Home";
import Books from "./src/screens/Books";
import Store from "./src/screens/Store";
import Setting from "./src/screens/Setting";
import Contact from "./src/screens/Contact";
import Share from "./src/screens/Share";
import CustomDrawerContentComponent from "./src/CustomDrawerContentComponent";
//context
import Context, { lang, Themes } from "./src/Context";

//
function App() {
  const setting = AsyncStorage.getItem("setting");
  //
  const [chosenLanguage, setChosenLanguage] = useState("en");
  const [language, setLanguage] = useState(lang[chosenLanguage]);
  const [continueReading, setContinueReading] = useState(true);
  const [recommendation, setRecommendation] = useState(true);
  const [chosenTheme, setChosenTheme] = useState("default");
  const [theme, setTheme] = useState(Themes[chosenTheme]);
  const [appReady, setAppReady] = useState(false);
  const [refresher,setRefresher] = useState(0);
  const [isOnline,setIsOnline] = useState(false);
  //
  // check if the device has internet connection
  useEffect(()=>{
   function checkNetwork(){
     Network.getNetworkStateAsync().then(({isInternetReachable})=>{
      if(isOnline !== isInternetReachable){
        setIsOnline(isInternetReachable);
      } 
      }).catch(err=>console.log(err))
    }
    checkNetwork();
    const interval = setInterval(checkNetwork,5000);
    return ()=>clearInterval(interval)
  },[])
  //
  // A promise that gets resolved if AsyncStorage returns
  // the language that the user chose
  setting
    .then(e => {
      if (e) {
        const val = JSON.parse(e);
        setChosenLanguage(val.language);
        setContinueReading(val.continue);
        setRecommendation(val.recommend);
        setChosenTheme(val.theme);
      } else {
        setChosenLanguage('en');
        setContinueReading(true);
        setRecommendation(true);
        setChosenTheme('default');
      }
      setAppReady(true);
    })
    .catch((err) => {
      console.warn(err);
      setAppReady(true);
    });
  //
  const storeSetting = (v) => {
    AsyncStorage.setItem("setting", JSON.stringify(v));
  };
  const changeChosenLanguage = (v) => {
    storeSetting({
      language: v,
      continue: continueReading,
      recommend: recommendation,
      theme: chosenTheme,
    });
    setChosenLanguage(v);
  };
  const changeContinueReading = (v) => {
    storeSetting({
      language: chosenLanguage,
      continue: v,
      recommend: recommendation,
      theme: chosenTheme,
    });
    setContinueReading(v);
  };
  const changeRecommendation = (v) => {
    storeSetting({
      language: chosenLanguage,
      continue: continueReading,
      recommend: v,
      theme: chosenTheme,
    });
    setRecommendation(v);
  };
  const changeTheme = (v) => {
    storeSetting({
      language: chosenLanguage,
      continue: continueReading,
      recommend: recommendation,
      theme: v,
    });
    setChosenTheme(v);
  };
  const Refresh = () => {
    setRefresher(refresher + 1)
  }
  //change the overall language if the chosenLanguage changes
  useEffect(() => {
    setLanguage(lang[chosenLanguage]);
  }, [chosenLanguage]);

  useEffect(() => {
    setTheme(Themes[chosenTheme]);
  }, [chosenTheme]);

  const Nav = createAppContainer(
    createDrawerNavigator(
      {
        [language.menu_item_1]: Home,
        [language.menu_item_2]: Books,
        [language.menu_item_3]: Store,
        [language.menu_item_4]: Setting,
        [language.menu_item_5]: Contact,
        [language.menu_item_6]: Share,
      },
      {
        initialRouteName: language.menu_item_1,
        drawerPosition: "left",
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute: "DrawerOpen",
        drawerCloseRoute: "DrawerClose",
        drawerToggleRoute: "DrawerToggle",
      }
    )
  );
  // return <Nav />;
  if (appReady) {
    return (
      <Context.Provider
        value={{
          lang: language,
          changeChosenLanguage,
          chosenLanguage,
          continueReading,
          changeContinueReading,
          recommendation,
          changeRecommendation,
          theme,
          changeTheme,
          chosenTheme,
          Refresh,
          isOnline
        }}
      >
        {/* <Text>Test Test Test</Text> */}

        <Nav />
      </Context.Provider>
    );
  } else {
    return (
      <Spinner
        style={{ position: "absolute", top: 47 + "%", left: 47 + "%" }}
        color="black"
      />
    );
  }
}

export default App;
// import React from "react";
// import { Text } from "react-native";
// export default () => {
//   return <Text>The Test</Text>;
// };
