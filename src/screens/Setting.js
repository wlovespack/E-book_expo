import React, { useContext } from "react";
import { Text, View, Picker, StyleSheet, Switch } from "react-native";
import Screen from "../Screen";
import Context from "../Context";
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
  const { continueReading, changeContinueReading, theme,lang } = useContext(Context);
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
  const { recommendation, changeRecommendation, theme,lang } = useContext(Context);
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
  const { theme,lang, changeTheme, chosenTheme } = useContext(Context);
  return (
    <View
      style={[
        s.item,
        { backgroundColor: theme.item_bg, borderColor: theme.item_border },
      ]}
    >
      <Text style={[s.itemTitle, { color: theme.item_text }]}>{lang.setting_item_4}</Text>
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
