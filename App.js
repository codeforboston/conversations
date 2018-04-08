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

class App extends React.Component {
  render() {
    const navigation = this.props.navigation;
    return (
      <View style={styles.container}>
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
  Home: { screen: App },
  Player: { screen: Player },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
});
