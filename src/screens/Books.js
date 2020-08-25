import React, { useState, useContext, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableNativeFeedback,
  AsyncStorage,
  Button,
  ToastAndroid,
} from "react-native";
import { FlatList } from "react-navigation";
//
import Screen from "../Screen";
import Context from "../Context"; 
//

function Books(props) {
  const { theme, lang } = useContext(Context);
  const [DATA, setDATA] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [openBook, setOpenBook] = useState(null);
  //
  const fetchBooks = () => {
    setLoadingBooks(true);
    // AsyncStorage.removeItem("books")
    AsyncStorage.getItem("books")
      .then((e) => {
        const books = JSON.parse(e);
        if (books) {
          setLoadingBooks(false);
          setDATA(books);
        }
      })
      .catch((err) => console.log(err));
  };
  let mount = true;
  useEffect(() => {
    // AsyncStorage.removeItem("books")
    if (mount) {
      AsyncStorage.getItem("books")
        .then((e) => {
          const books = JSON.parse(e);
          if (books) {
            setDATA(books);
          }
        })
        .catch((err) => console.log(err));
    }
    return () => (mount = false);
  }, []);
  useEffect(() => {
    if (mount) {
      if (props.navigation.dangerouslyGetParent().state.routes[0].params) {
        ToastAndroid.showWithGravityAndOffset(
          "Opening " +
            props.navigation.dangerouslyGetParent().state.routes[0].params[0]
              .name +
            "...",
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          95
        );
      }
    }
    return () => (mount = false);
  }, [!!props.navigation.dangerouslyGetParent().state.routes[0].params]);

  function Item({ id, img,file }) {
    return (
      <TouchableNativeFeedback onPress={() => {setOpenBook(file)}}>
        <View style={[s.block, { borderColor: theme.item_border }]} key={id}>
          <ImageBackground
            source={{ uri: img }}
            style={{ width: 100 + "%", height: 100 + "%" }}
          ></ImageBackground>
        </View>
      </TouchableNativeFeedback>
    );
  }
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
  //

  if (openBook) {
    return (<View style={{justifyContent:'center',alignItems:'center'}}>
      <Text style={{marginBottom:50,fontSize:20}}>Open the book at: [{openBook}]</Text>
      <Button title='Go back' onPress={()=>setOpenBook(null)}/>
    </View>)
  } else {
    return (
      <Screen {...props}>
        <SafeAreaView>
          <Text style={[s.head, { color: theme.item_text }]}>
            {lang.books_head}
          </Text>
          <View style={s.getBooks}>
            <Button
              title={orReplacer(lang.books_button, DATA.length > 0)}
              color={theme.button}
              onPress={() => props.navigation.navigate(lang.menu_item_3)}
            />
          </View>
          <FlatList
            style={s.flatList}
            data={DATA}
            keyExtractor={(item, index) => index}
            numColumns={2}
            renderItem={({ item }) => <Item id={item.id} img={item.img} file={item.file}/>}
            columnWrapperStyle={s.col}
            ListEmptyComponent={() => (
              <Text style={[s.empty, { color: theme.item_text }]}>
                {lang.books_empty}
              </Text>
            )}
            onRefresh={fetchBooks}
            refreshing={loadingBooks}
          />
        </SafeAreaView>
      </Screen>
    );
  }
}

export default Books;

const s = StyleSheet.create({
  flatList: {
    // backgroundColor:'red',
    top: -50,
    paddingTop: 80,
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
    marginTop: 15,
  },
  getBooks: {
    position: "absolute",
    top: 15,
    right: "5%",
    zIndex: 100,
  },
  empty: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 100,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 5,
    padding: 10,
  },
});
