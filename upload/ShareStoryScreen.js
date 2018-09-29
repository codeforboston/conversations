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
import { withSettings, ENGLISH, HINDI } from "../Settings.js";
import { getLocalizedString } from ".././Languages/LanguageChooser";

import UploadVideoScreen from './UploadVideoScreen.js';
import UploadProgress from './UploadProgress.js';
import UploadedFilesList from "./UploadedFilesList.js";


const bottomScrollerMarginFactor = 0.18;

const ShareStoryScreen = withSettings(class extends Component {
    constructor (props) {
      super(props);
      this.state = {
        uploadedVideos: []
      }
      this._onStart = this._onStart.bind(this);
      this._onViewUploaded = this._onViewUploaded.bind(this);
    }

    componentDidMount () {
      this.getUploadedVideos().then(videos => {this.setState({'uploadedVideos': videos})});
    }

    _onStart (event) {
        this.props.navigation.navigate('UploadVideo');
    }

    async getUploadedVideos() {
        var videos = await AsyncStorage.getItem("Aashiyaan:uploaded");
        if (videos) {
            videos = JSON.parse(videos);
            return Object.keys(videos).map(k => videos[k]);
        } else {
            return [];
        }
    }

    _onViewUploaded (event) {
        let uploadedVideos = this.state.uploadedVideos;
        const {navigation} = this.props;

        // In stackNavigator, none of the screens get unloaded. So do not rely on state for uploaded videos, get this from
        // navigator instead to send uploadedVideos back to the screen. 

        if (navigation.getParam("ReachedViaNavigation")) {
          uploadedVideos = navigation.getParam("uploadedVideos",[]);
        }
        this.props.navigation.navigate('UploadedFiles', {uploadedVideos: uploadedVideos});
    }

    render () {
        let {navigation, settings} = this.props,
            {width, height} = this.state;

      let viewUploadedDisabled = this.state.uploadedVideos.length < 1;
      // In stackNavigator, none of the screens get unloaded. So do not rely on state for uploaded videos, get this from
      // navigator instead to control disabling of the UploadedVideos button. 

      if (navigation.getParam("ReachedViaNavigation")) {
        viewUploadedDisabled = navigation.getParam("uploadedVideos",[]).length < 1;
      }
      let uploadedViewColor = viewUploadedDisabled ? 'rgba(43,35,103,0.5)' : 'rgb(43,35,103)';
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
                    <Button onPress={this._onStart}>
                                {localizedStrMap["startUploadButton"]}
                    </Button>
                    <Button onPress={this._onViewUploaded}
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
