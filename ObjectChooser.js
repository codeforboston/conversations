import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image , Dimensions} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import { videos, objectPages } from './config';

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
                pressAnimation="spring"/>
    );
  }
}

class ObjectChooser extends React.Component {

  constructor(props) {
    super(props);
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

  renderPagerDotIndicator = () => {
      return <PagerDotIndicator pageCount={objectPages.length}/>
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
      <View style={{flex:1, flexDirection: 'column'}}>
          <IndicatorViewPager style={{flex: 1}} indicator={this.renderPagerDotIndicator()}>
              {objectPages.map(page => {
                return <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
                    <Image source={require('./assets/skyline_bg.png')} style={styles.backgroundImage} />
                    <View style={styles.objectChooser}  onLayout={this.handleLayoutChange}>
                      {page.objects.map(renderVideo)}
                    </View>
                    <Image source={page.asset} style={{ flexDirection: 'column', flex: 2, width: 500 }} resizeMode="contain"/>
                </View>})}
          </IndicatorViewPager>
      </View>
    );
  }
}


export default ObjectChooser

const styles = StyleSheet.create({
  objectChooser: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  touchableStyle: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    height: 100,
    width: 100,
    margin: -12,
  },
  objectPageImage: {
    flex: 3
  },
  backgroundImage: {
    position: 'absolute',
    paddingTop: 10,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});
