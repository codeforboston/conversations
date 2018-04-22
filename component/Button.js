import React, { Component } from "react";
import {
    Animated,
    Easing,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";


function makePressHandler({navigation, route, navParams, onPress}) {
    if (navigation && route)
        return (...args) => {
            navigation.navigate(route, navParams);
            if (onPress) onPress(...args);
        }

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
        this.state = {
            active: false,
            scale: new Animated.Value(1)
        };
    }

    renderContents = () => {
        let {activeImage, image, imageStyle, children, textStyles, activeTextStyles, style} = this.props,
            {active, scale} = this.state,
            transform = [{scale: scale}];

        if (image) {
            return [
                (<Animated.Image
                    resizeMode={this.props.resizeMode}
                    source={active && activeImage ? activeImage : image}
                    style={[{transform}, styles.buttonIcon, imageStyle]}
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

    makePressHandler() {
        let {pressAnimation} = this.props,
            handler = makePressHandler(this.props);

        if (pressAnimation === "spring") {
            // Run the animation before running the handler
            return ((...args) => {
                let {scale} = this.state;

                Animated.sequence([
                    Animated.timing(scale, {toValue: 0.7, duration: 100, easing: Easing.linear()}),
                    Animated.timing(scale, {toValue: 1.2, duration: 200, easing: Easing.linear()}),
                    Animated.timing(scale, {toValue: 1, duration: 100, easing: Easing.linear()})
                ]).start(() => handler(...args));
            })
        } else {
            // Run right away:
            return handler;
        }
    }

    render() {
        let {activeOpacity, disabled, style, onPress, ...props} = this.props,
            {active} = this.state;

        return (
            <TouchableOpacity
                activeOpacity={activeOpacity}
                disabled={disabled}
                onPressIn={() => this.setState({ active: true })}
                onPressOut={() => this.setState({ active: false })}
                onPress={this.makePressHandler()}
                style={style}
                {...props}
            >
                {this.renderContents()}
            </TouchableOpacity>
        );
    }
}

Button.defaultProps = {
    activeOpacity: 0.5,
    disabled: false,
    navParams: {}
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
