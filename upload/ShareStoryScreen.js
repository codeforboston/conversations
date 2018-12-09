import React, { Component } from 'react';
import {
    AsyncStorage,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import styles, {
    BackgroundImage,
    P,
    H1,
    H2,
    H3,
} from ".././page/styles.js";
import { Button } from "../component/Button.js";
import { withSettings } from "../Settings.js";
import { ENGLISH, HINDI } from "../config.js";
import { getLocalizedString } from ".././Languages/LanguageChooser";



const bottomScrollerMarginFactor = 0.18;

const ShareStoryScreen = withSettings(class extends Component {
    render () {
        let {navigation, settings} = this.props;

      let viewUploadedDisabled = false;
      let localizedStrMap = getLocalizedString(settings.language);

      return (
          <BackgroundImage>
              <View style={[styles.insetView, styles.insetArea]} >
                  <H1 style ={mystyles.shareStoryTitle}>
                      {localizedStrMap["shareStoryTitle"]}
                  </H1>
                  <P>
                      {localizedStrMap["aboutAppDesc"] + "\n"}
                      {localizedStrMap["shareDesc"]}
                  </P>
                  <H3 style={mystyles.storyCreate}>
                      {localizedStrMap["createStoryTitle"]}
                  </H3>

                  {
                      [1, 2, 3, 4].map(i => (
                          <Text style={mystyles.instructions} key={i}>
                              {localizedStrMap[`uploadInstruction${i}`]}
                          </Text>
                      ))
                  }
                <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
                    <Button onPress={() => navigation.navigate("UploadVideo")}>
                                {localizedStrMap["startUploadButton"]}
                    </Button>
                    <Button onPress={() => navigation.navigate("UploadedFiles")}
                            disabled={viewUploadedDisabled}>
                        {localizedStrMap["viewUploadedButton"]}
                    </Button>
                </View>
              </View>
          </BackgroundImage>
      );
    }
});

export default ShareStoryScreen;

const mystyles = StyleSheet.create({
   shareStoryTitle: {
     color: 'rgb(43, 35, 103)'

   },
   instructions: {
     color: 'rgb(43,35,103)',
     fontSize: 15,
     paddingLeft: 50
   },
   storyCreate: {
       marginBottom: 5,
       marginTop: 0,
       paddingLeft: 20,
   }
});
