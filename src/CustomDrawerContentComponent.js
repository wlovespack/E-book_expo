import React, { useContext } from "react";
import { Container, Content, Header, Body } from "native-base";
import { Text, Image } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";
 
import Context from "./Context";
//
function CustomDrawerContentComponent(props) {
  const { lang,theme } = useContext(Context);
  return (
    <Container>
      <Header
        style={{
          height: 200,
          backgroundColor: theme.bg,
        }}
      >
        <Body>
          <Image
            style={{
              height: 150,
              width: 150,
              borderRadius: 75,
              left: 50,
            }}
            source={require("./../assets/Logo.png")}
          />
        </Body>
      </Header>
      <Content style={{backgroundColor:theme.drawer,color:theme.item_text}}>
        <DrawerItems
          {...props}
          activeTintColor={theme.activeTint}
          inactiveTintColor={theme.inactiveTint}
          activeBackgroundColor={theme.drawer_highlight}
          renderIcon={({ index }) => {
            let icon;
            switch (index) {
              case 0:
                icon = <Ionicons name="md-home" size={30} color={theme.inactiveTint}/>;
                break;
              case 1:
                icon = <Ionicons name="md-bookmarks" size={30} color={theme.inactiveTint}/>;
                break;
              case 2:
                icon = <Ionicons name="md-cart" size={30} color={theme.inactiveTint}/>;
                break;
              case 3:
                icon = <Ionicons name="md-settings" size={30} color={theme.inactiveTint}/>;
                break;
              case 4:
                icon = <Ionicons name="md-information-circle" size={30} color={theme.inactiveTint}/>;
                break;
              case 5:
                icon = <Ionicons name="md-share" size={30} color={theme.inactiveTint}/>;
                break;
              default:
                icon = <Ionicons name="md-close" size={30} color={theme.inactiveTint}/>;
                break;
            }
            return icon;
          }}
        />
      </Content>
      <Text
        style={{ padding:5,paddingBottom:30,color: theme.item_fadedText, fontSize: 16,backgroundColor:theme.drawer }}
      >
        {lang.dev_by}
      </Text>
    </Container>
  );
}

export default CustomDrawerContentComponent;
