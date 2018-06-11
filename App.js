import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Dimensions, Text  } from 'react-native';
import { createBottomTabNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import YouTube from 'react-native-youtube';
import ObjectChooser from './ObjectChooser';
import AboutPage from "./page/About.js";
import HomeScreen from "./HomeScreen.js";
import { Button } from "./component/Button.js";
import HelpPage from "./page/Help.js";

// const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeApiKey = "AIzaSyBVwmuzixD7KGYsuP_2840WcXNFk1SnrUU";

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
          style={{ width: 0, height: 0 }}
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

const TabIcons = {
    Help: require('./assets/help/help-24px_default.png')
};

const SelectedTabIcons = {
    Help: require('./assets/help/help-24px_selected.png')
};

export default createBottomTabNavigator({
  HomeScreen: {screen: HomeScreen,
    navigationOptions: {
      tabBarVisible: false,
      tabBarIcon: null,
    },
  },
  Chooser: {screen: ObjectChooser},
  tempCamera: { screen: tempCamera },
  Player: { screen: Player,
    navigationOptions: {
      tabBarVisible: false,
      tabBarIcon: null,
    }, },
  tempSettings: { screen: tempSettings },
    About: AboutPage.navConfig,
    Help: HelpPage.navConfig
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName, params  } = navigation.state;

      let finishedIcon;

      if (routeName == 'Chooser' ) {
        finishedIcon = require('./assets/help/tap_and_hold-24px_default.png');
        if (focused) {
            finishedIcon = require('./assets/help/tap_and_hold-24px_selected.png')
        }
      }
      else if (routeName == 'tempCamera' ) {
        finishedIcon = require('./assets/help/submit_video-24px_default.png');
        if (focused) {
            finishedIcon = require('./assets/help/submit_video-24px_selected.png')
        }
      }
      else if (routeName == 'tempSettings' ) {
        finishedIcon = require('./assets/help/settings-24px_default.png');
        if (focused) {
            finishedIcon = require('./assets/help/settings-24px_selected.png')
        }
      }
      else if (routeName == 'About' ) {
        finishedIcon = require('./assets/help/audio_help-24px_default.png');
        if (focused) {
            finishedIcon = require('./assets/help/audio_help-24px_selected.png')
        }
      } else {
          finishedIcon = (focused ? SelectedTabIcons : TabIcons)[routeName];
      }

      if (navigation.state.params) {
        console.log(params);
        finishedIcon = require('./assets/help/tap_and_hold-24px_default.png');
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
  animationEnabled: true,
}
);
