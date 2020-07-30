import React from "react";
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  FlatList,
  TouchableNativeFeedback,
  ImageBackground,
  TextInput,
  Button,
} from "react-native";
import Screen from "../Screen";
import Context from "../Context";
// import {searchHub} from "./../SearchHub";
//

function Store(props) {
  const { theme, lang } = React.useContext(Context);
  const [text, setText] = React.useState("");
  // const [DATA,setDATA]= React.useState([]);
  const DATA = [
    { img: require("./../../assets/english.png"),size:2.1 },
    { img: require("./../../assets/math11.png"),size:6.5 },
    { img: require("./../../assets/math.png"),size:4.3 },
    { img: require("./../../assets/english.png"),size:4.3 },
    { img: require("./../../assets/math.png"),size:3.23 },
    { img: require("./../../assets/english.png"),size:5.2 },
    { img: require("./../../assets/english.png"),size:1 },
    { img: require("./../../assets/english.png"),size:2 },
    { img: require("./../../assets/math11.png"),size:3 },
    { img: require("./../../assets/english.png"),size:5 },
  ];
  // const search = (v) => {
  //   // searchHub(v).then(e=>e?setDATA(e):'');
  // }
  function Item({ img,size }) {
    const [hide,setHide] = React.useState(false);
    const [downloading,setDownloading] = React.useState(false);

    const changeHide = (v)=>{
      setHide(v);
      setTimeout(()=>setHide(false),4000);
    }
    return (
      <TouchableNativeFeedback onPress={() => changeHide(true)}>
        <View style={[s.block, { borderColor: theme.item_border }]}>
          <ImageBackground
            source={img}
            style={{ width: 100 + "%", height: 100 + "%" }}
          >
          {downloading?
          <View style={s.bottom}>
            <Text style={s.mb}>1.2 / 3 Mb</Text>
            <Text style={s.percent}>{Math.round(Math.random() * 100)}%</Text>
            <View style={s.progCon}>
              <View style={[s.prog,{width:Math.random() * 100 + '%'}]}/>
            </View>
          </View>
          :<View/>}
          {!hide && !downloading?
          <View style={s.bottom}>
            <Text style={s.size}>{size} Mb</Text>
            <Button style={s.download} title={lang.store_download} color={theme.button} onPress={()=>setDownloading(true)}/>
          </View>
          :<View/>}
          </ImageBackground>
        </View>
      </TouchableNativeFeedback>
    );
  }
  return (
    <Screen {...props}>
      <SafeAreaView>
        <TextInput
          onChangeText={(e) => setText(e)}
          value={text}
          style={[s.input,{borderColor:theme.input_border,color:theme.item_text,backgroundColor:theme.input_bg}]}
          placeholder={lang.store_search}
          selectTextOnFocus={true}
          // onSubmitEditing={e=>search(e.nativeEvent.text)}
        />
        <FlatList
          data={DATA}
          keyExtractor={(item, index) => index}
          numColumns={2}
          renderItem={({ item }) => <Item img={item.img} size={item.size}/>}
          columnWrapperStyle={s.col}
          ListEmptyComponent={()=><Text style={[s.empty,{color:theme.item_text}]}>{lang.store_empty}</Text>}
          ListHeaderComponent={()=>{
            return DATA[0]?<Text style={[s.result,{color:theme.item_text}]}>{DATA.length} results for "{text}"</Text>:<Text></Text>
          }
          }
        />
 
      </SafeAreaView>
    </Screen>
  );
}

export default Store;

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
  input: {
    height: 45,
    width: 90 + "%",
    left: 5 + "%",
    marginTop: 30,
    marginBottom: 10,
    borderWidth: 2,
    borderRadius: 30,
    paddingLeft: 20,
    fontSize: 20,
  },
  empty:{
    fontSize:20,
    alignSelf:'center',
    marginTop:100,
    backgroundColor:'rgba(0,0,0,0.1)',
    borderRadius:5,
    padding:10
  },
  result:{
    fontSize:20,
    alignSelf:'center'
  },
  bottom:{
    backgroundColor:'rgba(0,0,0,0.8)',
    position:'absolute',
    bottom:0,
    width:100 + '%',
  },
  size:{
    alignSelf:'center',
    fontSize:20,
    color:'#fff',
    marginVertical:5
  },
  progCon:{
    position:"absolute",
    bottom:0,
    width:100 +'%',
    height:8,
    borderTopWidth:0.4,
    borderColor:'rgb(30,136,229)'
  },
  prog:{
    height:100 +'%',
    backgroundColor:'rgb(30,136,229)'
  },
  mb: {
    fontSize:16,
    color:'#fff',
    top:10,
    marginLeft:5
  },
  percent: {
    fontSize:16,
    color:'#fff',
    textAlign:'right',
    marginBottom:20,
    marginTop:-14,
    marginRight:5
  }
  

});
