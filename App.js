import React, { Component } from "react";
import HomeScreen from "./src/HomeScreen";
import Grade11Screen from "./src/Grade11Screen";
import { createDrawerNavigator, DrawerItems } from "react-navigation-drawer";
import { createAppContainer } from "react-navigation";
import { Container, Content, Header, Body } from 'native-base'
import { View, Image } from "react-native";
import HelpScreen from "./src/HelpScreen";
import SettingScreen from "./src/SettingScreen";
import ContactScreen from "./src/ContactScreen";
import ShareScreen from "./src/ShareScreen";

class App extends Component {
  render() {
    const style = {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }

    return (

      <View style={style} >
        <MyApp />
      </View>

    )
  }
}
const CustomDrawerContentComponent = (props) => (

  <Container>
    <Header style={{
      height: 200,
      backgroundColor: 'white'
    }}>
      <Body>
        <Image
          style={{
            height: 150,
            width: 150,
            borderRadius: 75,
            left: 50
          }}
          source={require('./assets/Logo.jpg')} />
      </Body>
    </Header>
    <Content>
      <DrawerItems {...props} />
    </Content>

  </Container>

);


const MyApp = createDrawerNavigator({
  Home: {
    screen: HomeScreen

  },
  " Change To Grade 11": {
    screen: Grade11Screen
  },
  ' Help & Support': {
    screen: HelpScreen
  },
  Setting: {
    screen: SettingScreen
  },
  contact: {
    screen: ContactScreen
  },
  Share: {
    screen: ShareScreen
  }


},
  {
    initialRouteName: 'Home',
    drawerPosition: 'left',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle'


  });

const Nav = createAppContainer(MyApp);
export default Nav;


