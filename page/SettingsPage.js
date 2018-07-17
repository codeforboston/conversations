import React, { Component } from 'react';
import { Text, View , StyleSheet, Dimensions, PixelRatio, ImageBackground, ScrollView} from 'react-native';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import styles , {P,H2,HR, H3, HMedium} from "././styles.js";
import {getLocalizedString} from ".././Languages/LanguageChooser";
import {ProjectDescription, ProjectCredits} from "./AboutDescriptions";
import {saveSetting, getSetting} from ".././StorageUtils";


const pr = PixelRatio.get();
const radioToLanguageMap = {
  0: 'English',
  1 : 'Hindi'
};

const bottomScrollerMarginFactor = 0.18;

const languageToRadioMap = {
  'English': 0,
  'Hindi': 1
};

const englishLocalization = getLocalizedString(radioToLanguageMap[0]);
const hindiLocalization = getLocalizedString(radioToLanguageMap[1]);

var radio_props = [
  {label: englishLocalization["languageName"], value: 0 },
  {label: hindiLocalization["languageName"], value: 1 }
];

export default class SettingsPage extends Component {
  constructor(props) {
    super(props);
    this.handleSettingsChanged = this.handleSettingsChanged.bind(this);
    this.state = {language: global.LANG};
  }

  handleSettingsChanged(value) {
      global.LANG = radioToLanguageMap[value];
      this.setState({language: global.LANG});
      saveSetting({name: "languagePreference", value: global.LANG});
  }


  render() {
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;
    let homeScreenImage = require('.././assets/BackgroundForAppLanding.png');

    let localizedStrMap = getLocalizedString(global.LANG);
    let AboutDescription = ProjectDescription[global.LANG];
    
    return (
      <ImageBackground
          source={ homeScreenImage }
          imageStyle={{resizeMode: 'cover'}}
          style={{width: width, height: height}}
      >
        <ScrollView style={{ backgroundColor: "white", width: width*0.9, height: height, marginLeft: width*0.05, marginTop: height*0.05, marginBottom: height*bottomScrollerMarginFactor}}>
           <View style={mystyles.BackGroundStyle} >
              <View style={mystyles.SettingsTitle}>
                    <HMedium>{localizedStrMap["settingsTitle"]}</HMedium>
              </View>
              <View style={mystyles.languageChooser}>
                  <HMedium>{localizedStrMap["chooseLanguageOption"]}</HMedium>
              </View>
              <RadioForm style={styles.radioForm}
                  radio_props={radio_props}
                  buttonColor={'rgb(43,35,103)'}
                  selectedButtonColor={'rgb(43,35,103)'}
                  initial={languageToRadioMap[global.LANG]}
                  buttonStyle={styles.settingsRadioButton}
                  labelStyle={[styles.settingsRadioFormLabel, styles.fontSize10]}
                  onPress={(value) => {this.handleSettingsChanged(value)}}
                />
                <HR />
                <View style={mystyles.SettingsTitle}>
                  <HMedium>{localizedStrMap["aboutTheProjectTitle"]}</HMedium>
                </View>
                <View style={mystyles.AboutDesc}>
                    <AboutDescription />
                </View>
                <HR />
                <View style={mystyles.SettingsTitle}>
                    <HMedium>
                        {localizedStrMap["acknowledgementsTitle"]}
                    </HMedium>
                </View>
                <View>
                    <ProjectCredits>{localizedStrMap}</ProjectCredits>
                </View>
                <View style={{marginBottom: 10*pr}}></View>
           </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}

const mystyles = StyleSheet.create({
  BackGroundStyle: {
     flex: 1,
     flexDirection: 'column'
  },
  SettingsTitle: {
     paddingTop: 10*pr,
     paddingLeft: 15*pr,
  },
  languageChooser: {
      paddingLeft: 20*pr
  },
  AboutDesc: {
     paddingLeft: 10*pr,
     paddingRight: 10*pr,
     marginBottom: 10*pr
  },

});


SettingsPage.navConfig = {
  screen: SettingsPage
}
