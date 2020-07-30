import React,{Component} from "react";
import { Text, Image,View } from "react-native";
import { Container, Content } from "native-base";
import Header from "./Header";
//context
import languageContext from "./Language/languageContext";
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
      
    <Container style={{backgroundColor: "rgb(237,237,240)"}}>
        <Header {...this.props} />
        <Content>{this.props.children}</Content>
      </Container>
    );
  }
}

export default Screen;
