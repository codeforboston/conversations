import React, { Component } from 'react';
import {
    Image,
    View,
} from 'react-native';
import { createBottomTabNavigator, StackNavigator } from 'react-navigation';

import UploadPage from './page/Upload.js';
import ObjectChooser from './ObjectChooser';
import RemnantChooser from './RemnantChooser';
import RemnantDisplay from './Remnant';
import HomeScreen from "./HomeScreen.js";
import Player from "./page/Player.js";
import HelpPage from "./page/Help.js";
import SettingsPage from "./page/SettingsPage";

import ImpatientImage from "./component/ImpatientImage.js";

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
    Upload: UploadPage.navConfig,
    Help: HelpPage.navConfig
}, {
    initialRouteName: "Chooser",
    navigationOptions: ({navigation, screenProps}) => {
        const {routeName} = navigation.state,
              {settings} = screenProps;
        let remnantsDisabled = false, remnantsBounce = false;

        if (routeName === "Remnants") {
            let watchedCount = settings.watchedVideos.length;
            remnantsDisabled = watchedCount < 2;
            remnantsBounce = !settings.remnantsVisited && watchedCount === 2;
        }

        return {
            tabBarIcon: ({ focused, tintColor }) => {
                if (remnantsDisabled)
                    return;

                let finishedIcon = (focused ? SelectedTabIcons : TabIcons)[routeName];

                return remnantsBounce ?
                       <ImpatientImage source={finishedIcon} /> :
                       <Image source={finishedIcon} />;
            },
            tabBarButtonComponent: (
                (remnantsDisabled) ? View : null
            ),
            tabBarOnPress: (screen) => {
                if (routeName === "Remnants") {
                    screenProps.settings.storeSetting("remnantsVisited", true);
                }
                screen._lastRoute = navigation.state.key;
                screen.defaultHandler = screen.navigation.navigate(screen.navigation.state.routeName);
            },
        }},
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
            Settings.getSettings(true).then(settings => {
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
            const {settings} = this.state;
            value = typeof value === "function" ? value(settings[setting]) : value;
            const newSettings = Object.assign({}, settings, {[setting]: value});
            this.setState({ settings: newSettings });
            Settings.saveSettings(newSettings)
                    .catch((err) => {
                        this.setState({ settings });
                        console.error("Error saving settings:", err);
                    })
        }
    }

    render() {
        const settings = this.getSettings();
        return (
            <Settings.Provider value={settings}>
                <MainNav screenProps={{settings: settings}}/>
            </Settings.Provider>
        );
    }
}
