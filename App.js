import React from 'react';
import { StyleSheet, View, TouchableHighlight, TouchableOpacity, Image, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';
import YouTube from 'react-native-youtube';
import { videos } from './config';

import AboutPage from "./page/About.js";

import {Button} from "./component/Button.js";
import {TextButton} from "./component/TextButton.js";

const youtubeApiKey = process.env.YOUTUBE_API_KEY;
console.disableYellowBox = true;

class Player extends React.Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View>
        <YouTube
          apiKey={youtubeApiKey}
          videoId={navigation.state.params.videoId}
          play={true}
          fullscreen={true}
          showFullscreenButton={false}
          onChangeFullscreen={e => e.isFullscreen || navigation.goBack()}
          style={{ width: 0, height: 0 }}
        />
      </View>
    );
  }
}

function renderVideoWithNavigation(navigate, shouldDisableRemnant) {
  return (video) => {
    const disabled = video.isRemnant && shouldDisableRemnant;
    return (
      <TouchableHighlight
        key={video.youtubeVideoId}
        onPress={() => navigate(video)}
        style={[styles.touchableStyle, { opacity: disabled ? 0 : 1 }]}
        disabled={disabled}
      >
        <Image source={video.asset} resizeMode="contain" style={styles.objectImage} />
      </TouchableHighlight>
    );
  }
}



class ObjectChooser extends React.Component {
  constructor(props) {
    super(props);
    this.state = { watchedVideos: [] };
  }
  render() {
    const navigation = this.props.navigation;
    const shouldDisableRemnant = this.state.watchedVideos.length < 2;
    const renderVideo = renderVideoWithNavigation((video) => {
      const watchedVideos = new Set(this.state.watchedVideos);
      watchedVideos.add(video.youtubeVideoId);
      this.setState({ watchedVideos: Array.from(watchedVideos) });
      navigation.navigate('Player', { videoId: video.youtubeVideoId });
    }, shouldDisableRemnant);
    return (
      <View style={{flex:1, flexDirection: 'row'}}>
        <Image source={require('./assets/BackgroundForObjectsAndHelpAbout.png')} style={styles.backgroundImage} />

        <View style={styles.objectChooser}>{videos.map(renderVideo)}</View>

        <View style={{ flex: 1.5, flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <View style={{ backgroundColor: '#aa99dd', height: 80, width: 160, position: 'absolute' }}></View>
          <Button image={require('./assets/AboutIcon.png')}
            style={styles.navIcon}
            navigation={navigation}
            route="About"
          />
          <Button image={require('./assets/HelpIcon.png')}
            style={styles.navIcon}
            navigation={navigation}
            route="Help" />
        </View>
      </View>
    );
  }
}


class LanguageChooser extends React.Component {

   render() {
    let { height, width } = Dimensions.get('window');
    
    return (
      <View style={{
      }}>

        <Image style={styles.backgroundImage} 
        resizeMode="cover" 
        source={require('./assets/BackgroundForAppLanding.png')} />

        <View style={{
          position: 'absolute',
          width: Dimensions.get('window').width * 0.5,
          height: Dimensions.get('window').height * 0.5, 
          left: Dimensions.get('window').width * 0.4, 
          top: Dimensions.get('window').height * 0.31

          }}>

            <View style={{
              flex: 1, 
              flexDirection: 'row',
              justifyContent: 'flex-start', 
              alignItems: 'flex-end'}}>

              <Image 
                  style={[styles.title, {position: 'absolute'}]} 
                  resizeMode="contain" 
                  source={require('./assets/Aashiyaan_buttonPair.png')} 
                />

              <TouchableOpacity  style={{
                flex: 1, 
                flexDirection: 'row', 
                justifyContent: 'flex-start', 
                }}>
                  <Image 
                    resizeMode="contain" 
                    source={require('./assets/AppLandingEnglish_Button.png')} 
                  /> 
              </TouchableOpacity>

              <TouchableOpacity  style={{
                flex: 1,
                }} >
                <Image 
                  resizeMode="contain" 
                  source={require('./assets/AppLandingHindi_Button.png')} 
                />
              </TouchableOpacity>
              </View>

        </View>

        </View>

    );
  }
}



export default StackNavigator({
  Home: {
    screen: LanguageChooser,
    navigationOptions: {
      header: null,
    },
  },
  ObjectChooser: {
    screen: ObjectChooser,
    navigationOptions: {
      header: null,
    },
  },
  Player: { screen: Player },
  About: AboutPage.navConfig
}, {
    headerMode: "none"
});

const styles = StyleSheet.create({
    iconButtonStyle: {
        padding: 15
    },

    iconImageStyle: {
        width: 100,
        height: 100
    },

    pageContainer: {
        flex: 1,
        flexDirection: "column"
    },

    buttonContainer: {
        height: 40,
        flexDirection: "row",
        justifyContent: "space-between"
    },

  objectChooser: {
    flex: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 60,
    paddingBottom: 0,
    paddingRight: 60,
    paddingTop: 0,
    margin: 10,
  },
  objectImage: {
    height: 100,
    width: 100,
    margin: 2,
  },
  navIcon: {
    height: 100,
    width: 100,
    margin: -12,
  },
  title: {
    flex: 1, 
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
