import React from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Image,
  ImageBackground,
  SafeAreaView,
  TouchableNativeFeedback,
  AsyncStorage,
  Button,
} from "react-native";
import Screen from "../Screen";
import Context from "../Context";
//

function Books(props) {
  const { theme, lang } = React.useContext(Context);
  const [DATA, setDATA] = React.useState([]);
  const [loadingBooks, setLoadingBooks] = React.useState(false);
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
  React.useEffect(()=>{
    // AsyncStorage.removeItem("books")
    AsyncStorage.getItem("books")
      .then((e) => {
        const books = JSON.parse(e);
        if (books) {
          setDATA(books);
        }
      })
      .catch((err) => console.log(err));
  },[])
  function Item({ id, img }) {
    return (
      <TouchableNativeFeedback onPress={() => console.log("Opening Book ... ")}>
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
  return (
    <Screen {...props}>
      <SafeAreaView>
        <Text style={[s.head, { color: theme.item_text }]}>
          {lang.books_head}
        </Text>
        <View style={s.getBooks}>
        <Button title={orReplacer(lang.books_button,(DATA.length > 0))} color={theme.button} onPress={()=>props.navigation.navigate(lang.menu_item_3)}/>
        </View>
        <FlatList
          style={s.flatList}
          data={DATA}
          keyExtractor={(item, index) => index}
          numColumns={2}
          renderItem={({ item }) => <Item id={item.id} img={item.img} />}
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

export default Books;

const s = StyleSheet.create({
  flatList:{
    // backgroundColor:'red',
    top:-50,
    paddingTop:80
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
      position:"absolute",
      top: 15,
      right: "5%",
      zIndex:100
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
