import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import { updatedObjectPages } from './config';
import { withDimensions } from "./component/responsive.js";

import { Button } from "./component/Button.js";


function renderVideoWithNavigation(navigate, imgSize) {
    return (video) => {
        return (
            <Button key={video.youtubeVideoId}
                    onPress={() => navigate(video)}
                    style={[styles.touchableStyle]}
                    image={video.asset}
                    pressAnimation="spring"/>
        );
    }
}

const ObjectChooser = withDimensions(class extends Component {
  constructor(props) {
    super(props);
    this.state = {
        watchedVideos: [],
    }
  }

  renderPagerDotIndicator = () => {
      return <PagerDotIndicator pageCount={updatedObjectPages.length}/>
  }

  render() {
      const {navigation, windowDimensions} = this.props,
            {width, height} = windowDimensions;

      const renderVideo = renderVideoWithNavigation((video) => {
          const watchedVideos = new Set(this.state.watchedVideos);
          watchedVideos.add(video.youtubeVideoId);
          this.setState({ watchedVideos: Array.from(watchedVideos) });
          console.warn('videoId = ', video.youtubeVideoId);
          navigation.navigate('Player', { videoId: video.youtubeVideoId });
      }, width / 3);

    return (
      <View style={{flex:1, flexDirection: 'column'}}>
          <IndicatorViewPager style={{flex: 1}} indicator={this.renderPagerDotIndicator()}>
              {updatedObjectPages.map((page, i) => (
                  <View style={styles.objectPage} key={i}>
                      <Image source={require('./assets/skyline_bg.png')}
                             style={[styles.backgroundImage, {width, height}]} />
                    <View style={styles.objectChooser}>
                      {page.objects.map(renderVideo)}
                    </View>
                    <Image source={page.asset} style={{ flexDirection: 'column', flex: 2, width: 500 }} resizeMode="contain"/>
                </View>))}
          </IndicatorViewPager>
      </View>
    );
  }
})

export default ObjectChooser;

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
    objectPage: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center'
    },

  objectPageImage: {
    flex: 3
  },
  backgroundImage: {
    position: 'absolute',
    paddingTop: 10,
  },
});
