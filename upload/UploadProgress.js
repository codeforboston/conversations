import React, {Fragment} from 'react';
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

import styles, {
    BackgroundImage,
    H1,
    P,
} from "../page/styles.js";
import UploadManager from "./UploadManager.js";

import { getLocalizedString } from ".././Languages/LanguageChooser";
import { withSettings } from "../Settings.js";


function formatSize(bytes) {
    return `${(bytes/1024/1024).toFixed(1)} MB`;
}

class UploadProgress extends React.Component {
    subscribe(videoId) {
        console.log(videoId);
        const upload = UploadManager.getUpload(videoId);
        console.log(upload);
        if (!videoId) return;
        UploadManager.getUpload(videoId)
                     .on("update", this.onUploadUpdate)
                     .on("complete", this.onUploadComplete);
    }

    unsubscribe(videoId) {
        if (!videoId) return;

        UploadManager.getUpload(videoId)
                     .off("update", this.onUploadUpdate)
                     .off("complete", this.onUploadComplete);
    }

    componentDidMount() {
        this.subscribe(this.props.navigation.getParam("uploadId"));
    }

    componentDidUpdate(prevProps) {
        const oldNav = prevProps.navigation,
              nav = this.props.navigation,
              oldId = oldNav.getParam("uploadId"),
              newId = nav.getParam("uploadId");

        if (oldId !== newId) {
            this.unsubscribe(oldId);
            this.subscribe(newId);
        }
    }

    onUploadUpdate = () => {
        this.forceUpdate();
    }

    onUploadComplete = (videoInfo) => {
        UploadManager.saveVideoInfo(videoInfo);
    }

    saveVideoInfo(video) {
        var date = video.date || new Date().toISOString();
        if (typeof date !== "string")
            date = date.toISOString();

        let videos = AsyncStorage.mergeItem("Aashiyaan:uploaded",
                                            JSON.stringify({
                                                [date]: video
                                            }));
        return videos;
    }

    getUpload() {
        const uploadId = this.props.navigation.getParam("uploadId");

        return uploadId && UploadManager.getUpload(uploadId);
    }

    next = () => {
        this.props.navigation.replace("UploadedFiles");
    }

    renderComplete(upload) {
        const localizedStrMap = getLocalizedString(this.props.settings.language);
        return (
            <Fragment>
                <H1>
                    {localizedStrMap["uploadedNotification"]}
                </H1>
                <Button style={{flex: 0, flexShrink: 1 }} onPress={this.next}>
                    Continue
                </Button>
            </Fragment>
        );
    }

    renderUploading(upload) {
        const {total, transferred, video} = upload,
              text = `${formatSize(transferred)}/${formatSize(total)} uploaded`,
              localizedStrMap = getLocalizedString(this.props.settings.language);

        return (
            <Fragment>
                <H1>
                    {localizedStrMap["uploadingNotification"] + " " + video.name}
                </H1>
                <Progress current={transferred}
                        total={total}
                        text={text}
                        style={myStyles.progressBar}
                />
            </Fragment>
        );
    }

    render() {
        const upload = this.getUpload();

        return (
            <BackgroundImage>
                <View style={[styles.insetView, styles.insetArea]}>
                    {upload.complete ?
                     this.renderComplete(upload) :
                     this.renderUploading(upload)}
                </View>
            </BackgroundImage>
        );
    }
}

export default withSettings(UploadProgress);

const myStyles = StyleSheet.create({
    progressBar: {
        backgroundColor: "#333",
        width: 500
    },
});
