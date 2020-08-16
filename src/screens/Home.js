import React, { useContext, useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  Button,
  TouchableNativeFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
//component
import Screen from "./../Screen";
//context
import Context from "./../Context";
import { getRecommendation } from "./../SearchHub";
//
function Home(props) {
  const { lang, continueReading, recommendation, theme, isOnline } = useContext(
    Context
  );
  const [recommend, setRecommend] = useState(null);
  const [reading, setReading] = useState({
    book: "Math grade 12",
    page: 12,
    time: '12-23-2020',
  });
  // const [reading, setReading] = useState(false);
  //
  useEffect(() => {
    getRecommendation().then((e) => setRecommend(e));
  }, []);
  return (
    <Screen {...props}>
      {continueReading ? (
        <View
          style={[
            s.block,
            {
              backgroundColor: theme.item_bg,
              borderColor: theme.item_border,
            },
          ]}
        >
          <View style={[s.head, { backgroundColor: theme.home_continue_bg }]}>
            <Text style={[s.continue, { color: theme.item_fadedText }]}>
              {lang.home_card_1_header}
            </Text>
          </View>
          {reading ? (
            <View style={s.body}>
              <View
                style={{
                  padding: 5,
                  borderRightWidth: 2,
                  borderRightColor: theme.item_border,
                }}
              >
                <Text style={[s.des, { color: theme.item_fadedText }]}>
                  {lang.home_card_1_item_1}:
                </Text>
                <Text style={[s.value, { color: theme.item_text }]}>
                  {reading.book}{" "}
                </Text>
              </View>
              <View
                style={{
                  flex: 1,
                  padding: 5,
                  borderRightWidth: 2,
                  borderRightColor: theme.item_border,
                }}
              >
                <Text style={[s.des, { color: theme.item_fadedText }]}>
                  {lang.home_card_1_item_2}:
                </Text>
                <Text style={[s.value, { color: theme.item_text }]}>
                  {" "}
                  {reading.page}
                </Text>
              </View>
              <View style={{ flex: 2, padding: 5 }}>
                <Text style={[s.des, { color: theme.item_fadedText }]}>
                  {lang.home_card_1_item_3}:
                </Text>
                <Text style={[s.value, { color: theme.item_text }]}>
                  {" "}
                  {reading.time}
                </Text>
              </View>
            </View>
          ) : (
            <View style={s.body2}>
            <View style={s.noInternetCon}>
                  <Ionicons
                    name="md-sad"
                    style={s.noInternetIcon}
                    size={25}
                    color={theme.item_fadedText}
                  />
              <Text style={[s.noInternet, { color: theme.item_fadedText }]}>
                Nothing to show
              </Text>
              </View>
              <Text style={[s.noInternetDes, { color: theme.item_fadedText }]}>
                Once you start reading some book this feature will be available
              </Text>
            </View>
          )}
          <Button title={`${lang.home_button_1} >>`} color={theme.button} />
        </View>
      ) : (
        <View />
      )}
      {recommendation ? (
        <View
          style={[
            s.block,
            { borderColor: theme.item_border, backgroundColor: theme.item_bg },
          ]}
        >
          <View style={[s.head2, { backgroundColor: theme.home_recommend_bg }]}>
            <Text style={[s.continue, { color: theme.item_fadedText }]}>
              {lang.home_card_2_header}
            </Text>
          </View>
          <View style={s.body2}>
            {isOnline ? (
              <View>
                <Text style={[s.title, { color: theme.item_text }]}>
                  {recommend ? recommend.name : ""}
                </Text>
                <Text style={[s.publisher, { color: theme.item_fadedText }]}>
                  {lang.home_card_2_item_1}:{" "}
                  {recommend ? recommend.publisher : ""}
                </Text>
              </View>
            ) : (
              <View>
                <View style={s.noInternetCon}>
                  <Ionicons
                    name="md-airplane"
                    style={s.noInternetIcon}
                    size={25}
                    color={theme.item_fadedText}
                  />
                  <Text style={[s.noInternet, { color: theme.item_fadedText }]}>
                    No Internet
                  </Text>
                </View>
                <Text
                  style={[s.noInternetDes, { color: theme.item_fadedText }]}
                >
                  Internet connection is needed to show recommended books.
                </Text>
              </View>
            )}
          </View>
          <Button
            title={`${lang.home_button_2} >>`}
            color={theme.button}
          />
        </View>
      ) : (
        <View />
      )}
      <View style={s.cards}>
        <TouchableNativeFeedback
          onPress={() => props.navigation.navigate(lang.menu_item_3)}
        >
          <View
            style={[
              s.card,
              {
                borderColor: theme.item_border,
                backgroundColor: theme.item_bg,
              },
            ]}
          >
            <Ionicons name="md-cart" size={35} color={theme.item_text} />
            <Text style={[s.cardTitle, { color: theme.item_text }]}>
              {lang.home_smallCard_1}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => props.navigation.navigate(lang.menu_item_2)}
        >
          <View
            style={[
              s.card,
              {
                borderColor: theme.item_border,
                backgroundColor: theme.item_bg,
              },
            ]}
          >
            <Ionicons name="md-bookmarks" size={35} color={theme.item_text} />
            <Text style={[s.cardTitle, { color: theme.item_text }]}>
              {lang.home_smallCard_2}
            </Text>
          </View>
        </TouchableNativeFeedback>
        <TouchableNativeFeedback
          onPress={() => props.navigation.navigate(lang.menu_item_5)}
        >
          <View
            style={[
              s.card1,
              {
                borderColor: theme.item_border,
                backgroundColor: theme.item_bg,
              },
            ]}
          >
            <Ionicons
              name="md-information-circle"
              size={35}
              color={theme.item_text}
            />
            <Text style={[s.cardTitle, { color: theme.item_text }]}>
              {lang.home_smallCard_3}
            </Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </Screen>
  );
}
const s = StyleSheet.create({
  block: {
    position: "relative",
    top: 15,
    left: 2.5 + "%",
    width: 95 + "%",
    height: 200,
    borderRadius: 10,
    borderWidth: 3,
    marginBottom: 10,
  },
  head: {
    padding: 6,
    paddingLeft: 25,
    top: -2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  continue: {
    fontSize: 20,
    fontWeight: "400",
  },
  body: {
    width: 100 + "%",
    height: 120,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 25,
    paddingBottom: 30,
    flexDirection: "row",
  },
  des: {
    fontSize: 18,
    fontWeight: "300",
    marginBottom: 5,
  },
  value: {
    fontSize: 16,
    maxWidth: 200,
    minWidth: 100,
  },
  body2: {
    width: 100 + "%",
    height: 120,
    paddingLeft: 30,
    paddingRight: 30,
    paddingTop: 25,
    paddingBottom: 30,
  },
  title: {
    fontSize: 30,
  },
  publisher: {
    fontSize: 18,
  },
  head2: {
    padding: 6,
    paddingLeft: 25,
    top: -2,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cards: {
    position: "relative",
    top: 20,
    left: 2 + "%",
    width: 95.5 + "%",
    flexDirection: "row",
    marginBottom: 50,
  },
  card: {
    flex: 1,
    height: 115,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 15,
    borderRadius: 10,
    borderWidth: 3,
  },
  card1: {
    flex: 1,
    height: 115,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 3,
  },
  cardTitle: {
    fontSize: 22,
  },
  noInternet: {
    fontSize: 25,
    textAlign: "center",
  },
  noInternetDes: {
    fontSize: 16,
    textAlign: "center",
  },
  noInternetCon: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: -10,
    marginBottom: 5,
  },
  noInternetIcon: {
    alignSelf: "center",
    marginRight: 5,
  },
});
export default Home;
