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
        let {activeImage, disabled, image, imageStyle, children,
             textStyles, activeTextStyles, style} = this.props,
            {scale} = this.state,
            transform = [{scale: scale}],
            active = !disabled && this.state.active;

        if (image) {
            return [
                (<Animated.Image
                    resizeMode={this.props.resizeMode}
                    source={active && activeImage ? activeImage : image}
                    style={[{transform}, styles.buttonIcon, disabled && styles.disabledButton,
                            imageStyle]}
                    key="image"/>),
                children && (<Text key="text" style={styles.iconButtonText}>
                    {children}
                </Text>)
            ];
        }

        return (
            <Text style={[style, styles.button, textStyles, active && activeTextStyles,
                          disabled && styles.disabledButton]}>
                {children}
            </Text>
        );
    }

    _queue = []

    _queueAnimation = (...animations) => {
        this._queue.push(...animations);
        if (!this._animation) {
            this._nextAnimation();
        }
    }

    _clearQueue = (_) => {
        if (this._animation)
            this._animation.stopAnimation();
        this._queue = [];
    }

    _nextAnimation = () => {
        if (this._queue && this._queue.length) {
            var next = this._queue.shift();

            if (typeof next === "function") {
                next();
                this._nextAnimation();
            } else {
                this._animation = next;
                next.start(this._nextAnimation);
            }
        } else {
            this._animation = null;
        }
    }

    onPressIn = (e) => {
        let {pressAnimation} = this.props;

        if (pressAnimation === "spring") {
            this._queueAnimation(
                Animated.timing(this.state.scale, {toValue: 0.7,
                                                   duration: 75,
                                                   easing: Easing.linear()}));
        }
    }

    onPressOut = (e) => {
        let {scale} = this.state;
        let {pressAnimation} = this.props;

        if (pressAnimation === "spring") {
            this._queueAnimation(
                Animated.sequence([
                    Animated.timing(scale, {toValue: 1.2, duration: 200, easing: Easing.linear()}),
                    Animated.timing(scale, {toValue: 1, duration: 100, easing: Easing.linear()})
                ]));
        }
    }

    onPress = (...args) => {
        let handler = makePressHandler(this.props);

        this._queueAnimation(() => handler(...args));
    }

    render() {
        let {activeOpacity, disabled, style, onPress, ...props} = this.props,
            {active} = this.state;

        return (
            <TouchableOpacity
                activeOpacity={activeOpacity}
                disabled={disabled}
                onPressIn={this.onPressIn}
                onPressOut={this.onPressOut}
                onPress={this.onPress}
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
        borderRadius: 5,
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

    disabledButton: {
        opacity: 0.5
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
