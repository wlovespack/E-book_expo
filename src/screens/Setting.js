import React, { useContext } from "react";
import { Text, View, Picker, StyleSheet } from "react-native";
import Screen from "../Screen";
import languageContext from "../Language/languageContext";
//
function Setting(props) {
  return (
    <Screen {...props}>
      <Language />
    </Screen>
  );
}

export default Setting;

const Language = () => {
  const { lang,change, chosen } = useContext(languageContext);
  return (
    <View style={s.item}>
      <Text style={s.itemTitle}>{lang.setting_item_1}</Text>
      <Picker
        selectedValue={chosen}
        style={s.picker}
        onValueChange={(itemValue) => change(itemValue)}
      >
        <Picker.Item label="English" value="en" />
        <Picker.Item label="አማርኛ" value="am" />
      </Picker>
    </View>
  );
};

const s = StyleSheet.create({
  item: {
    borderWidth: 3,
    borderColor: "#ddd",
    width: 100 + "%",
    height: 60,
    backgroundColor: "#fff",
  },
  itemTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    position: "absolute",
    marginTop: 13,
  },
  picker: {
    height: 54,
    width: 150,
    position: "absolute",
    right: 50,
  },
});
