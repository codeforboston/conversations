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

import Button from "../component/Button.js";
import Progress from "../component/Progress.js";
import UploadProgress from "./UploadProgress.js";

import { withSettings, ENGLISH, HINDI } from "../Settings.js";
import { getLocalizedString } from ".././Languages/LanguageChooser";


const CHOOSER = 1
const LOGGING_IN = 2
const UPLOADING = 3
const UPLOADED = 4

class VideoInfoFields extends Component {
  constructor(props) {
    super(props);
    let {videoFile, updateVideoInfoFn} = props;
    let fileName = this.getVideoFileName(videoFile);
    this.state = {
      videoNameText: fileName,
      descText: "",
      emailText: ""
    }
    this.updateVideoInfo = this.updateVideoInfo.bind(this);
    this.props.updateVideoInfoFn(fileName, "", "");
  }

  getVideoFileName(video) {
    if (!video) video = this.state.video;
    return video ? video.path.split("/").slice(-1)[0] : "";
  }

  updateVideoInfo (name, desc, email) {
      this.props.updateVideoInfoFn(name, desc, email);
      this.setState({
        videoNameText: name,
        descText: desc,
        emailText: email,
      })
  }

  render() {
      let {videoNameText, descText, emailText} = this.state,
          {language} = this.props,
          localizedStrMap = getLocalizedString(language);

    return (
      <View>
          <TextInput
              style={{height: 40, borderColor: 'gray', borderWidth: 1}}
              placeholder={localizedStrMap["videoName"]}
              onChangeText={(nameText) => this.updateVideoInfo(nameText, descText, emailText)}
          value = {this.state.videoNameText}/>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
                   onChangeText={(newDescText) => this.updateVideoInfo(videoNameText, newDescText, emailText)}
                   placeholder={localizedStrMap["videoDescription"]}
                   value={this.state.descText} />
        <TextInput
            style={{height: 40, borderColor: 'gray', borderWidth: 1}}
            onChangeText={(newEmailText) => this.updateVideoInfo(videoNameText, descText, newEmailText)}
            placeholder={localizedStrMap["emailAddress"]}
            value={this.state.emailText}/>
      </View>
    );
  }
}

const UploadVideoScreen = withSettings(class extends React.Component {
  constructor (props) {
      super(props);
      this.state = {
          video: null,
          checked: false,
          name: "",
          desc: "",
          email: ""
      };
      this.selectVideo = this.selectVideo.bind(this);
      this.videoEditInfo = this.videoEditInfo.bind(this);
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
              this.setState({video: response});
          }
      });
  }

  videoEditInfo (name, desc, email) {      
      this.setState({
          name: name,
          desc: desc,
          email: email
      });
  }

  render () {
      let {checked, video, upload, uploaded} = this.state;
      let {name, desc, email} = this.state,
          {language} = this.props.settings;
    let bgColor = !video ? 'rgba(43,35,103,0.5)' : 'rgb(43,35,103)';
    let localizedStrMap = getLocalizedString(language);
    return (
      <View style={styles.container}>
            <View style={styles.buttonRow}>
              <Button onPress={this.selectVideo} >
                  {localizedStrMap["selectVideoButton"]}
              </Button>

              <Button onPress={()=>this.props.navigation.navigate('UploadProgress', {video: video, checked: checked, name: name, desc: desc, email: email})}
                  disabled={!video}
                  >
                  {localizedStrMap["uploadVideoButton"]}
              </Button>
            </View>
            <View>
              <TouchableWithoutFeedback onPress={() => this.setState({checked: !checked})}>
                  <View style={{ flexDirection: 'row' }}>
                      <CheckBox
                          value={checked}
                          disabled={!video}
                      />
                      <Text style={{marginTop: 5}}>
                          {localizedStrMap["notifyOnUploadText"]}
                      </Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.VideoInfoFields}>
                {!(video===null) && <VideoInfoFields
                                        language={language}
                                        videoFile={video}
                                        updateVideoInfoFn={this.videoEditInfo}/> }
            </View>
        </View>
    );
  }
});

export default UploadVideoScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
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
});
