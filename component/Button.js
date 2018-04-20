import React, { Component } from "react";
import {
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";


function makePressHandler({navigation, route, navParams, onPress}) {
    if (navigation && route)
        return () => navigation.navigate(route, navParams);

    return onPress;
}

export const TextButton = ({navigation, route, navParams, onPress, children, style, ...props}) => (
    <TouchableHighlight onPress={makePressHandler({navigation, route, navParams, onPress})}
                        underlayColor="rgba(255, 255, 255, 0.5)">
        <Text style={[styles.textButton, style]} {...props}>
            {children}
        </Text>
    </TouchableHighlight>
);

export class Button extends Component {
    constructor(props) {
        super(props);
        this.state = { active: false };
    }

    renderContents = () => {
        let {activeImage, image, imageStyle, children, textStyles, activeTextStyles, style} = this.props,
            {active} = this.state;

        if (image) {
            return [
                (<Image source={active && activeImage ? activeImage : image}
                        style={[styles.buttonIcon, imageStyle]}
                        key="image"/>),
                children && (<Text key="text" style={styles.iconButtonText}>
                    {children}
                </Text>)
            ];
        }

        return (
            <Text style={[style, styles.button, textStyles, active && activeTextStyles]}>
                {children}
            </Text>
        );
    }

    render() {
        let {activeOpacity, style, ...props} = this.props,
            {active} = this.state;

        return (
            <TouchableOpacity
                activeOpacity={activeOpacity}
                onPressIn={() => this.setState({ active: true })}
                onPressOut={() => this.setState({ active: false })}
                onPress={makePressHandler(props)}
                style={style}
                {...props}
            >
                {this.renderContents()}
            </TouchableOpacity>
        );
    }
}

Button.defaultProps = {
    activeOpacity: 0.5
};


const styles = StyleSheet.create({
    textButton: {
        alignItems: "center",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        padding: 10,
    },

    button: {
        /* flex: 0, */
        alignItems: "stretch",
        justifyContent: "center",
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20
    },

    buttonIcon: {
        resizeMode: "cover"
    },

    iconButtonText: {
        /* flex: 1,
         * position: "absolute",
         * top: 0,
         * left: 0,
         * alignSelf: "center" */
        color: "red",
        textAlign: "center"
    }
});
