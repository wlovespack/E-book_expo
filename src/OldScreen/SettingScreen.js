import React, { Component } from "react";
import { Text, View, Image } from "react-native";
import { Container, Content, Header, Icon, Left, Body, Right, Button, } from "native-base";


export default class SettingScreen extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image
                source={require('../assets/settings.png')}
                style={{
                    width: 24,
                    height: 24
                }}
            />
        )
    }
    render() {

        return (
            <Container>
                <Header  style={{ backgroundColor: "#fff" }}>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' style={{ color: '#000000' }} onPress={() => this.props.navigation.openDrawer()} />
                        </Button>
                    </Left>
                    <Body>
                        <Text style={{ fontSize: 20, color: '#000000', left: 80 }} >E-Book</Text>
                    </Body>
                    <Right />
                </Header>
                <Content contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }} >
                    <Text>
                        Hello from  SettingScreen
                </Text>
                </Content>
            </Container>

        );
    }
}

