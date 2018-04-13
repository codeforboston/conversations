import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image } from 'react-native';
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
      <View style={styles.objectChooser}>
        {videos.map(video => (
          <TouchableHighlight
            key={video.youtubeVideoId}
            onPress={() => navigation.navigate('Player', { videoId: video.youtubeVideoId })}
            style={{ padding: 15 }}
          >
            <Image source={video.asset} resizeMode="cover" style={{ width: 100, height: 100 }} />
          </TouchableHighlight>
        ))}
      </View>
    );
  }
}

export default StackNavigator({
  Home: { screen: ObjectChooser },
  Player: { screen: Player },
});

const styles = StyleSheet.create({
  objectChooser: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#82c9de',
    alignItems: 'flex-start',
  },
});
