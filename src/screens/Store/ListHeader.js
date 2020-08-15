import React, { useContext } from "react";
import { Text } from "react-native";
import Context from "./../../Context";
//
function ListHeader({ s, DATA, searchType, resultValue }) {
  const { theme,lang } = useContext(Context);
  const orReplacer = (string, condition) => {
    const part = string.split(":");
    const or = part[1].split("/");
    let part1 = "";
    if (condition) {
      part1 = or[0];
    } else {
      part1 = or[1];
    }
    return part[0] + part1 + part[2];
  };
  const r = (string, value, r = "") => {
    return string.replace(`{r${r}}`, value);
  };
  if (DATA[0]) {
    if (searchType == "search") {
      return (
        <Text style={[s.result, { color: theme.item_text }]}>
          {r(
            r(
              orReplacer(lang.store_list_header_1, DATA.length == 1),
              DATA.length
            ),
            resultValue,
            2
          )}
        </Text>
      );
    } else if (searchType == "random") {
      return (
        <Text style={[s.result, { color: theme.item_text }]}>
          {orReplacer(
            r(lang.store_list_header_2, DATA.length),
            DATA.length == 1
          )}
        </Text>
      );
    } else if (searchType == "all") {
      return (
        <Text style={[s.result, { color: theme.item_text }]}>
          {orReplacer(
            r(lang.store_list_header_3, DATA.length),
            DATA.length == 1
          )}
        </Text>
      );
    }
    return null;
  }
  return null;
}

export default ListHeader;
