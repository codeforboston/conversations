import React, { Component } from "react";
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from "react-native";

import ImagePicker from "react-native-image-picker";
import firebase from "react-native-firebase";

import { Button } from "../component/Button.js";
import Progress from "../component/Progress.js";

import { H2 } from "./styles.js";


const CHOOSER = 1
const LOGGING_IN = 2
const UPLOADING = 3
const UPLOADED = 4

export default class UploadPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            video: null,
            state: CHOOSER
        };
    }

    selectVideo = () => {
        ImagePicker.showImagePicker({
            title: "Select a Video to Upload",
            mediaType: "video",
            durationLimit: 5*60,
        }, (response) => {
            if (response.path)
                this.setState({video: response});
        });
    }

    upload = () => {
        let {video} = this.state;

        if (video) {
            firebase.auth().signInAnonymouslyAndRetrieveData()
                    .then(creds => {
                        this.setState({
                            user: creds.user.toJSON()
                        });

                        let refpath = `${creds.user.uid}/${this.videoName()}`;
                        let ref = firebase.storage().ref(refpath);

                        let unsubscribe = ref.putFile(video.path).on(
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
        let {upload} = this.state;

        return (
            <View>
                <Text>Uploading</Text>
                <Progress current={upload.transferred}
                          total={upload.total}
                          text={`${upload.transferred}/${upload.total} bytes uploaded`}
                />
            </View>
        );
    }

    renderChooser() {
        return (
            <View>
                <Button onPress={this.selectVideo}>
                    Select a Video
                </Button>

                <Button onPress={this.upload}
                        disabled={!this.state.video}>
                    Upload {this.videoName()}
                </Button>
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
            <View>
                <H2>Upload Video</H2>
                {this.renderContent()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
});

UploadPage.navConfig = {
    screen: UploadPage,

    navigationOptions: ({navigation}) => ({
        headerTitle: "About this Project"
    })
}
