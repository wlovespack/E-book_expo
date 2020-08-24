import React from "react";
import AppIntroSlider from "react-native-app-intro-slider";
import { LinearGradient } from "expo-linear-gradient";
import { View, Text, StyleSheet,Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";


function Intro({setShowRealApp}) {
    const slides = [
        {
          key: "one",
          title: "Hands On",
          text:
            "Whenever & wherever you go, you can read your favorite books.",
          image: require("./../assets/intro/circle-cropped(1).png"),
          backgroundColor: "#59b2ab",
        },
        {
          key: "two",
          title: "Built in store",
          text: "Hand picked books will be available inside the store for free. you just need an internet connection",
          image: require("./../assets/intro/circle-cropped.png"),
          backgroundColor: "#febe29",
        },
        {
          key: "three",
          title: "Actively maintained",
          text: "We build frequent updates according to your feedbacks, which make things more interesting",
          image: require("./../assets/intro/circle-cropped(2).png"),
          backgroundColor: "#22bcb5",
        },
      ];
    _renderItem = ({ item }) => {
        return (
          <LinearGradient colors={["#6FC3F7", "#C2FDFF"]} style={styles.slide}>
            <View style={styles.view}>
              <Text style={styles.title}>{item.title}</Text>
              <Image source={item.image} style={styles.image} />
              <Text style={styles.text}>{item.text}</Text>
            </View>
          </LinearGradient>
        );
      };
      _onDone = () => {
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
        setShowRealApp(true);
      };
      _renderNextButton = () => {
        return (
          <View style={styles.buttonCircle}>
            <Ionicons
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
            <Ionicons name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
          </View>
        );
      };
  return (
    <AppIntroSlider
      renderItem={_renderItem}
      data={slides}
      onDone={_onDone}
      renderDoneButton={_renderDoneButton}
      renderNextButton={_renderNextButton}
    />
  );
}
export default Intro;

const styles = StyleSheet.create({
    view: {
      alignItems:'center',
      alignSelf: 'center',
      justifyContent:'center',
    },
    buttonCircle: {
      width: 40,
      height: 40,
      backgroundColor: "rgba(0, 0, 0, .2)",
      borderRadius: 20,
      justifyContent: "center",
      alignItems: "center",
    },
    slide: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#fff",
    },
    image: {
      width: 320,
      height: 320,
      marginVertical: 32,
      alignSelf:'center'
    },
    text: {
      color: "rgba(0, 0, 0, 0.8)",
      textAlign: "center",
      fontSize: 20,
      position: "relative",
      fontFamily: "Raleway-Regular",
      alignSelf:'center',
      maxWidth:'80%'
    },
    title: {
      fontSize: 40,
      color: "black",
      textAlign: "center",
      fontFamily: "Raleway-Regular",
      alignSelf:'center',
    },
  });
  
