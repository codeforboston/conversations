import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Dimensions, Text  } from 'react-native';
import { createBottomTabNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import YouTube from 'react-native-youtube';
import { videos } from './config';
import ObjectChooser from './ObjectChooser';
import AboutPage from "./page/About.js";
import HomeScreen from "./HomeScreen.js";
import { Button } from "./component/Button.js";

const youtubeApiKey = process.env.YOUTUBE_API_KEY;

console.disableYellowBox = true;

class Player extends React.Component {
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

class tempCamera extends React.Component{
  render(){
    return(
      <Text> {this.props.navigation.getParam('videoId',"")} </Text>
    )
  }
}

class tempSettings extends React.Component{
  render(){
    return(
      <Text> Settings </Text>
    )
  }
}

export default createBottomTabNavigator({
  HomeScreen: {screen: HomeScreen,
    navigationOptions: {
      tabBarVisible: false,
      tabBarIcon: null,
    },
  },
  Chooser: {screen: ObjectChooser},
  tempCamera: { screen: tempCamera },
  tempSettings: { screen: tempSettings },
  About: { screen: AboutPage },
  Player: { screen: Player,
    navigationOptions: {
      tabBarVisible: false,
      tabBarIcon: null,
    }, },
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName, params  } = navigation.state;

      let finishedIcon;

      if (routeName == 'Chooser' ) {
        finishedIcon = require('./assets/TapHoldOff.png');
        if (focused) {
            finishedIcon = require('./assets/TapHoldOn.png')
        }
      }
      else if (routeName == 'tempCamera' ) {
        finishedIcon = require('./assets/SubmitVideoOff.png');
        if (focused) {
            finishedIcon = require('./assets/SubmitVideoOn.png')
        }
      }
      else if (routeName == 'tempSettings' ) {
        finishedIcon = require('./assets/SettingsOff.png');
        if (focused) {
            finishedIcon = require('./assets/SettingsOn.png')
        }
      }
      else if (routeName == 'About' ) {
        finishedIcon = require('./assets/AudioHelpOff.png');
        if (focused) {
            finishedIcon = require('./assets/AudioHelpOn.png')
        }
      } 
      return <Image source={finishedIcon} />;
    },
  }),
  tabBarOptions: {
    showLabel : false,
    style: {
      backgroundColor: 'blue', 
    }
  }, 
  animationEnabled: false,
}
);

