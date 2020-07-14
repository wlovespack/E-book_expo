import React, { useContext } from "react";
import { Container, Content, Header, Body } from "native-base";
import { Text, Image } from "react-native";
import { DrawerItems } from "react-navigation-drawer";
import { Ionicons } from "@expo/vector-icons";

import languageContext from "./Language/languageContext";
//
function CustomDrawerContentComponent(props) {
  const { lang } = useContext(languageContext);
  return (
    <Container>
      <Header
        style={{
          height: 200,
          backgroundColor: "white",
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
            source={require("./../assets/Logo.jpg")}
          />
        </Body>
      </Header>
      <Content>
        <DrawerItems
          {...props}
          renderIcon={({ index }) => {
            let icon;
            switch (index) {
              case 0:
                icon = <Ionicons name="md-home" size={30} />;
                break;
              case 1:
                icon = <Ionicons name="md-bookmarks" size={30} />;
                break;
              case 2:
                icon = <Ionicons name="md-cart" size={30} />;
                break;
              case 3:
                icon = <Ionicons name="md-settings" size={30} />;
                break;
              case 4:
                icon = <Ionicons name="md-information-circle" size={30} />;
                break;
              case 5:
                icon = <Ionicons name="md-share" size={30} />;
                break;
              default:
                icon = <Ionicons name="md-close" size={30} />;
                break;

            }
            return icon;
          }}
        />
      </Content>
      <Text
        style={{ bottom: 15, left: 8, color: "rgb(75,75,75)", fontSize: 16 }}
      >
        {lang.dev_by}
      </Text>
    </Container>
  );
}

export default CustomDrawerContentComponent;
