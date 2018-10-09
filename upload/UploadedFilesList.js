import React from 'react';
import {
    BackHandler,
    CheckBox,
    FlatList,
    StyleSheet,
    Text,
    View,
} from 'react-native';

import firebase from "react-native-firebase";
import { NavigationActions } from 'react-navigation';

import { Button } from "../component/Button.js";
import styles, {
    BackgroundImage,
    H1,
    H2,
    P,
    Strong,
} from "../page/styles.js";
import UploadManager from "./UploadManager.js";
import { getLocalizedString } from ".././Languages/LanguageChooser";
import { withSettings } from "../Settings.js";


function formatDate(when) {
    if (!when) return "????/??/??";

    if (typeof when === "string" || typeof when === "number")
        when = new Date(when);
     const formattedMonth = when.getMonth()+1;
    return [when.getFullYear(), formattedMonth, when.getDate()].join("/");
}

class UploadedFilesList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
        uploadedVideos: []
    }

      props.navigation.addListener("willFocus", this.refresh);
  }

    refresh = async () => {
        const uploadedVideos = await UploadManager.getUploadedVideos();
        this.setState({ uploadedVideos });
    }

  onDelete = (video) => {
      let {name, date} = video;
      firebase.firestore().collection("deletionRequests").add({
          videoName: name,
          videoDate: date
      }).then(_ => {
          video.deletionRequested = true;
          return UploadManager.saveVideoInfo(video);
      }).then(videos => this.setState({ uploadedVideos: videos }));
  }

  render () {
    const {uploadedVideos} = this.state;
    let localizedStrMap = getLocalizedString(this.props.settings.language);

    return (
        <BackgroundImage>
            <H1 style={[styles.insetArea, mystyles.header]}>Uploaded</H1>
            <FlatList
                contentContainerStyle={{justifyContent: "center"}}
                data={uploadedVideos}

                renderItem={({item, index}) => (
                    <View style={[styles.insetArea, mystyles.uploadedItem]}
                                key={item.date}>
                        <Text>
                            <Strong>{item.name}</Strong>{"\n"}
                            {localizedStrMap["uploadedNotification"] + " " + formatDate(item.date)}
                        </Text>
                        <Button buttonStyle={{ backgroundColor: "red", color: "white"}}
                                            style={{alignSelf: "flex-end"}}
                                            onPress={() => this.onDelete(item)}
                                            disabled={item.deletionRequested} >
                            {item.deletionRequested ? "Deletion Requested" : "Delete"}
                        </Button>

                    </View>
                )}
            />
        </BackgroundImage>
      )
    }
}

export default withSettings(UploadedFilesList);

const mystyles = StyleSheet.create({
    header: {
        marginTop: 20,
        marginBottom: 0,
        paddingBottom: 10,
        paddingTop: 15
    },
    uploadedItem: {
        backgroundColor: "white",
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
    }
});
