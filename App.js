import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';
import YouTube from 'react-native-youtube';
import { videos } from './config';
import ObjectChooser from './ObjectChooser';
import HomeScreen from './HomeScreen';

import AboutPage from "./page/About.js";

import {Button} from "./component/Button.js";

const youtubeApiKey = process.env.YOUTUBE_API_KEY;
console.disableYellowBox = true;

class Player extends React.Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <YouTube
          apiKey={youtubeApiKey}
          videoId={navigation.state.params.videoId}
          play={true}
          fullscreen={true}
          showFullscreenButton={false}
          onChangeFullscreen={e => e.isFullscreen || navigation.goBack()}
          style={{ width: 0, height: 0 }}
        />
      </View>
    );
  }
}

export default StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Player: { screen: Player },
  About: AboutPage.navConfig
}, {
    headerMode: "none"
});

const styles = StyleSheet.create({
    iconButtonStyle: {
        padding: 15
    },

    iconImageStyle: {
        width: 100,
        height: 100
    },

    pageContainer: {
        flex: 1,
        flexDirection: "column"
    },

    buttonContainer: {
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between"
    },
});
