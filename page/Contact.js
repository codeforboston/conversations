import React, { Component } from "react";
import {
    FlatList,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
    CheckBox,
    AsyncStorage
} from "react-native";

import firebase from "react-native-firebase";

import { Button } from "../component/Button.js";
import { H2, P, Strong, ErrorBox } from "./styles.js";

const CONTACT_FORM = "contact_form";
const SUCCESS = "success";


export default class ContactPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            state: CONTACT_FORM,
            error: "",
            success: "",
            saving: false,
            userName: '',
            email: '',
            message: ''
        }
        this.ref = firebase.firestore().collection('messages');
    }

    saveMsg = () => {
        this.setState({saving: true});
        this.ref.add({
            userName: this.state.userName,
            email: this.state.email,
            message: this.state.message,
            createdAt: new Date(),
            complete: false,
        }).then(doc => {
            this.setState({
                saving: false,
                state: SUCCESS,
                userName: '',
                email: '',
                message: ''
            });
        }, error => {
            this.setState({error: error, saving: false})
        });
    }

    buttonDisabled() {
        let {userName, message, saving} = this.state;

        return saving || !(userName && message);
    }

    renderSuccess() {
        return (
            <View styles={styles.container}>
                <H2>Contact Creators</H2>
                <P>
                    Thank you for your feedback.
                </P>
                <Button onPress={() => this.setState({ state: CONTACT_FORM})}>
                    Leave More
                </Button>
            </View>
        );
    }

    renderForm() {
        let {userName, email, message, error} = this.state;

        return (
            <View style={styles.container}>
                <H2>Contact Creators</H2>
                <P>Send message to creators</P>
                {error ? (<ErrorBox>{error}</ErrorBox>) : null}
                <TextInput
                    style={styles.textContainer}
                    placeholder={'Type your name here'}
                    value={userName}
                    onChangeText={(userName) => this.setState({userName})}
                />
                <TextInput
                    style={styles.textContainer}
                    placeholder={'Type your email here (Optional)'}
                    value={email}
                    onChangeText={(email) => this.setState({email})}
                />
                <TextInput
                    style={[styles.textContainer, styles.textarea]}
                    underlineColorAndroid="transparent"
                    multiline={true}
                    numberOfLines={4}
                    placeholder={'Type your message here'}
                    value={message}
                    onChangeText={(message) => this.setState({message})}
                />
                <Button onPress={this.saveMsg} disabled={this.buttonDisabled()}>
                    Send message
                </Button>
            </View>
        );
    }

    render() {
        switch (this.state.state) {
            case SUCCESS:
                return this.renderSuccess();

            default:
                return this.renderForm();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textContainer : {
        borderColor: "#aaa",
        borderWidth: 1,
        padding: 5,
        margin: 5,
        width: 250,
        height: 40
    },
    textarea: {
        height: 80,
        textAlignVertical: "top"
    }
});

ContactPage.navConfig = {
    screen: ContactPage,

    navigationOptions: ({navigation}) => ({
        headerTitle: "Contact Creators"
    })
}
