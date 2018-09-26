import React, { Component } from 'react';

import { ENGLISH, HINDI } from "../Settings.js";

import HindiStrings from "./Hindi.js";
import EnglishStrings from "./English.js";

const languageToLocalizationMap = {
    [ENGLISH]: EnglishStrings,
    [HINDI]: HindiStrings
};

export const getLocalizedString = (langName) => {
    let currentLang = {};
    if (languageToLocalizationMap.hasOwnProperty(langName)) {
        currentLang = languageToLocalizationMap[langName];
    }
    return currentLang;
};
