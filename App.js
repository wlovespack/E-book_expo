import React, { useState, useEffect } from "react";
//thrid-party plugins
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Spinner } from "native-base";
import { Text,AsyncStorage } from "react-native";
//Components
import Home from "./src/screens/Home";
import Books from "./src/screens/Books";
import Store from "./src/screens/Store";
import Setting from "./src/screens/Setting";
import Contact from "./src/screens/Contact";
import Share from "./src/screens/Share";
import CustomDrawerContentComponent from "./src/CustomDrawerContentComponent";
//context
import languageContext, { lang } from "./src/Language/languageContext";

//
function App() {
  const ln = AsyncStorage.getItem("lang");
  const [chosenLanguage, setChosenLanguage] = useState("en");
  const [language, setlanguage] = useState(lang[chosenLanguage]);
  const [appReady, setAppReady] = useState(false);

  // A promise that gets resolved if AsyncStorage returns 
  // the language that the user chose 
  ln.then((e) => {
    setChosenLanguage(e ? e : "en");
    setAppReady(true);
  }).catch((err) => {
    console.warn(err);
    setAppReady(true);
  });

  const changeChosenLanguage = (value) => {
    AsyncStorage.setItem("lang", value);
    globalLanguage = value;
    setChosenLanguage(value);
  };
  //change the overall language if the chosenLanguage changes
  useEffect(() => {
    setlanguage(lang[chosenLanguage]);
  }, [chosenLanguage]);

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
      <languageContext.Provider
        value={{
          lang: language,
          change: changeChosenLanguage,
          chosen: chosenLanguage,
        }}
      >
{/* <Text>Test Test Test</Text> */}
      
      <Nav />
      </languageContext.Provider>
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
// export default ()=>{
//   return <Text>The Test</Text>
// };
