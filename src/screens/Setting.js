import React, { useContext } from "react";
import {
  Text,
  View,
  Picker,
  StyleSheet,
  Switch,
  TouchableNativeFeedback,
  Alert,
  AsyncStorage,
  ToastAndroid,
} from "react-native";
import * as FileSystem from "expo-file-system";
//
import Screen from "../Screen";
import Context, { lang } from "../Context";
//
function Setting(props) {
  const { theme, lang } = useContext(Context);
  return (
    <Screen {...props}>
      <View style={s.con}>
        <Text style={[s.section, { color: theme.item_fadedText }]}>
          {lang.setting_section_1}
        </Text>
        <Language />

        <Text style={[s.section, { color: theme.item_fadedText }]}>
          {lang.setting_section_2}
        </Text>
        <Continue />
        <Recommended />

        <Text style={[s.section, { color: theme.item_fadedText }]}>
          {lang.setting_section_3}
        </Text>
        <Theme />
        <Text style={[s.section, { color: theme.item_fadedText }]}>
          {lang.setting_section_4}
        </Text>
        <ClearStorage />
        <ResetSettings />
      </View>
    </Screen>
  );
}

export default Setting;

const Language = () => {
  const { lang, changeChosenLanguage, chosenLanguage, theme } = useContext(
    Context
  );

  return (
    <View
      style={[
        s.item,
        { backgroundColor: theme.item_bg, borderColor: theme.item_border },
      ]}
    >
      <Text style={[s.itemTitle, { color: theme.item_text }]}>
        {lang.setting_item_1}
      </Text>
      <View style={s.itemAction}>
        <Picker
          selectedValue={chosenLanguage}
          style={[s.picker, { color: theme.item_text }]}
          prompt={lang.setting_pickerTitle_1}
          onValueChange={(itemValue) => changeChosenLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="አማርኛ" value="am" />
        </Picker>
      </View>
    </View>
  );
};

const Continue = () => {
  const { continueReading, changeContinueReading, theme, lang } = useContext(
    Context
  );
  return (
    <View
      style={[
        s.item,
        { backgroundColor: theme.item_bg, borderColor: theme.item_border },
      ]}
    >
      <Text style={[s.itemTitle, { color: theme.item_text }]}>
        {lang.setting_item_2}
      </Text>
      <View style={s.itemAction}>
        <Switch
          value={continueReading}
          onValueChange={(v) => {
            changeContinueReading(v);
          }}
        />
      </View>
    </View>
  );
};

const Recommended = () => {
  const { recommendation, changeRecommendation, theme, lang } = useContext(
    Context
  );
  return (
    <View
      style={[
        s.item,
        { backgroundColor: theme.item_bg, borderColor: theme.item_border },
      ]}
    >
      <Text style={[s.itemTitle, { color: theme.item_text }]}>
        {lang.setting_item_3}
      </Text>
      <View style={s.itemAction}>
        <Switch
          value={recommendation}
          onValueChange={(v) => {
            changeRecommendation(v);
          }}
        />
      </View>
    </View>
  );
};

const Theme = () => {
  const { theme, lang, changeTheme, chosenTheme } = useContext(Context);
  return (
    <View
      style={[
        s.item,
        { backgroundColor: theme.item_bg, borderColor: theme.item_border },
      ]}
    >
      <Text style={[s.itemTitle, { color: theme.item_text }]}>
        {lang.setting_item_4}
      </Text>
      <View style={s.itemAction}>
        <Picker
          selectedValue={chosenTheme}
          style={[s.picker, { color: theme.item_text }]}
          prompt={lang.setting_pickerTitle_2}
          onValueChange={(itemValue) => changeTheme(itemValue)}
        >
          <Picker.Item label={lang.setting_item_4_label_1} value="default" />
          <Picker.Item label={lang.setting_item_4_label_2} value="light" />
          <Picker.Item label={lang.setting_item_4_label_3} value="dark" />
        </Picker>
      </View>
    </View>
  );
};

const ClearStorage = () => {
  const { theme, lang, Refresh } = useContext(Context);
  const clear = () => {
    Alert.alert(
      lang.setting_item_5_alert_title,
      lang.setting_item_5_alert_body,
      [
        {
          text: lang.setting_item_5_alert_positive,
          onPress: () => {
            AsyncStorage.getItem("books")
              .then((e) => {
                if (e) {
                  const val = JSON.parse(e);
                  val.map((v) => {
                    FileSystem.deleteAsync(v.img);
                    FileSystem.deleteAsync(v.file);
                  });
                  Refresh();
                }
                AsyncStorage.removeItem("books", (err) => console.log(err));
              })
              .catch((err) => console.log(err));
            ToastAndroid.showWithGravityAndOffset(
              lang.setting_item_5_toast,
              ToastAndroid.LONG,
              ToastAndroid.BOTTOM,
              25,
              95
            );
          },
        },
        { text: lang.setting_item_5_alert_negative, style: "cancel" },
      ],
      { cancelable: true }
    );
  };
  return (
    <View
      style={[
        s.item,
        { backgroundColor: theme.item_bg, borderColor: theme.item_border },
      ]}
    >
      <Text style={[s.itemTitle, { color: theme.item_text }]}>
        {lang.setting_item_5}
      </Text>
      <View style={s.itemAction}>
        <TouchableNativeFeedback onPress={clear}>
          <View style={s.itemCon}>
            <Text style={s.itemText}>{lang.setting_item_5_button}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};

const ResetSettings = () => {
  const { theme, lang, Refresh } = useContext(Context);
  const reset = () => {
    Alert.alert(
      lang.setting_item_6_alert_title,
      lang.setting_item_6_alert_body,
      [
        {
          text: lang.setting_item_6_alert_positive,
          onPress: () => {
            AsyncStorage.removeItem("setting", (err) => console.log(err));
            Refresh();
          },
        },
        { text: lang.setting_item_6_alert_negative, style: "cancel" },
      ],
      { cancelable: true }
    );
  };
  return (
    <View
      style={[
        s.item,
        { backgroundColor: theme.item_bg, borderColor: theme.item_border },
      ]}
    >
      <Text style={[s.itemTitle, { color: theme.item_text }]}>
        {lang.setting_item_6}
      </Text>
      <View style={s.itemAction}>
        <TouchableNativeFeedback onPress={reset}>
          <View style={s.itemCon}>
            <Text style={s.itemText}>{lang.setting_item_6_button}</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </View>
  );
};
const s = StyleSheet.create({
  con: {
    width: 98 + "%",
    left: 1 + "%",
    marginLeft: 1.5,
    marginTop: 10,
  },
  item: {
    borderBottomWidth: 3,
    borderRightWidth: 3,
    width: 100 + "%",
    height: 60,
    marginBottom: 5,
    borderRadius: 10.
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    position: "absolute",
    marginTop: 13,
  },
  itemAction: {
    position: "absolute",
    right: 6 + "%",
    height: 54,
    justifyContent: "center",
  },
  itemCon: {
    height: 100 + "%",
    width: 85,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: {
    fontSize: 17,
    color: "rgb(31,111,202)",
  },
  picker: {
    height: 54,
    width: 150,
  },
  section: {
    marginTop: 5,
    paddingLeft: 15,
    fontSize: 20,
    marginBottom: 10,
  },
});
