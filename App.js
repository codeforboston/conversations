import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';
import YouTube from 'react-native-youtube';
import { videos } from './config';
import ObjectChooser from './ObjectChooser';
import HomeScreen from './HomeScreen';
import RemnantChooser from './RemnantChooser';
import RemnantDisplay from './Remnant';
import AboutPage from "./page/About.js";
import { Sound } from 'react-native-sound';


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
  Home: { screen: HomeScreen },
  Chooser: { screen: ObjectChooser },
  Player: { screen: Player },
  RemnantChooser: {  screen: RemnantChooser },
  RemnantDisplay: { screen: RemnantDisplay },
  About: AboutPage.navConfig,
}, {
  headerMode: 'none',
}, 
);
