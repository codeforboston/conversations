import React, { Component } from 'react';

import {
    Alert,
    Dimensions,
    StatusBar
} from "react-native";


export function withDimensions(WrappedComponent) {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state =
                this._makeState(Dimensions.get("window"), Dimensions.get("screen"));
        }

        _makeState(window, screen) {
            return {
                window: { height: window.height - StatusBar.currentHeight,
                          width: window.width },
                screen
            };
        }

        componentDidMount() {
            Dimensions.addEventListener("change", this.onDimensionsChanged);
        }

        componentWillUnmount() {
            Dimensions.removeEventListener("change", this.onDimensionsChanged);
        }

        onDimensionsChanged = ({window, screen}) => {
            this.setState(this._makeState(window, screen));
        }

        render() {
            return (
                <WrappedComponent screenDimensions={this.state.screen}
                                  windowDimensions={this.state.window}
                                  {...this.props} />
            );
        }
    };
}
