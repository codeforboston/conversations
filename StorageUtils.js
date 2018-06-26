import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';


export const saveSetting = (settingObj)=> {
    AsyncStorage.setItem(settingObj.name, JSON.stringify(settingObj), () => {
    });
};

export const getSetting = (name)=> {
    AsyncStorage.getItem(name, (err, result) => {
        return result;
    });
};