import React, { Component } from "react";
import {
    StyleSheet,
    TextInput,
    View
} from "react-native";

import firebase from "react-native-firebase";

import { Button } from "../component/Button.js";
import { H2, P, Strong } from "./styles.js";

export default class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: '',
            email: '',
            message: ''
        }
        this.ref = firebase.firestore().collection('messages');
    }

    saveMsg = () => {
        this.ref.add({
            userName: this.state.userName,
            email: this.state.email,
            message: this.state.message,
            createdAt: new Date(),
            complete: false,
        });
        this.setState({
            userName: '',
            email: '',
            message: ''
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <H2>Contact Creators</H2>
                <P>Send message to creators</P>
                <TextInput
                    style={styles.textContainer}
                    placeholder={'Type your name here'}
                    value={this.state.userName}
                    onChangeText={(userName) => this.setState({userName})}
                />
                <TextInput
                    style={styles.textContainer}
                    placeholder={'Type your email here (Optional)'}
                    value={this.state.email}
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    style={styles.textContainer}
                    multiline={true}
                    numberOfLines={4}
                    placeholder={'Type your message here'}
                    value={this.state.message}
                    onChangeText={(message) => this.setState({message})}
                />
                <Button onPress={this.saveMsg}>
                    Send message
                </Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer : {
        width: 250,
        height: 40
    }
});

ContactPage.navConfig = {
    screen: ContactPage,

    navigationOptions: ({navigation}) => ({
        headerTitle: "Contact Creators"
    })
}