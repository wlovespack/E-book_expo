import React, { Component } from "react";
import { Text, Image, View, Modal, SafeAreaView, Switch } from "react-native";
import { Container, Content, Header, Icon, Left, Body, Right, Button, } from "native-base";
import PDFReader from 'rn-pdf-reader-js'
import { Asset } from "expo-asset";

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
        let absolute_path = Asset.fromModule(require('../assets/docs/Amharic-G11.pdf')).uri
        return (
            <Container>
                <Header style={{ backgroundColor: "#fff" }}>
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
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    marginTop: 25,
                }} >
                    <PDFReader
                        source={{
                            uri: absolute_path,
                        }}
                    />
                </Content>
            </Container>
        );
    }
}

export default HomeScreen;