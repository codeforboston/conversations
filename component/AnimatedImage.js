import React, { Component } from "react";
import { Image } from "react-native";


export default class AnimatedImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            frameNumber: 0
        };
    }

    componentDidUpdate(prevProps, _prevState, _snapshot) {
        if (this.props.playing !== prevProps.playing) {
            if (this.props.playing)
                this.startAnimation();
            else
                this.stopAnimation();
        }
    }

    _advanceFrame = () => {
        this.setState({
            frameNumber: (this.state.frameNumber+1) % this.props.frames.length
        });
    }

    startAnimation() {
        clearInterval(this._interval);
        this._interval = setInterval(this._advanceFrame,
                                     this.props.interval);
        if (this.props.startFrame)
            this.setState({ frameNumber: this.props.startFrame });
    }

    stopAnimation() {
        clearInterval(this._interval);
        delete this._interval;
    }

    render() {
        let {playing, source, frames, ...props} = this.props,
            currentSource = (!playing && source) ||
                            frames[this.state.frameNumber];
        return (
            <Image source={currentSource} {...props}/>
        );
    }
}

AnimatedImage.defaultProps = {
    playing: false,
    frames: [],
    interval: 500
};