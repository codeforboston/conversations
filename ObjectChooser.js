import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
    View,
} from 'react-native';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

import { updatedObjectPages } from './config';
import { withSettings } from "./Settings.js";

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

class ObjectChooser extends Component {
    state = {
        watchedVideos: [],
        width: 0,
        height: 0
    };

    onLayout = (e) => {
        const {width, height} = e.nativeEvent.layout;
        this.setState({ width, height });
    }

  renderPagerDotIndicator = () => {
      return <PagerDotIndicator pageCount={updatedObjectPages.length}/>
  }

    markWatched = (videoId) => {
        this.props.settings.storeSetting(
            "watchedVideos",
            watched => watched.indexOf(videoId) >= 0 ? watched : watched.concat([videoId]));
    }

  render() {
      const {navigation, settings, windowDimensions} = this.props,
            {watchedVideos} = settings,
            {width, height} = this.state;

      const renderVideo = renderVideoWithNavigation((video) => {
          this.markWatched(video.youtubeVideoId);
          navigation.navigate('Player', { videoId: video.youtubeVideoId });
      }, width / 3);

    return (
        <View style={{ flex: 1, flexDirection: "column" }} onLayout={this.onLayout}>
            <IndicatorViewPager
                style={{flex: 1, width: width, height: height}}
                indicator={this.renderPagerDotIndicator()}>
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
}

export default withSettings(ObjectChooser);


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
