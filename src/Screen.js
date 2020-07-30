import React,{Component} from "react";
import { Text, Image,View } from "react-native";
import { Container, Content } from "native-base";
import Header from "./Header";
import Contain from "./Contain";
//
class Screen extends Component {
  static navigationOptions = {
    drawerIcon: (
      <Image
        source={require("../assets/home.png")}
        style={{
          width: 24,
          height: 24,
        }}
      />
    ),
  };

  render() {
    return (
      <Contain>
        <Header {...this.props} />
        <Content style={{display:'flex'}}>
        <View style={{marginBottom:100}}>
        {this.props.children}
        </View>
        </Content>
      </Contain>
    );
  }
}

export default Screen;
