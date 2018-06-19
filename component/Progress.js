import React, { Component } from "react";

import {
    StyleSheet,
    Text,
    View
} from "react-native";


export default class Progress extends Component {
    render() {
        let {current, total, text, style, progressStyle, textStyle, ...props} = this.props,
            percent = total === 0 ? 0 : current/total*100;


        return (
            <View style={[styles.progressBar, style]} {...props}>
                <View style={[{backgroundColor: "steelblue", width: `${percent}%`, height: "100%"}, progressStyle]} />
                <Text style={[styles.textStyle, textStyle]}>{text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    progressBar: {
        height: 20,
        marginLeft: 15,
        marginRight: 15,
        borderColor: "black",
        borderWidth: 1
    },
    textStyle: {
        color: "white",
        textShadowColor: "#aaa",
        textAlign: "center",
        position: "absolute",
        width: "100%",
        height: "100%"
    }
});
