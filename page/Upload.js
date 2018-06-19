import React, { Component } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    TouchableWithoutFeedback,
    View,
    CheckBox,
    AsyncStorage
} from "react-native";

import ImagePicker from "react-native-image-picker";
import firebase from "react-native-firebase";

import { Button } from "../component/Button.js";
import Progress from "../component/Progress.js";

import { H2, P } from "./styles.js";


const CHOOSER = 1
const LOGGING_IN = 2
const UPLOADING = 3
const UPLOADED = 4


function formatSize(bytes) {
    return `${(bytes/1024/1024).toFixed(1)} MB`;
}

export default class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            video: null,
            state: CHOOSER,
            checked: false,
            myKey: null
        };
    }

  componentDidMount() {
    firebase.messaging().getToken()
      .then(fcmToken => {
        if (fcmToken) {
          // user has a device token
          console.log("user has a device token; fcmtoken = ", fcmToken);
        } else {
          // user doesn't have a device token yet
          console.log("user doesn't have a device token yet; fcmtoken = ", fcmToken);
        } 
      }).catch(function(err) {
        console.error('An error occurred while retrieving token. ', err);
      });
      
    this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
        // Process your token as required
        console.log("Process your token as required; refreshed token = ", fcmToken);
      });
  }

  componentWillUnmount() {
      this.onTokenRefreshListener();
  }

    selectVideo = () => {
        ImagePicker.showImagePicker({
            title: "Video Picker",
            takePhotoButtonTitle: 'Take Video...',
            mediaType: "video",
            durationLimit: 5*60,
        }, (response) => {
            if (response.didCancel) {
                console.log('User cancelled video picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else if (response.path) {
                this.setState({video: response});
            }
        });
    }

    async getKey() {
      try {
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        this.setState({myKey: value});
      } catch (error) {
        console.error("Error retrieving data" + error);
      }
    }
  
    async saveKey(value) {
      try {
        await AsyncStorage.setItem('@MySuperStore:key', value);
      } catch (error) {
        console.error("Error saving data" + error);
      }
    }
  
    async resetKey() {
      try {
        await AsyncStorage.removeItem('@MySuperStore:key');
        const value = await AsyncStorage.getItem('@MySuperStore:key');
        this.setState({myKey: value});
      } catch (error) {
        console.error("Error resetting data" + error);
      }
    }

    dummyUpload = () => {
        var transferred = 0, total = 100000000;
        this.setState({ state: UPLOADING, upload: { transferred: 0, total: total} });
        setInterval(() => {
            this.setState({
                upload: {
                    transferred: (transferred += 1000000),
                    total: total
                }
            })
        }, 500);
    }

    upload = () => {
        let {video} = this.state;

        if(this.state.checked) {
            // TODO - instanceID - get and save as meta-data

        }

        if (video) {
            firebase.auth().signInAnonymouslyAndRetrieveData()
                    .then(creds => {
                        this.setState({
                            user: creds.user.toJSON()
                        });

                        let refpath = `${creds.user.uid}/${this.videoName()}`;
                        let ref = firebase.storage().ref(refpath);

                        var metadata = {
                            contentType: 'video/mp4',
                            customMetadata: {
                              'userAuthId': this.state.user.uid
                            }
                          };

                        let unsubscribe = ref.putFile(video.path, metadata).on(
                            firebase.storage.TaskEvent.STATE_CHANGED,
                            (event) => {
                                let {state, bytesTransferred, totalBytes} = event;
                                this.setState({
                                    upload: {
                                        transferred: bytesTransferred,
                                        total: totalBytes
                                    },
                                    state: UPLOADING
                                });

                                if (state === firebase.storage.TaskState.SUCCESS) {
                                    this.setState({
                                        state: UPLOADED
                                    });
                                    unsubscribe();
                                }
                            },
                            (error) => {
                                unsubscribe();
                                this.setState({
                                    state: CHOOSER,
                                    error: error
                                });
                                console.error(error);
                            }
                        );
                    });
        }
    }

    videoName = () => {
        let {video} = this.state;

        return video ? video.path.split("/").slice(-1)[0] : "";
    }

    renderUploader = () => {
        let {total, transferred} = this.state.upload;

        return (
            <View style={styles.contentWrapper}>
                <H2>Uploading {this.videoName()}</H2>
                <Progress current={transferred}
                          total={total}
                          text={`${formatSize(transferred)}/${formatSize(total)} bytes uploaded`}
                          style={styles.progressBar}
                />
            </View>
        );
    }

    renderChooser() {
        return (
            <View style={styles.contentWrapper}>
                <P>
                    INSERT EXPLANATORY TEXT HERE
                </P>
                <Button onPress={this.selectVideo}>
                    Select a Video
                </Button>

                <Button onPress={this.upload}
                        disabled={!this.state.video} >
                    Upload {this.videoName()}
                </Button>
                    <TouchableWithoutFeedback onPress={() => this.setState({checked: !this.state.checked})}>
                        <View style={{ flexDirection: 'row' }}>
                            <CheckBox
                                value={this.state.checked}
                                disabled={!this.state.video}
                            />
                            <Text style={{marginTop: 5}}> Notify me if my video is uploaded to YouTube</Text>
                        </View>
                    </TouchableWithoutFeedback>
            </View>
        );
    }

    renderContent() {
        switch(this.state.state) {
            case UPLOADING:
                return this.renderUploader();

            case UPLOADED:
                return (
                    <View>
                        <Text>
                            Video uploaded!
                        </Text>
                    </View>
                );

            default:
                return this.renderChooser();
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <H2>Upload Video</H2>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    contentWrapper: {
        flexDirection: 'column',
        flex: 1
    },
    progressBar: {
        backgroundColor: "#333",
        width: 500
    }
});

UploadPage.navConfig = {
    screen: UploadPage,

    navigationOptions: ({navigation}) => ({
        headerTitle: "About this Project"
    })
}
