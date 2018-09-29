import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    AsyncStorage
} from 'react-native';
import { createStackNavigator } from 'react-navigation';
import firebase from "react-native-firebase";

import { Button } from "../component/Button.js";
import Progress from "../component/Progress.js";

import {
    P,
} from "../page/styles.js";
import UploadedFilesList from "./UploadedFilesList.js";
import { getLocalizedString } from ".././Languages/LanguageChooser";
import { withSettings } from "../Settings.js";

const CHOOSER = 1
const UPLOADING = 3
const UPLOADED = 4

function formatSize(bytes) {
    return `${(bytes/1024/1024).toFixed(1)} MB`;
}

class UploadProgress extends React.Component {
    constructor(props) {
      super(props);
      const {navigation} = this.props;

      this.state = {
        video: navigation.getParam('video', null),
        checked: navigation.getParam('checked', false),
        name: navigation.getParam('name', ''),
        desc: navigation.getParam('desc', ''),
        email: navigation.getParam('email', ''),
        user: null,
        state: CHOOSER,
        uploaded: [],
        error: null
      }
      this.upload = this.upload.bind(this);
    }

    componentDidMount() {
        const {doUpload} = this.state;
            firebase.messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                // user has a device token
                console.debug("user has a device token; fcmtoken = ", fcmToken);
                } else {
                // user doesn't have a device token yet
                console.debug("user doesn't have a device token yet; fcmtoken = ", fcmToken);
                }
            }).catch(function(err) {
                console.error('An error occurred while retrieving token. ', err);
            });
            this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
                // Process your token as required
                console.log("Process your token as required; refreshed token = ", fcmToken);
            });
    
            this.onTokenRefreshListener();
            this.upload();
    }

    videoName = (video) => {
        if (!video) video = this.state.video;
        return video ? video.path.split("/").slice(-1)[0] : "";
    }

    renderContent() {
        switch(this.state.state) {
            case UPLOADING:
                return this.renderUploader();

            case UPLOADED:
                this.renderUploaded();
            default:
                return this.defaultUploadProgress();
        }
    }

    renderUploaded = () => {
        let {successMessage, uploaded} = this.state;
    }

    renderUploader = () => {
        let {total, transferred} = this.state.upload;
        let localizedStrMap = getLocalizedString(this.props.settings.language);

        return (
            <View style={styles.contentWrapper}>
                <P>{localizedStrMap["uploadingNotification"] + this.state.name}</P>
                <Progress current={transferred}
                          total={total}
                          text={`${formatSize(transferred)}/${formatSize(total)} bytes uploaded`}
                          style={styles.progressBar}
                />
            </View>
        );
    }

    defaultUploadProgress = () => {
      return (
          <View>
            <Text>
            </Text>
          </View>
      );
    }

    upload = () => {
        let {video, name} = this.state;
        if (video) {
            firebase.auth().signInAnonymouslyAndRetrieveData()
                    .then(creds => {
                        this.setState({
                            user: creds.user.toJSON()
                        });

                        let refpath = `${creds.user.uid}/${name}`;
                        let ref = firebase.storage().ref(refpath);

                        var metadata = {
                            contentType: 'video/mp4',
                            customMetadata: {
                                'userAuthId': this.state.user.uid,
                                "notifyIfPublished": this.state.checked
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
                                    video.name = this.state.name;
                                    video.size = totalBytes;
                                    video.date = new Date();
                                    video.description = this.state.desc;
                                    video.email = this.state.email;
                                    this.saveVideoInfo(video).then(videos =>  this.props.navigation.navigate("UploadedFiles", {uploadedVideos: videos}),
                                                                   error => console.log(error));
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

    saveVideoInfo(video) {
        var date = video.date || new Date().toISOString();
        if (typeof date !== "string")
            date = date.toISOString();

        let videos= AsyncStorage.mergeItem("Aashiyaan:uploaded",
                                      JSON.stringify({
                                          [date]: video
                                      }))
                           .then(() => {videos=this.getUploadedVideos();return videos;});
        return videos;
    }

    async getUploadedVideos() {
        var videos = await AsyncStorage.getItem("Aashiyaan:uploaded");

        if (videos) {
            videos = JSON.parse(videos);
            var videoList = Object.keys(videos).map(k => videos[k]);
            return videoList;
        } else {
            return [];
        }
    }

    render() {
      return (
          <View>
            {this.renderContent()}
          </View>
      );
    }

}

export default withSettings(UploadProgress);
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
    buttonRow: {
        flexDirection: "row"
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
