import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Dimensions, Text  } from 'react-native';
import { createBottomTabNavigator, StackNavigator, TabBarBottom } from 'react-navigation';
import YouTube from 'react-native-youtube';
import UploadPage from './upload/ShareStoryScreen';

import ObjectChooser from './ObjectChooser';
import RemnantChooser from './RemnantChooser';
import RemnantDisplay from './Remnant';
import HomeScreen from "./HomeScreen.js";
import Player from "./page/Player.js";
import ContactPage from "./page/Contact.js";
import HelpPage from "./page/Help.js";
import SettingsPage from "./page/SettingsPage";

const youtubeApiKey = "AIzaSyDWgERNRbubs4t4Em7fOyQX2d-S6POo_aY";

console.disableYellowBox = true;


function getActiveRouteName(navigationState) {
    if (navigationState) {
        const route = navigationState.routes[navigationState.index];

        if (route.routes)
            return getActiveRouteName(route);
    }
    return route.routeName;
}


const TabIcons = {
    Chooser: require("./assets/help/tap_and_hold-24px_default.png"),
    Upload: require("./assets/help/submit_video-24px_default.png"),
    Remnants: require("./assets/help/remnants-24px_default.png"),
    Settings: require("./assets/help/settings-24px_default.png"),
    About: require("./assets/help/audio_help-24px_default.png"),
    Help: require('./assets/help/help-24px_default.png')
};

const SelectedTabIcons = {
    Chooser: require("./assets/help/tap_and_hold-24px_selected.png"),
    Upload: require("./assets/help/submit_video-24px_selected.png"),
    Remnants: require("./assets/help/remnants-24px_selected.png"),
    Settings: require("./assets/help/settings-24px_selected.png"),
    About: require("./assets/help/audio_help-24px_selected.png"),
    Help: require('./assets/help/help-24px_selected.png')
};

const MainNavigator = createBottomTabNavigator({
    Chooser: {screen: ObjectChooser},
    Settings: SettingsPage.navConfig,
    Remnants: {screen: RemnantChooser},
    /* Contact: ContactPage.navConfig, */
    Upload: UploadPage.navConfig,
    Help: HelpPage.navConfig
}, {
  navigationOptions: ({ navigation }) => ({
    tabBarIcon: ({ focused, tintColor }) => {
        if (routeName === "Remnants") {
            // TODO Show the remnants button conditionally
            return;
        }

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

export default StackNavigator({
    Home: {
        screen: HomeScreen
    },
    Player: {
        screen: Player
    },
    RemnantDisplay: {
        screen: RemnantDisplay
    },
    Main: {
        screen: MainNavigator
    }
}, {
    headerMode: "none"
});
