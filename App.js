import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import YouTube from 'react-native-youtube';
import { videos } from './config';

import AboutPage from "./page/About.js";

import TextButton from "./component/TextButton.js";


const youtubeApiKey = process.env.YOUTUBE_API_KEY;

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

class ObjectChooser extends React.Component {
  render() {
    const navigation = this.props.navigation;
      return (
          <View style={styles.pageContainer}>
              <View style={styles.objectChooser}>
                  {videos.map(video => (
                      <TouchableHighlight
                          key={video.youtubeVideoId}
                          onPress={() => navigation.navigate('Player', { videoId: video.youtubeVideoId })}
                          style={styles.iconButtonStyle}
                          underlayColor="rgba(255, 255, 255, 0.5)"
                          >
                          <Image source={video.asset} resizeMode="contain" style={styles.iconImageStyle} />
                      </TouchableHighlight>
                  ))}
              </View>
              <View style={styles.buttonContainer}>
                  <TextButton navigation={navigation} route="About">About</TextButton>
              </View>
          </View>
    );
  }
}

export default StackNavigator({
  Home: { screen: ObjectChooser },
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
    flex: 1,
    flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    backgroundColor: '#82c9de',
    alignItems: 'flex-start',
  },
});
