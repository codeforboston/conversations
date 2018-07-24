import React, { Component } from "react";
import {
    StyleSheet,
    Text,
    TouchableHighlight
} from "react-native";


export class Player extends React.Component {
    render() {
      const navigation = this.props.navigation;
      return (
        <View>
          <YouTube
            apiKey={youtubeApiKey}
            videoId={this.props.navigation.getParam('videoId','')}
            play={true}
            fullscreen={true}
            showFullscreenButton={false}
            onChangeFullscreen={e => e.isFullscreen || navigation.goBack()}
          />
        </View>
      );
    }
  }
  
export default Player;