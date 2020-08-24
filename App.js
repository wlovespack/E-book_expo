import React, { useState, useEffect } from "react";
//thrid-party plugins
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { AsyncStorage } from "react-native";
import * as Network from "expo-network";
//For font
import { AppLoading } from "expo";
import * as Font from "expo-font";
//Components
import Home from "./src/screens/Home";
import Books from "./src/screens/Books";
import Store from "./src/screens/Store";
import Setting from "./src/screens/Setting";
import Contact from "./src/screens/Contact";
import Share from "./src/screens/Share";
import CustomDrawerContentComponent from "./src/CustomDrawerContentComponent";
import Intro from "./src/Intro";
//context
import Context,{ lang, Themes } from "./src/Context";

function App() {
  //states for to show the real app
  const [showRealApp, setShowRealApp] = useState(true);
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  //
  const [chosenLanguage, setChosenLanguage] = useState("en");
  const [language, setLanguage] = useState(lang[chosenLanguage]);
  const [continueReading, setContinueReading] = useState(true);
  const [recommendation, setRecommendation] = useState(true);
  const [chosenTheme, setChosenTheme] = useState("dark");
  const [theme, setTheme] = useState(Themes[chosenTheme]);
  const [isOnline, setIsOnline] = useState(false);
  const [refresh,setRefresh] = useState(0);
  //
  const Refresh = () => {
    setRefresh(refresh + 1)
  }
  // check if the device has internet connection
  let mount = true;
  useEffect(() => {
    if(mount){
      AsyncStorage.getItem('intro').then(e=>{
        if(!JSON.parse(e)){
          setShowRealApp(false);
          AsyncStorage.setItem('intro',JSON.stringify(true));
        }
      })
    }
    function checkNetwork() {
      Network.getNetworkStateAsync()
        .then(({ isInternetReachable }) => {
          if (isOnline !== isInternetReachable) {
            if (mount) {
              setIsOnline(isInternetReachable);
            }
          }
        })
        .catch((err) => console.log(err));
    }
    checkNetwork();
    const interval = setInterval(checkNetwork, 10000);
    return () => {
      clearInterval(interval);
      mount = false;
    };
  }, []);

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
    setChosenLanguage(v)    
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

  //change the overall language if the chosenLanguage changes
  useEffect(() => {
    if (mount) {
      setLanguage(lang[chosenLanguage]);
    }
    return () => (mount = false);
  }, [chosenLanguage]);

  useEffect(() => {
    if (mount) {
      setTheme(Themes[chosenTheme]);
    }
    return () => (mount = false);
  }, [chosenTheme]);

  // A promise that gets resolved if AsyncStorage returns
  // settings data
  useEffect(() => {
    if(mount){
      AsyncStorage.getItem("setting")
      .then((e) => {
        if (e) {
          const val = JSON.parse(e);
          setChosenLanguage(val.language);
          setContinueReading(val.continue);
          setRecommendation(val.recommend);
          setChosenTheme(val.theme);
        } else {
          setChosenLanguage("en");
          setContinueReading(true);
          setRecommendation(true);
          setChosenTheme("default");
        }
      })
      .catch((err) => console.log(err));
    }
    return () => (mount = false);

  }, []);

  //
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

  async function loadResourcesAsync() {
    await Promise.all([
      Font.loadAsync({
        "Raleway-Regular": require("./assets/fonts/Raleway-Regular.ttf"),
      }),
    ]);
  }

  function handleLoadingError(error) {
    console.warn(error);
  }

  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => setLoadingComplete(true)}
      />
    );
  } else {
    if (showRealApp) {
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
          isOnline,
          Refresh
        }}
      >
      <Nav />
      </Context.Provider>
      )
      
    } else {
      return <Intro setShowRealApp={setShowRealApp} />;
    }
  }
}
export default App;
