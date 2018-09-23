import React from 'react';
import { View, Text, StyleSheet, TouchableNativeFeedback, TouchableHighlight, TextInput, TouchableWithoutFeedback, CheckBox} from 'react-native';
import ImagePicker from "react-native-image-picker";
import firebase from "react-native-firebase";

import { Button } from "../component/Button.js";
import Progress from "../component/Progress.js";
import UploadProgress from "./UploadProgress.js";

const CHOOSER = 1
const LOGGING_IN = 2
const UPLOADING = 3
const UPLOADED = 4

export class VideoInfoFields extends React.Component {
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
    let {videoNameText, descText, emailText} = this.state;
    return (
      <View>
        <Text> Video Name: </Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(nameText) => this.updateVideoInfo(nameText, descText, emailText)}
          value = {this.state.videoNameText}/>
        <Text> My Story is about ... </Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(newDescText) => this.updateVideoInfo(videoNameText, newDescText, emailText)}
          value={this.state.descText} />
        <Text> Email address to contact me: </Text>
        <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(newEmailText) => this.updateVideoInfo(videoNameText, descText, newEmailText)}
          value={this.state.emailText}/>
      </View>
    );
  }
}

export default class UploadVideoScreen extends React.Component {

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
    let bgColor = !video ? 'rgba(43,35,103,0.5)' : 'rgb(43,35,103)';
    let {name, desc, email} = this.state;
    return (
      <View style={styles.container}>
            <View style={styles.buttonRow}>
              <TouchableHighlight
                  onPress={this.selectVideo}
                  background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={{height:30, width:130, backgroundColor: 'rgb(43,35,103)',margin:20}}>
                  <Text style={{color: 'white', textAlign:'center'}}>SELECT VIDEO</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight
                  style= {styles.buttonStyle}
                  onPress={()=>this.props.navigation.navigate('UploadProgress', {video: video, checked: checked, name: name, desc: desc, email: email})}
                  disabled={!video}
                  activeOpacity={!video? 1: 0.7} >
                <View style={{height:30, width:130, backgroundColor: bgColor,margin:20}}>
                  <Text style={{color: 'white', textAlign:'center'}}>UPLOAD VIDEO</Text>
                </View>
              </TouchableHighlight>
            </View>
            <View>
              <TouchableWithoutFeedback onPress={() => this.setState({checked: !checked})}>
                  <View style={{ flexDirection: 'row' }}>
                      <CheckBox
                          value={checked}
                          disabled={!video}
                      />
                      <Text style={{marginTop: 5}}> Notify me if my video is uploaded to YouTube</Text>
                  </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.VideoInfoFields}>
                {!(video===null) && <VideoInfoFields
                                        videoFile={video}
                                        updateVideoInfoFn={this.videoEditInfo}/> }
            </View>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    contentWrapper: {
        flex: 1
    },
    VideoInfoFields: {
        flex:1,
        flexDirection: "row"
    },
    buttonRow: {
        flexDirection: "row",
        flex: 1,
        height: 50
    },
    progressBar: {
        backgroundColor: "#333",
        width: 500
    },

    uploads: {

    },

    uploadedItem: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%"
    }
});
