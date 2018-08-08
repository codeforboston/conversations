import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Dimensions, Text  } from 'react-native';
import { createBottomTabNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import YouTube from 'react-native-youtube';
import ObjectChooser from './ObjectChooser';
import AboutPage from "./page/About.js";
import HomeScreen from "./HomeScreen.js";
import { Button } from "./component/Button.js";
import HelpPage from "./page/Help.js";
import pageStyles from "./page/styles.js";


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
        />
      </View>
    );
  }
}

class tempCamera extends React.Component{
  static navigationOptions = ({screenProps}) =>({
    tabBarOnPress: (scene, jumpToIndex) => {
      console.log(screenProps.previousTabScreen);
    }
});
};

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


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {previousTabScreen: 'ObjectChooserXXX'};
  }

  getCurrentRouteName = navigationState => {
    if (!navigationState) {
      return null;
    }
    const route = navigationState.routes[navigationState.index];

    if (route.routes) {
      return getActiveRouteName(route);
    }
    return route.routeName;
  }

  render(){
      return(
          <TabNav
              onNavigationStateChange={(prevState, currentState) => {
                  const currentTabScreen = this.getCurrentRouteName(currentState);
                  const previousTabScreen = this.getCurrentRouteName(prevState);
                  if (currentTabScreen !== previousTabScreen) {
                      this.setState({
                          previousTabScreen: currentTabScreen,
                      });
                  }
              }}
              screenProps={{
                  previousTabScreen: this.state.previousTabScreen,
              }}
          />
      )
  }
}

const TabNav = createBottomTabNavigator({
  HomeScreen: {screen: HomeScreen,
    navigationOptions: {
      tabBarVisible: false,
      tabBarIcon: null,
    },
  },
  Chooser: {screen: ObjectChooser},
  tempSettings: { screen: tempSettings },
  Player: { screen: Player,
  navigationOptions: {
      tabBarVisible: false,
      tabBarIcon: null,
    }},
    tempSettings: { screen: tempSettings },
    About: { screen: AboutPage,
    navigationOptions: {
        headerStyle: pageStyles.header,
        headerTitle: "About this Project"
    }},
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
      } 
      return <Image source={finishedIcon} />;
    },
    tabBarOnPress: (screen) => {
      screen.defaultHandler = screen.navigation.navigate(screen.navigation.state.routeName);
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

