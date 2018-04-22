import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TouchableHighlight
} from "react-native";


function makePressHandler({navigation, route, navParams, onPress}) {
    if (navigation && route)
        return () => navigation.navigate(route, navParams);

    return onPress;
}

const TextButton = ({navigation, route, navParams, onPress, children, style, ...props}) => (
    <TouchableHighlight onPress={makePressHandler({navigation, route, navParams, onPress})}
                        underlayColor="rgba(255, 255, 255, 0.5)">
        <Text style={[styles.button, style]} {...props}>
            {children}
        </Text>
    </TouchableHighlight>
);

export default TextButton;


const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        padding: 10
    }
});
