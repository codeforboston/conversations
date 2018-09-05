import React, { Component } from "react";
import {
    Animated,
    Easing,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";


function debounceFn(fn, period) {
    var lastCalled;
    return (...args) => {
        if (!lastCalled || new Date().getTime() - lastCalled >= period) {
            lastCalled = new Date().getTime();
            return fn(...args);
        }
    }
}

function makePressHandler({navigation, route, navParams, onPress}) {
    if (navigation && route) {
        return (...args) => {
            navigation.navigate(route, navParams);
            if (onPress) onPress(...args);
        }
    }

    return onPress;
}

export class Button extends Component {
    constructor(props) {
        super(props);

        let handler = makePressHandler(this.props);
        this.state = {
            active: false,
            scale: new Animated.Value(1),
            pressHandler: props.debounce ? debounceFn(handler, props.debounce) : handler
        };
    }

    renderContents = () => {
        let {activeImage, disabled, image, imageStyle, children,
             buttonStyle, activeTextStyles, style} = this.props,
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
            <Text style={[styles.button, buttonStyle, active && activeTextStyles,
                          disabled && styles.disabledButton]}>
                {children}
            </Text>
        );
    }

    _queue = []
    _blockQueue = false

    _queueAnimation = (animation, block=false) => {
        if (!this._blockQueue) {
            this._queue.push(animation);

            if (block) {
                this._blockQueue = true;
                this._queue.push(() => this._blockQueue = false);
            }

            if (!this._animation) {
                this._nextAnimation();
            }
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
        let {pressAnimation} = this.props,
            {pressHandler} = this.state;

        this._queueAnimation(() => pressHandler(...args), true);
    }

    render() {
        let {activeOpacity, debounce, disabled, style, onPress, ...props} = this.props;

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
    debounce: 500,
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
