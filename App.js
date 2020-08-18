import React, { useState, useEffect } from "react";
//thrid-party plugins
import { createDrawerNavigator } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Spinner } from "native-base";
import { AsyncStorage, StyleSheet, Text, Image, View } from "react-native";
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

//For intro
import AppIntroSlider from "react-native-app-intro-slider";
import Icon from 'react-native-vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
//For font
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
function App() {
  //slides for intro
  const slides = [
    {
      key: 'one',
      title: 'Hands On',
      text: 'Whenever & wherever You go You can read & Do whatever You have to To.',
      image: require('./assets/intro/circle-cropped(1).png'),
      backgroundColor: '#59b2ab',
      position: "relative",
      left: 50
    },
    {
      key: 'two',
      title: 'Awosem look',
      text: 'interactive UI & Ux  design',
      image: require('./assets/intro/circle-cropped(2).png'),
      backgroundColor: '#febe29',
    },
    {
      key: 'three',
      title: 'G11 & G12',
      text: 'Composed of two grades',
      image: require('./assets/intro/circle-cropped.png'),
      backgroundColor: '#22bcb5',
    }
  ];
  //states for to show the real app
  const [showRealApp, setShowRealApp] = useState(false);
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  //
  const setting = AsyncStorage.getItem("setting");
  //
  const [chosenLanguage, setChosenLanguage] = useState("en");
  const [language, setLanguage] = useState(lang[chosenLanguage]);
  const [continueReading, setContinueReading] = useState(true);
  const [recommendation, setRecommendation] = useState(true);
  const [chosenTheme, setChosenTheme] = useState("default");
  const [theme, setTheme] = useState(Themes[chosenTheme]);
  const [appReady, setAppReady] = useState(false);
  const [refresher, setRefresher] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  //


  // check if the device has internet connection
  useEffect(() => {
    function checkNetwork() {
      Network.getNetworkStateAsync().then(({ isInternetReachable }) => {
        if (isOnline !== isInternetReachable) {
          setIsOnline(isInternetReachable);
        }
      }).catch(err => console.log(err))
    }
    checkNetwork();
    const interval = setInterval(checkNetwork, 5000);
    return () => clearInterval(interval)
  }, [])
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




  _renderItem = ({ item }) => {
    return (
      <LinearGradient
        colors={['#6FC3F7', '#C2FDFF',]} style={styles.slide}>
        <View style={styles.view} >
          <Text style={styles.title}>{item.title}</Text>
          <Image source={item.image} style={styles.image} />
          <Text style={styles.text}>{item.text}</Text>
        </View>


      </LinearGradient>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    setShowRealApp(true);
  }
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  async function loadResourcesAsync() {
    await Promise.all([
      Font.loadAsync({
        'Raleway-Regular': require('./assets/fonts/Raleway-Regular.ttf')
      }),
    ]);

  }

  function handleLoadingError(error) {
    console.warn(error);
  }

  function handleFinishLoading(setLoadingComplete) {
    setLoadingComplete(true);
  }

  // return <Nav />;
  if (!isLoadingComplete) {
    return (
      <AppLoading
        startAsync={loadResourcesAsync}
        onError={handleLoadingError}
        onFinish={() => handleFinishLoading(setLoadingComplete)}
      />
    );
  } else {
    if (showRealApp) {
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
    } else {
      return <AppIntroSlider
        renderItem={this._renderItem}
        data={slides}
        onDone={this._onDone}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />;
    }
  }
}
export default App;
const styles = StyleSheet.create({
  view: {
    position: 'absolute',
    left: 18
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',

  },
  image: {
    width: 320,
    height: 320,
    marginVertical: 32,

  },
  text: {
    color: 'rgba(0, 0, 0, 0.8)',
    textAlign: 'center',
    fontSize: 20,
    marginRight: 10,
    position: 'relative',
    fontFamily: 'Raleway-Regular'
  },
  title: {
    fontSize: 40,
    color: 'black',
    textAlign: 'center',
    fontFamily: 'Raleway-Regular'
  },
});