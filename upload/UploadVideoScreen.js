import React, { Component } from 'react';
import {
    CheckBox,
    StyleSheet,
    Text,
    TextInput,
    TouchableHighlight,
    TouchableNativeFeedback,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import ImagePicker from "react-native-image-picker";

import styles, {
    BackgroundImage,
    H1,
} from "../page/styles.js";
import Button from "../component/Button.js";
import Progress from "../component/Progress.js";
import UploadProgress from "./UploadProgress.js";
import UploadManager from "./UploadManager.js";

import { withSettings, ENGLISH, HINDI } from "../Settings.js";
import { getLocalizedString } from ".././Languages/LanguageChooser";


const VideoInfoFields = ({language, onChange, video}) => {
    const {notify, name, desc, email} = video,
          localizedStrMap = getLocalizedString(language);

    return (
      <View>
          <TextInput
              style={mystyles.input}
              placeholder={localizedStrMap["videoName"]}
              onChangeText={(nameText) => onChange("name", nameText)}
              value={name}/>

        <TextInput style={mystyles.input}
                   onChangeText={(text) => onChange("desc", text)}
                   placeholder={localizedStrMap["videoDescription"]}
                   value={desc} />
        <TextInput
            style={mystyles.input}
            onChangeText={(text) => onChange("email", text)}
            placeholder={localizedStrMap["emailAddress"]}
            value={email}/>

        <TouchableWithoutFeedback onPress={() => onChange("notify", !notify)}>
            <View style={{ flexDirection: 'row' }}>
                <CheckBox value={notify} disabled={!video} />
                <Text style={{marginTop: 5}}>
                    {localizedStrMap["notifyOnUploadText"]}
                </Text>
            </View>
        </TouchableWithoutFeedback>
      </View>
    );
};


const UploadVideoScreen = withSettings(class extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
          videoInfo: {
              video: null,
              notify: false,
              name: "",
              desc: "",
              email: ""
          }
      };
  }

  selectVideo = () => {
      ImagePicker.showImagePicker({
          title: "Video Picker",
          takePhotoButtonTitle: 'Take Video...',
          mediaType: "video",
          durationLimit: 5*60,
      }, (response) => {
          if (response.didCancel) {
              console.debug('User cancelled video picker');
          }
          else if (response.error) {
              console.debug('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
              console.debug('User tapped custom button: ', response.customButton);
          }
          else if (response.path) {
              let {videoInfo} = this.state;
              videoInfo.video = response;
              this.setState({videoInfo});
          }
      });
  }

  videoEditInfo = (info) => {
      this.setState({videoInfo: info});
  }

    updateInfo = (field, val) => {
        const {videoInfo} = this.state;
        videoInfo[field] = val;
        this.setState({videoInfo});
    }

    startUpload = () => {
        const upload = UploadManager.create(this.state.videoInfo);
        this.props.navigation.replace("UploadProgress",
                                      {uploadId: upload.id});
    }

  render () {
      let {videoInfo} = this.state,
          {language} = this.props.settings;

    let localizedStrMap = getLocalizedString(language);
    return (
        <BackgroundImage>
            <View style={[styles.insetView, styles.insetArea, mystyles.container]}>
                <View style={mystyles.buttonRow}>
                    <Button onPress={this.selectVideo} >
                        {localizedStrMap["selectVideoButton"]}
                    </Button>

                    <Button onPress={this.startUpload}
                            disabled={!videoInfo.video}
                    >
                        {localizedStrMap["uploadVideoButton"]}
                    </Button>
                </View>
                <View style={mystyles.VideoInfoFields}>
                    {!(videoInfo.video===null) && <VideoInfoFields
                                                      language={language}
                                                      video={videoInfo}
                                                      onChange={this.updateInfo} /> }
                </View>
            </View>
        </BackgroundImage>
    );
  }
});

export default UploadVideoScreen;

const mystyles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    VideoInfoFields: {
        flex: 1,
        flexDirection: "row"
    },
    buttonRow: {
        flexDirection: "row",
        flex: 1,
        height: 50
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    }
});
