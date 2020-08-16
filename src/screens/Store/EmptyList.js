import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Context from "./../../Context";

function EmptyList({ s, failedRequest,resultValue }) {
  const { lang, theme,isOnline } = useContext(Context);
  //
  const r = (string, value, r = "") => {
    return string.replace(`{r${r}}`, value);
  };
  return (
    <View>
      {isOnline ? (
        !failedRequest ? (
          <View style={s.emptyCon}>
            <Ionicons
              name="md-search"
              size={100}
              color={theme.item_fadedText}
            />
            <Text style={[s.empty, { color: theme.item_text }]}>
              {resultValue == ""
                ? lang.store_empty
                : r(lang.store_list_notFound, resultValue)}
            </Text>
          </View>
        ) : (
          <View style={s.emptyCon}>
            <Ionicons name="md-bug" size={100} color={theme.item_fadedText} />
            <Text style={[s.empty, { color: theme.item_text, fontSize: 25 }]}>
              {lang.store_list_problem}
            </Text>
            <Text
              style={[s.empty, { color: theme.item_text, textAlign: "center" }]}
            >
              {r(lang.store_list_problem_des, failedRequest)}
            </Text>
          </View>
        )
      ) : (
        <View style={s.emptyCon}>
          <Ionicons
            name="md-airplane"
            size={100}
            color={theme.item_fadedText}
          />
          <Text style={[s.empty, { color: theme.item_text, fontSize: 30 }]}>
            {lang.store_list_internet}
          </Text>
          <Text style={[s.empty, { color: theme.item_text }]}>
            {lang.store_list_internet_des}
          </Text>
        </View>
      )}
    </View>
  );
}

export default EmptyList;
