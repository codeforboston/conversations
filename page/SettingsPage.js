import React, { Component } from 'react';
import ReactNative, {
    View,
    ScrollView
} from 'react-native';
import RadioForm from 'react-native-simple-radio-button';
import styles, {
    BackgroundImage,
    BullHeader,
    H1,
    H2,
    HR,
    color,
} from "./styles.js";
import {getLocalizedString} from ".././Languages/LanguageChooser";
import {ProjectDescription, ProjectCredits} from "./AboutDescriptions";

import Settings, { withSettings } from "../Settings.js";
import { ENGLISH, HINDI } from "../config.js";


const radioToLanguageMap = [ENGLISH, HINDI];
const languageToRadioMap = {[ENGLISH]: 0, [HINDI]: 1};
const englishLocalization = getLocalizedString(radioToLanguageMap[0]);
const hindiLocalization = getLocalizedString(radioToLanguageMap[1]);

const radio_props = [
  {label: englishLocalization["languageName"], value: ENGLISH },
  {label: hindiLocalization["languageName"], value: HINDI }
];

const SettingsPage = withSettings(class extends Component {
  handleSettingsChanged = (value) => {
      this.props.settings.storeSetting("language", value);
  }

  render() {
      const {navigation} = this.props;

      // Rendering this page in the background causes the foremost view to
      // "bounce".
      if (!navigation.isFocused())
          return null;

      const {language} = this.props.settings,
            localizedStrMap = getLocalizedString(language),
            AboutDescription = ProjectDescription[language];

    return (
      <BackgroundImage>
        <ScrollView>
            <View style={[styles.insetView, styles.insetArea]}>
                 <H1>{localizedStrMap["settingsTitle"]}</H1>
                 <H2>{localizedStrMap["chooseLanguageOption"]}</H2>
                 <RadioForm
                    radio_props={radio_props}
                    buttonColor={color.buttons.background}
                    selectedButtonColor={color.buttons.selected}
                    initial={languageToRadioMap[language]}
                    buttonStyle={styles.settingsRadioButton}
                    labelStyle={[styles.settingsRadioFormLabel]}
                    onPress={this.handleSettingsChanged}
                />
                <HR />

                <BullHeader>{localizedStrMap["aboutTheProjectTitle"]}</BullHeader>
                {AboutDescription()}

                <HR />

                <BullHeader>{localizedStrMap["acknowledgementsTitle"]}</BullHeader>
                <ProjectCredits>{localizedStrMap}</ProjectCredits>

            </View>
        </ScrollView>
      </BackgroundImage>
    );
  }
});

SettingsPage.navConfig = {
  screen: SettingsPage
}

export default SettingsPage;
