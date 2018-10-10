import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';

const Settings = React.createContext({
    language: "English",
    storeSetting: () => {}
});

export const ENGLISH = 'english';
export const HINDI = 'hindi';


const defaults = { language: ENGLISH };
const startupDefaults = { watchedVideos: [], remnantsVisited: false };
function initSettings(settings) {
    return Object.assign(settings, startupDefaults);
}


Settings.getSettings = (init) => {
    return AsyncStorage.getItem("@Aashiyaan:settings")
                       .then(settings => (settings ? JSON.parse(settings) : defaults))
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
