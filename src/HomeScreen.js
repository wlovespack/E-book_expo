import React, { Component } from "react";
import { Text, Image } from "react-native";
import { Container, Content, Header, Icon, Left, Body, Right, Button, } from "native-base";

class HomeScreen extends Component {
    static navigationOptions = {
        drawerIcon: (
            <Image
                source={require('../assets/home.png')}
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
                        Hello from  HomeScreen
                    </Text>
                </Content>
            </Container>
        );
    }
}

export default HomeScreen;