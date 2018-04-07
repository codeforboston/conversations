import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import YouTube from 'react-native-youtube';
import videos from './videos.json';

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
          <Button
            key={video.youtubeVideoId}
            onPress={() => navigation.navigate('Player', { videoId: video.youtubeVideoId })}
            title={`View ${video.youtubeVideoId}`}
          />
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
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
