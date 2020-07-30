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
} from "react-native";
import Screen from "../Screen";
import Context, { lang } from "../Context";
//

function Books(props) {
  const {theme,lang} = React.useContext(Context);

  const DATA = [
    // { img: require("./../../assets/english.png") },
    // { img: require("./../../assets/math11.png") },
    // { img: require("./../../assets/math.png") },
    // { img: require("./../../assets/english.png") },
    // { img: require("./../../assets/math.png") },
    // { img: require("./../../assets/english.png") },
    // { img: require("./../../assets/english.png") },
    // { img: require("./../../assets/english.png") },
    // { img: require("./../../assets/math11.png") },
    // { img: require("./../../assets/english.png") },
  ];
  function Item({ title, img }) {
    return (
      <TouchableNativeFeedback onPress={()=>console.log('Opening Book ... ')}>
      <View style={[s.block,{borderColor:theme.item_border}]} key={title}>
        <ImageBackground
          source={img}
          style={{ width: 100 + "%", height: 100 + "%" }}
        >
          <Text>{title}</Text>
        </ImageBackground>
      </View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <Screen {...props}>
      <SafeAreaView>
        <Text style={[s.head,{color:theme.item_text}]}>{lang.books_head}</Text>
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index}
          numColumns={2}
          renderItem={({ item }) => <Item title={item.title} img={item.img} />}
          columnWrapperStyle={s.col}
          ListEmptyComponent={()=><Text style={[s.empty,{color:theme.item_text}]}>{lang.books_empty}</Text>}
        />
      </SafeAreaView>
    </Screen>
  );
}

export default Books;

const s = StyleSheet.create({
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
  empty:{
    fontSize:20,
    alignSelf:'center',
    marginTop:100,
    backgroundColor:'rgba(0,0,0,0.1)',
    borderRadius:5,
    padding:10
  },
});
