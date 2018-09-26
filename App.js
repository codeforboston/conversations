import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableHighlight,
    View,
} from 'react-native';
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

import Settings from "./Settings.js";

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
    /* Remnants: ContactPage.navConfig,*/
    Upload: UploadPage.navConfig,
    Help: HelpPage.navConfig
}, {
    initialRouteName: "Chooser",
    navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            let { routeName, params  } = navigation.state;

            if (routeName === "Remnants") {
                // TODO Show the remnants button conditionally
                return;
            }

            let finishedIcon = (focused ? SelectedTabIcons : TabIcons)[routeName];

            return <Image source={finishedIcon} />;
        },
        tabBarOnPress: (screen) => {
            console.log(navigation.state, screen, screen.navigation.state);
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

const MainNav = StackNavigator({
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
    initialRouteName: "Home",
    headerMode: "none"
});

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            settings: Settings.defaults
        }
    }

    getSettings() {
        if (!this._settingsLoaded) {
            this._settingsLoaded = true;
            Settings.getSettings().then(settings => {
                console.log("loaded settings", settings)
                this.setState({ settings });
            });
        }

        return Object.assign(
            {},
            this.state.settings,
            this.setters);
    }

    setters = {
        storeSetting: (setting, value) => {
            console.log("setting:", setting, "=>", value);
            let {settings} = this.state,
                newSettings = Object.assign({}, settings, {[setting]: value});
            this.setState({ settings: newSettings });
            Settings.saveSettings(newSettings)
                    .catch((err) => {
                        this.setState({ settings });
                        console.error("Error saving settings:", err);
                    })
        }
    }

    render() {
        let settings = this.getSettings();
        return (
            <Settings.Provider value={this.getSettings()}>
                <MainNav/>
            </Settings.Provider>
        );
    }
}
