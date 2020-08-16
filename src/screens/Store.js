import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TextInput,
  AsyncStorage,
  ToastAndroid,
  Button,
  Alert,
} from "react-native";
import { Spinner } from "native-base";
import { Ionicons } from "@expo/vector-icons";
// import * as Network from 'expo-network';
//
import Screen from "../Screen";
import Context from "../Context";
import { searchHub } from "./../SearchHub";
import BookCard from "./Store/BookCard";
import EmptyList from "./Store/EmptyList";
import ListHeader from "./Store/ListHeader";
import { TouchableNativeFeedback } from "react-native-gesture-handler";
//

function Store(props) {
  const { theme, lang,isOnline } = useContext(Context);
  const [text, setText] = useState("");
  const [resultValue, setResultValue] = useState("");
  const [DATA, setDATA] = useState([]);
  const [existingBooks, setExistingBooks] = useState([]);
  const [failedRequest, setFailedRequest] = useState(false);
  const [searchType, setSearchType] = useState("search");
  const [fetchAllPressed, setFetchAllPressed] = useState(false);
  const [spin, setSpin] = useState(false);
  const [downloadCount, setDownloadCount] = useState([]);
  //
  const changeDownloadCount = (fileName, bend = true) => {
    if (bend) {
      let array = downloadCount;
      array.push(fileName);
      setDownloadCount(array);
    } else {
      let array = [];
      downloadCount.map((i) => {
        if (i == fileName) {
        } else {
          array.push(i);
        }
      });
      setDownloadCount(array);
    }
  };
  //
  const search = (v, type = "search") => {
    if (downloadCount.length == 0) {
      setSearchType(type);
      setSpin(true);
      setDATA([]);
      setResultValue("");
      if (isOnline) {
        searchHub(v, type)
          .then((e) => {
            setSpin(false);
            if (e) {
              setDATA(e);
              setResultValue(v);
              setFailedRequest(false);
            } else {
              setFailedRequest(lang.store_failedRequest_1);
            }
          })
          .catch(() => {
            setSpin(false);
            setFailedRequest(lang.store_failedRequest_2);
          });
      } else {
        toast(lang.store_toast_1);
      }
    } else {
      toast(lang.store_toast_2);
    }
  };
  const toast = (value) => {
    ToastAndroid.showWithGravityAndOffset(
      value,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      95
    );
  };
  const fetchAllBooks = () => {
    if (fetchAllPressed) {
      setSearchType("all");
      search("", "all");
    } else {
      Alert.alert(lang.store_alert_1_title, lang.store_alert_1_body, [], {
        cancelable: true,
      });
      setFetchAllPressed(true);
    }
  };
  useEffect(() => {
    // checkNetwork();
    AsyncStorage.getItem("books")
      .then((e) => {
        if (e) {
          const books = JSON.parse(e);
          let result = [];
          books.map((i) => {
            result.push(i.id);
          });
          setExistingBooks(result);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  const lookForBook = (id) => {
    let found = false;
    existingBooks.map((i) => {
      if (i == id) {
        found = true;
      }
    });
    return found;
  };
  return (
    <Screen {...props}>
      {spin ? (
        <View style={s.spinner}>
          <Spinner color="black" />
        </View>
      ) : (
        <View />
      )}
      <SafeAreaView>
        <View>
          <TextInput
            onChangeText={(e) => setText(e)}
            value={text}
            style={[
              s.input,
              {
                borderColor: theme.input_border,
                color: theme.item_text,
                backgroundColor: theme.input_bg,
              },
            ]}
            placeholder={lang.store_search}
            selectTextOnFocus={true}
            onSubmitEditing={(e) => search(e.nativeEvent.text)}
          />
          <View style={s.searchIcon}>
            <TouchableNativeFeedback
              onPress={() => (text !== "" && text !== " " ? search(text) : "")}
              style={{ paddingHorizontal: 15, paddingVertical: 7 }}
            >
              <Ionicons
                name="md-search"
                color={
                  text !== "" && text !== " "
                    ? theme.item_text
                    : theme.item_fadedText
                }
                size={30}
              />
            </TouchableNativeFeedback>
          </View>
        </View>
        <View style={s.buttonCon}>
          <View style={{ flex: 1, marginRight: 3 + "%" }}>
            <Button
              title={lang.store_button_1}
              color={theme.button}
              onPress={fetchAllBooks}
            />
          </View>
          <View style={{ flex: 1, marginLeft: 3 + "%" }}>
            <Button
              title={lang.store_button_2}
              color={theme.button}
              onPress={() => search("", "random")}
            />
          </View>
        </View>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index}
          numColumns={2}
          renderItem={({ item }) => (
            <BookCard
              changeDownloadCount={changeDownloadCount}
              img={item.img}
              file={item.file}
              lookForBook={lookForBook}
              s={s}
              existingBooks={existingBooks}
              setExistingBooks={setExistingBooks}
              props={props}
            />
          )}
          columnWrapperStyle={s.col}
          ListEmptyComponent={() => (
            <EmptyList s={s} failedRequest={failedRequest} resultValue={resultValue}/>
          )}
          ListHeaderComponent={() => (
            <ListHeader
              s={s}
              DATA={DATA}
              searchType={searchType}
              resultValue={resultValue}
            />
          )}
        />
      </SafeAreaView>
    </Screen>
  );
}

export default Store;

const s = StyleSheet.create({
  spinner: {
    position: "absolute",
    top: 39 + "%",
    left: 45 + "%",
    backgroundColor: "rgba(255,255,255,0.5)",
    padding: 5,
    height: 70,
    borderRadius: 35,
    zIndex: 100,
  },
  block: {
    width: 45 + "%",
    height: 100 + "%",
    marginHorizontal: 2.5 + "%",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 3,
  },
  col: {
    width: 100 + "%",
    height: 300,
    marginVertical: 15,
  },
  head: {
    fontSize: 22,
    marginLeft: 20,
    marginTop: 10,
  },
  input: {
    height: 45,
    width: 90 + "%",
    left: 5 + "%",
    marginTop: 30,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 30,
    paddingLeft: 20,
    paddingRight: 45,
    fontSize: 20,
  },
  searchIcon: {
    position: "absolute",
    right: 5 + "%",
    marginTop: 30,
    marginRight: 3,
    borderRadius: 20,
    overflow: "hidden",
  },
  buttonCon: {
    flexDirection: "row",
    width: 100 + "%",
    marginVertical: 10,
    paddingHorizontal: 6 + "%",
  },
  emptyCon: {
    height: 240,
    marginTop: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  empty: {
    fontSize: 20,
    marginTop: 10,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 5,
    padding: 10,
  },
  result: {
    fontSize: 20,
    alignSelf: "center",
  },
  bottom: {
    backgroundColor: "rgba(0,0,0,0.8)",
    position: "absolute",
    bottom: 0,
    width: 100 + "%",
  },
  size: {
    alignSelf: "center",
    fontSize: 20,
    color: "#fff",
    marginVertical: 5,
  },
  progCon: {
    position: "absolute",
    bottom: 0,
    width: 100 + "%",
    height: 8,
    borderTopWidth: 0.4,
    borderColor: "rgb(30,136,229)",
  },
  prog: {
    height: 100 + "%",
    backgroundColor: "rgb(30,136,229)",
  },
  mb: {
    fontSize: 16,
    color: "#fff",
    top: 10,
    marginLeft: 5,
  },
  percent: {
    fontSize: 16,
    color: "#fff",
    textAlign: "right",
    marginBottom: 20,
    marginTop: -14,
    marginRight: 5,
  },
  already: {
    fontSize: 20,
    alignSelf: "center",
    marginVertical: 7,
    color: "#fff",
  },
});
