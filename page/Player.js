import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    BackHandler,
} from 'react-native'
import YouTube from 'react-native-youtube'

const youtubeApiKey = "AIzaSyDWgERNRbubs4t4Em7fOyQX2d-S6POo_aY"; 

export default class PlayerPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            renderChild: true,
        }
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentDidUpdate() { // TODO 
        if (!this.state.renderChild) {
            this.setState({ renderChild: true });
        }
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        this.setState({ renderChild: false });
        this.props.navigation.goBack(null);
        return true;
    }

    restartYouTubePlayer(navigate) {
        return React.createElement(YouTube, {
                apiKey: youtubeApiKey,
                videoId: navigate.getParam('videoId',''),
                play: true,
                fullscreen: true,
                showFullscreenButton: false,
                onChangeFullscreen: e => e.isFullscreen || navigate.goBack(),
                onReady: e => this.setState({ isReady: true }),
                onChangeState: e => this.setState({ status: e.state }),
                onChangeQuality: e => this.setState({ quality: e.quality }),
                onError: e => this.setState({ error: e.error }),
                style: { alignSelf: 'stretch', height: 300 }
            });
    }

    render() {
      const navigate = this.props.navigation;
      return (
        <View style={stylePlayer.container}>
        {
            this.restartYouTubePlayer(navigate)
        }
        </View>
      );
    }
  }

  const stylePlayer = StyleSheet.create({
      container: {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff'
      }
  })
