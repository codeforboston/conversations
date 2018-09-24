import React, { Component } from 'react';
import { Text, View , StyleSheet, Dimensions, PixelRatio, ImageBackground, FlatList, TouchableNativeFeedback, TouchableHighlight, Button, AsyncStorage} from 'react-native';
import styles, {P, H2, HR, H3} from ".././page/styles.js";
import {getLocalizedString} from ".././Languages/LanguageChooser";
import { createStackNavigator } from 'react-navigation';
import UploadVideoScreen from './UploadVideoScreen.js';
import UploadProgress from './UploadProgress.js';
import UploadedFilesList from "./UploadedFilesList.js";


const bottomScrollerMarginFactor = 0.18;

export class ShareStoryScreen extends Component {
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
      const width = Dimensions.get('window').width;
      const height = Dimensions.get('window').height;
      let homeScreenImage = require('.././assets/BackgroundForAppLanding.png');
      const {navigation} = this.props;

      let viewUploadedDisabled = this.state.uploadedVideos.length <1;
      // In stackNavigator, none of the screens get unloaded. So do not rely on state for uploaded videos, get this from
      // navigator instead to control disabling of the UploadedVideos button. 

      if (navigation.getParam("ReachedViaNavigation")) {
        viewUploadedDisabled = navigation.getParam("uploadedVideos",[]).length < 1;
      }
      let uploadedViewColor = viewUploadedDisabled ? 'rgba(43,35,103,0.5)' : 'rgb(43,35,103)';
      let localizedStrMap = getLocalizedString(global.LANG);

      return (
        <ImageBackground
            source={ homeScreenImage }
            imageStyle={{resizeMode: 'cover'}}
            style={{width: width, height: height}}
        >
          <View
            style={{ backgroundColor: "white", width: width*0.9, height: height, marginLeft: width*0.05, marginBottom: height*bottomScrollerMarginFactor}} >
            <View>
                <H2 style ={mystyles.shareStoryTitle}>
                  {localizedStrMap["shareStoryTitle"]}
                </H2>
            </View>
            <View>
                <P>
                    {localizedStrMap["aboutAppDesc"] + "\n"}
                    {localizedStrMap["shareDesc"]}
                </P>
                <H3 style={mystyles.storyCreate}>
                    {localizedStrMap["createStoryTitle"]}
               </H3>
             </View>
             <View style={{height:100}}>
             <FlatList
                data={[{key: localizedStrMap["uploadInstruction1"]},
                       {key: localizedStrMap["uploadInstruction2"]},
                       {key: localizedStrMap["uploadInstruction3"]},
                       {key: localizedStrMap["uploadInstruction4"]}]}
               renderItem={({item}) => <Text style={mystyles.instructions}>{item.key}</Text>}> </FlatList>
             </View>
               <View style={{flex:1, flexDirection: 'row', justifyContent: 'center'}}>
                 <TouchableHighlight
                     onPress={this._onStart}
                     background={TouchableNativeFeedback.SelectableBackground()}>
                   <View style={{height:30, width:130, backgroundColor: 'rgb(43,35,103)',margin:20}}>
                     <Text style={{color: 'white', textAlign:'center'}}>{localizedStrMap["startUploadButton"]}</Text>
                   </View>
                 </TouchableHighlight>
                 <TouchableHighlight
                     onPress={this._onViewUploaded}
                     disabled={viewUploadedDisabled}
                     background={TouchableNativeFeedback.SelectableBackground()}>
                   <View style={{height:30, width:130, backgroundColor: uploadedViewColor, margin:20}}>
                     <Text style={{color: 'white', textAlign: 'center'}}>{localizedStrMap["viewUploadedButton"]}</Text>
                   </View>
                 </TouchableHighlight>
               </View>
         </View>
      </ImageBackground>
      );
    }
}

const UploadStack = createStackNavigator({
    ShareStory: {
      screen: ShareStoryScreen
    },
    UploadVideo: {
      screen: UploadVideoScreen
    },
    UploadProgress: {
      screen: UploadProgress
    },
    UploadedFiles: {
      screen: UploadedFilesList
    }
}, {
    initialRouteName: 'ShareStory',
    headerMode: 'none',
    headerBackTitleVisible: false,
});

export default UploadStack;


UploadStack.navConfig = {
    screen: UploadStack
}

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
     paddingLeft: 20
   }
});
