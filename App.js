import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Dimensions, Text  } from 'react-native';
import { createBottomTabNavigator, TabNavigator, TabBarBottom } from 'react-navigation';
import YouTube from 'react-native-youtube';
import { videos } from './config';
import { Sound } from 'react-native-sound';

import ObjectChooserWrapper from './ObjectChooser';
import RemnantChooser from './RemnantChooser';
import RemnantDisplay from './Remnant';
import AboutPage from "./page/About.js";
import UploadPage from "./page/Upload.js";
import ContactPage from "./page/Contact.js";
import HelpPage from "./page/Help.js";
import SettingsPage from "./page/SettingsPage";


import { Button } from "./component/Button.js";
import pageStyles from "./page/styles.js";

const youtubeApiKey = "AIzaSyDWgERNRbubs4t4Em7fOyQX2d-S6POo_aY"; 

console.disableYellowBox = true;

const TabIcons = {
    Chooser: require("./assets/help/tap_and_hold-24px_default.png"),
    Upload: require("./assets/help/submit_video-24px_default.png"),
    Settings: require("./assets/help/settings-24px_default.png"),
    About: require("./assets/help/audio_help-24px_default.png"),
    Help: require('./assets/help/help-24px_default.png')
};

const SelectedTabIcons = {
    Chooser: require("./assets/help/tap_and_hold-24px_selected.png"),
    Upload: require("./assets/help/submit_video-24px_selected.png"),
    Settings: require("./assets/help/settings-24px_selected.png"),
    About: require("./assets/help/audio_help-24px_selected.png"),
    Help: require('./assets/help/help-24px_selected.png')
};


export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {previousTabScreen: null};
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

ObjectChooser.navConfig = {
  screen: ObjectChooserWrapper,

  navigationOptions: ({navigation}) => ({
    tabBarVisible: ({}) => {null ? false : true},
  })
}

const TabNav = createBottomTabNavigator({
  Chooser: ObjectChooser.navConfig,
  Settings: SettingsPage.navConfig,
  Contact: ContactPage.navConfig,
  Upload: UploadPage.navConfig,
  Help: HelpPage.navConfig
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
      const { routeName, params  } = navigation.state;

      let finishedIcon = (focused ? SelectedTabIcons : TabIcons)[routeName];

      return <Image source={finishedIcon} />;
    },
    tabBarOnPress: (screen) => {
      screen.defaultHandler = screen.navigation.navigate(screen.navigation.state.routeName);
    },
  }),
  tabBarOptions: {
    showLabel : false,
    style: {
      backgroundColor: '#262C66',
    }
  },
  animationEnabled: false,
  }
);
