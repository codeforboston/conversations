import React, { Component } from 'react';
import {AsyncStorage} from 'react-native';


export const saveSetting = (settingObj)=> {
    AsyncStorage.setItem(settingObj.name, JSON.stringify(settingObj), () => {
    });
};

export const getSetting = async (name)=> {
    let prefVal = await AsyncStorage.getItem(name);
    console.debug(prefVal);
    return prefVal;
    // AsyncStorage.getItem(name, (err, result) => {
    //     return result;
    // });
};