import React, { Component } from 'react';
import HindiStrings from "./Hindi.js";
import EnglishStrings from "./English.js";

const languageToLocalizationMap = {
    "English": EnglishStrings,
    "Hindi": HindiStrings
};

export const getLocalizedString = (langName)=> {
    let currentLang = {};
    if (languageToLocalizationMap.hasOwnProperty(langName)) {
        currentLang = languageToLocalizationMap[langName];
    }
    return currentLang; 
};