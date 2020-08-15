import React, { useContext } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableNativeFeedback,
} from "react-native";
// import * as SMS from 'expo-sms'; uncomment this after you install expo-sms
import * as Linking from "expo-linking";
//
import Screen from "../Screen";
import Context from "./../Context";
//

function Contact(props) {
  const { theme, lang } = useContext(Context);

  return (
    <Screen {...props}>
      <TouchableNativeFeedback
      onPress={() => Linking.openURL("https://t.me/keni94")}
      >
        <View
          style={[
            s.block,
            { backgroundColor: theme.item_bg, borderColor: theme.item_border },
          ]}
        >
          <View style={s.img}>
            <Image
              source={require("./../../assets/Telegram.png")}
              style={s.imgActual2}
            />
          </View>
          <View style={s.txt}>
            <Text style={[s.txtHeader, { color: theme.item_text }]}>
              {lang.contact_item_1_title}
            </Text>
            <Text style={[s.txtBody, { color: theme.item_fadedText }]}>
              {lang.contact_item_1_body}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback
        onPress={() => Linking.openURL("sms: +251982381660")}
      >
        <View
          style={[
            s.block,
            { backgroundColor: theme.item_bg, borderColor: theme.item_border },
          ]}
        >
          <View style={s.img}>
            <Image
              source={require("./../../assets/sms.png")}
              style={s.imgActual}
            />
          </View>
          <View style={s.txt}>
            <Text style={[s.txtHeader, { color: theme.item_text }]}>
              {lang.contact_item_2_title}
            </Text>
            <Text style={[s.txtBody, { color: theme.item_fadedText }]}>
              {lang.contact_item_2_body}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback>
        <View
          style={[
            s.block,
            { backgroundColor: theme.item_bg, borderColor: theme.item_border },
          ]}
        >
          <View style={s.img}>
            <Image
              source={require("./../../assets/how.png")}
              style={s.imgActual}
            />
          </View>
          <View style={s.txt}>
            <Text style={[s.txtHeader, { color: theme.item_text }]}>
              {lang.contact_item_3_title}
            </Text>
            <Text style={[s.txtBody, { color: theme.item_fadedText }]}>
              {lang.contact_item_3_body}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>

      <TouchableNativeFeedback>
        <View
          style={[
            s.block,
            { backgroundColor: theme.item_bg, borderColor: theme.item_border },
          ]}
        >
          <View style={s.img}>
            <Image
              source={require("./../../assets/faq.png")}
              style={s.imgActual}
            />
          </View>
          <View style={s.txt}>
            <Text style={[s.txtHeader, { color: theme.item_text }]}>
              {lang.contact_item_4_title}
            </Text>
            <Text style={[s.txtBody, { color: theme.item_fadedText }]}>
              {lang.contact_item_4_body}
            </Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    </Screen>
  );
}
const s = StyleSheet.create({
  block: {
    position: "relative",
    top: 30,
    left: 5 + "%",
    width: 90 + "%",
    minHeight: 100,
    maxHeight: 170,
    flexDirection: "row",
    borderRadius: 10,
    paddingRight: 10,
    marginBottom: 20,
    borderWidth: 1,
  },
  img: {
    maxWidth: 100,
    height: 100 + "%",
    flex: 1,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  imgActual: {
    height: 40,
    width: 40,
  },
  imgActual2: {
    height: 45,
    width: 45,
  },
  txt: {
    height: 100 + "%",
    flex: 4.25,
  },
  txtHeader: {
    fontSize: 22,
    marginTop: 15,
  },
  txtBody: {
    fontSize: 15,
    fontWeight: "300",
    paddingBottom:5,
  },
});
export default Contact;
