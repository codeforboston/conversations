import React, { Component } from 'react';
import ReactNative, {
    Text,
    View,
    StyleSheet,
    Dimensions,
    PixelRatio,
    ScrollView
} from 'react-native';
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel
} from 'react-native-simple-radio-button';
import styles , {
    BackgroundImage,
    InsetView,
    InsetText,
    BullHeader,
    P,
    H1, H2, HR,
    color,
} from "./styles.js";
import {getLocalizedString} from ".././Languages/LanguageChooser";
import {ProjectDescription, ProjectCredits} from "./AboutDescriptions";

import Settings, { withSettings, ENGLISH, HINDI } from "../Settings.js";


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

    onScroll = () => {
        this._userScrolled = true;
    }

  _scrollTo(name, animated=false) {
    let child = this.refs[name]

    if (child != null) {
      let nodeHandle = ReactNative.findNodeHandle(this._scroller);
      child.measureLayout(nodeHandle, (_x, y) => {
        this._scroller.scrollTo({x: 0, y: y, animated: animated});
          this._userScrolled = false;
      }, (error) => {
        console.log(error)
      })
    }
  }

  componentDidUpdate({state}) {
      let {navigation} = this.props;
      try {
          let target = navigation.state.params && navigation.state.params.targetSection,
              oldTarget = state.params && prevProps.state.params.targetSection;

          if (target !== null && oldTarget !== target)
              this._scrollTo(target);
      } catch(_) { }
  }

  render() {
      let {language} = this.props.settings,
          localizedStrMap = getLocalizedString(language),
          AboutDescription = ProjectDescription[language];
      console.log(`${language}`, AboutDescription);

    return (
      <BackgroundImage>
        <ScrollView ref={scroller => { this._scroller = scroller; }}>
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
