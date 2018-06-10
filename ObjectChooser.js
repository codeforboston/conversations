import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image , Dimensions} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { videos } from './config';

import { Button } from "./component/Button.js";


function renderVideoWithNavigation(navigate, shouldDisableRemnant, imgSize) {
  return (video) => {
    const disabled = video.isRemnant && shouldDisableRemnant;
    return (
        <Button key={video.youtubeVideoId}
                onPress={() => navigate(video)}
                style={[styles.touchableStyle, { opacity: disabled ? 0 : 1 }]}
                disabled={disabled}
                image={video.asset}
                pressAnimation="spring"
                resizeMode="contain"
                imageStyle={styles.objectImage}/>
    );
  }
}

class ObjectChooser extends React.Component {

  constructor(props) {
    super(props);
    console.debug(global.LANG);
    const window = Dimensions.get('window');
    this.state = {
      imgwidth: window.width,
      watchedVideos: [],
    }
    this.handleLayoutChange = this.handleLayoutChange.bind(this);
  }

  handleLayoutChange(e) {
      this.setState({
        imgwidth: e.nativeEvent.layout.width
      })
  }

  render() {
    const navigation = this.props.navigation;
    const shouldDisableRemnant = this.state.watchedVideos.length < 2;
    const renderVideo = renderVideoWithNavigation((video) => {
      const watchedVideos = new Set(this.state.watchedVideos);
      watchedVideos.add(video.youtubeVideoId);
      this.setState({ watchedVideos: Array.from(watchedVideos) });
      navigation.navigate('Player', { videoId: video.youtubeVideoId });
    }, shouldDisableRemnant, this.state.imgwidth / 3);
    return (
      <View style={{flex:1, flexDirection: 'row'}}>
        <Image source={require('./assets/BackgroundForObjectsAndHelpAbout.png')} style={styles.backgroundImage} />

        <View style={styles.objectChooser}  onLayout={this.handleLayoutChange}>
          {videos.map(renderVideo)}
        </View>
        <View style={{ flex: 1.5, flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
          <View style={{backgroundColor: '#aa99dd', height: 240, width: 100, position: 'absolute'}}></View>
          <Button image={require('./assets/SettingsIconEnhanced.png')}
                  pressAnimation="spring"
                  style={styles.navIcon}
                  navigation={navigation}
                  route="SettingsPage" /> 
          <Button image={require('./assets/AboutIcon.png')}
                  pressAnimation="spring"
                  style={styles.navIcon}
                  navigation={navigation}
                  route="About"
          />
          <Button image={require('./assets/HelpIcon.png')}
                  pressAnimation="spring"
                  style={styles.navIcon}
                  navigation={navigation}
                  route="Help" />
                      
        </View>

      </View>
    );
  }
}
export default ObjectChooser

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
  navIcon: {
    height: 100,
    width: 100,
    margin: -12,
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});
