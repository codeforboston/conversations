import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, ImageBackground, View, TouchableHighlight, Image, Text} from 'react-native';
import { homeScreenImage, ENGLISH, HINDI } from './config';
import { withDimensions } from "./component/responsive.js";


class HomeScreenWrapped extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      language: ENGLISH
    }
  }

  // could be abstracted to a single function accepting lang prop
  // but this works for only two cases
  handlePress= (lang) => {
      global.LANG = lang;
      this.props.navigation.navigate("Chooser");
  }
    
  render () {
    const navigation = this.props.navigation;
    let homeScreenImage = require('./assets/SmallerBackgroundforAppLanding.png');
    let titleImage = require('./assets/Aashiyaan.png');
    let {pressing} = this.state;
      let languageImageEnglish =
          pressing === ENGLISH ?
          require('./assets/AppLandingEnglishSelected.png') :
          require('./assets/AppLandingEnglish.png');
      let languageImageHindi =
          pressing === HINDI ?
          require('./assets/AppLandingHindiSelected.png') :
          require('./assets/AppLandingHindi.png');
    let {width, height} = this.props.windowDimensions;
    let titleWidth = 0.51 * width;
    let titleHeight = 0.6 * titleWidth;

  return (
      <ImageBackground
          source={ homeScreenImage }
          imageStyle={{resizeMode: 'cover'}}
          style={{flex: 1, width: width, height: height}}
      >
          <ImageBackground
              source={ titleImage }
              resizeMode='contain'
              style={{
                  width: titleWidth,
                  height: titleHeight,
                  position: 'absolute',
                  left: '43%',
                  bottom: '15%',
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  alignItems: 'stretch'
              }}
          >
              <TouchableHighlight
                  onPress={() => this.handlePress(ENGLISH)}
                  onPressIn={() => { this.setState({ pressing: ENGLISH }); }}
                  onPressOut={() => { this.setState({ pressing: null }); }}
                  underlayColor="transparent"
                  style={{
                      padding: 0.1 * titleWidth,
                      position:'relative'
                  }}
              >
                  <Image source={languageImageEnglish}
                         style={{
                             width: 0.2 * titleWidth,
                             height: 0.2 * titleWidth,
                             position:'relative',
                             top:'40%'
                         }}
                  />
              </TouchableHighlight>
              <TouchableHighlight
                  onPress={() => this.handlePress(HINDI)}
                  onPressIn={() => { this.setState({ pressing: HINDI }); }}
                  onPressOut={() => { this.setState({ pressing: null }); }}
                  underlayColor="transparent"
                  style={{
                      padding: 0.1 * titleWidth,
                      position:'relative'
                  }}
              >
                  <Image source={languageImageHindi} style={{
                      width: 0.2 * titleWidth,
                      height: 0.2 * titleWidth,
                      position:'relative',
                      top:'80%'
                  }} />
              </TouchableHighlight>
              
          </ImageBackground>

      </ImageBackground>
    )
  }
}

const HomeScreen = withDimensions(HomeScreenWrapped);


export default HomeScreen;

const styles = StyleSheet.create({
  previewText: {
    margin: 5,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,

  }
});
