import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image, Dimensions } from 'react-native';
import { StackNavigator } from 'react-navigation';
import YouTube from 'react-native-youtube';
import { videos } from './config';

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
    <View style={{flex:1, flexDirection: 'row'}}>
        <Image source={require('./assets/BackgroundForObjectsAndHelpAbout.png')} style={styles.backgroundImage}/>

      <View style={styles.objectChooser}>
        {videos.map(video => (
          <TouchableHighlight
            key={video.youtubeVideoId}
            onPress={() => navigation.navigate('Player', { videoId: video.youtubeVideoId })}
            style={styles.touchableStyle}
          >
            <Image source={video.asset} resizeMode="contain" style={styles.objectImage} />
          </TouchableHighlight>
        ))}
      </View>
       <View style={{flex: 1.5}}></View>
     </View>
    );
  }
}

export default StackNavigator({
  Home: {
    screen: ObjectChooser,
    navigationOptions: {
      header: null,
    },
  },
  Player: { screen: Player },

});

const styles = StyleSheet.create({
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
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
