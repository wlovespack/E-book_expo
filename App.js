import React, { useState, useEffect } from "react";
//thrid-party plugins
 import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Spinner } from "native-base";
import { Text, AsyncStorage } from "react-native";
//Components
import Home from "./src/screens/Home";
import Books from "./src/screens/Books";
import Store from "./src/screens/Store";
import Setting from "./src/screens/Setting";
import Contact from "./src/screens/Contact";
import Share from "./src/screens/Share";
import CustomDrawerContentComponent from "./src/CustomDrawerContentComponent";
//context
import Context, { lang,Themes } from "./src/Context";

//
function App() {
  const ln = AsyncStorage.getItem("lang");
  const con = AsyncStorage.getItem("continue");
  const recommend = AsyncStorage.getItem('recommend');
  const th = AsyncStorage.getItem('theme')
  //
  const [chosenLanguage, setChosenLanguage] = useState("en");
  const [language, setLanguage] = useState(lang[chosenLanguage]);
  const [continueReading, setContinueReading] = useState(true);
  const [recommendation, setRecommendation] = useState(true);
  const [chosenTheme,setChosenTheme] = useState('default');
  const [theme,setTheme] = useState(Themes[chosenTheme]);
  const [appReady, setAppReady] = useState(false);
  // A promise that gets resolved if AsyncStorage returns
  // the language that the user chose
  ln.then(e => {
    setChosenLanguage(e ? e : "en")
  });
  con.then(e => setContinueReading(e?JSON.parse(e):true));
  recommend.then(e => setRecommendation(e?JSON.parse(e):true));
  th.then(e=>setChosenTheme(e?JSON.parse(e):'default'));
  //
  Promise.all([ln, con,recommend,th])
    .then(() => setAppReady(true))
    .catch((err) => {
      setAppReady(true);
      console.warn(err);
  });

  const changeChosenLanguage = v => {
    AsyncStorage.setItem("lang", v);
    setChosenLanguage(v);
  };
  const changeContinueReading = v => {
    AsyncStorage.setItem("continue", JSON.stringify(v));
    setContinueReading(v);
  }
  const changeRecommendation = v => {
    AsyncStorage.setItem("recommend", JSON.stringify(v));
    setRecommendation(v);
  }
  const changeTheme = v => {
    AsyncStorage.setItem('theme',JSON.stringify(v));
    setChosenTheme(v)
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
          chosenTheme
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
