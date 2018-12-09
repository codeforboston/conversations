import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';

import {ENGLISH, HINDI} from './config';

const Settings = React.createContext({
    language: "English",
    storeSetting: () => {}
});

// User defaults. If the user changes these, directly or indirectly, those
// changes will persist.
const defaults = { language: ENGLISH, watchedIntro: {} };

// Defaults at app startup time. Settings will reset to these values each time
// the app is started.
const startupDefaults = { watchedVideos: [], remnantsVisited: false };
function initSettings(settings) {
    return Object.assign(settings, startupDefaults);
}


Settings.getSettings = (init) => {
    return AsyncStorage.getItem("@Aashiyaan:settings")
                       .then(settings => Object.assign(defaults, settings ? JSON.parse(settings) : {}))
                       .then(settings => init ? initSettings(settings) : settings);
}

Settings.saveSettings = (settings) => {
    return AsyncStorage.setItem("@Aashiyaan:settings",
                                JSON.stringify(settings))
                       .then(_ => (settings));
}

export function localized(Comp) {
    return (props) => (
        <Settings.Consumer>
            {({language}) => (
                <Comp language={language} {...props}/>
            )}
        </Settings.Consumer>
    );
};

export function withSettings(Comp) {
    return (props) => (
        <Settings.Consumer>
            {(settings) => (
                <Comp settings={settings} {...props}/>
            )}
        </Settings.Consumer>
    );
};

export default Settings;
