import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';

const Settings = React.createContext({
    language: "English",
    storeSetting: () => {}
});

export const ENGLISH = 'english';
export const HINDI = 'hindi';


Settings.defaults = { language: ENGLISH };

Settings.getSettings = () => {
    return AsyncStorage.getItem("@Aashiyaan:settings")
                       .then(settings => (settings ? JSON.parse(settings) : Settings.defaults));
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
