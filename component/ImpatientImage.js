import React, {
    Component,
    Fragment,
} from "react";
import {
    Animated,
    Easing,
} from "react-native";


export default class ImpatientImage extends Component {
    state = {
        scale: new Animated.Value(1)
    }

    componentDidMount() {
        this.startAnimating();
    }

    startAnimating() {
        const {scale} = this.state,
              {loopSpeed} = this.props;

        if (!this._animation)
            this._animation = Animated.loop(
                Animated.sequence([
                    Animated.timing(scale, {toValue: 1.2, duration: loopSpeed/4, easing: Easing.out(Easing.ease)}),
                    Animated.timing(scale, {toValue: 0.8, duration: loopSpeed/2}),
                    Animated.timing(scale, {toValue: 1, duration: loopSpeed/4, easing: Easing.in(Easing.ease)}),
                ])
            );
        this._animation.start();
    }

    render() {
        const {style, ...props} = this.props,
              {scale} = this.state;

        return (
            <Fragment>
                <Animated.Image style={[{transform: [{scale}]}, style]} {...props} />
            </Fragment>
        );
    }
}

ImpatientImage.defaultProps = {
    loopSpeed: 3200
};
