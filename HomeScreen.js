import React from 'react';
import { StackNavigator } from 'react-navigation';
import { StyleSheet, ImageBackground, View, TouchableHighlight, Image , Dimensions, Text} from 'react-native';
import { homeScreenImage, ENGLISH, HINDI } from './config';


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    const window = Dimensions.get('window');
    this.state = {
      imgwidth: window.width,
      imgheight: window.height,
      language: ENGLISH
    }
  }

  // could be abstracted to a single function accepting lang prop
  // but this works for only two cases
  handlePressEnglish = () => {
    this.setState({ language: ENGLISH })
  }
  handlePressHindi = () => {
    this.setState({ language: HINDI })
  }

  render () {
    const navigation = this.props.navigation;
    let homeScreenImage = require('./assets/BackgroundForAppLanding.png');
    let titleImage = require('./assets/Aashiyaan.png');
    let languageImageEnglish = require('./assets/AppLandingEnglish.png');
    let languageImageHindi = require('./assets/AppLandingHindi.png');
    const window = Dimensions.get('window');
    let titleWidth = 0.51 * this.state.imgwidth;
    let titleHeight = 0.6 * titleWidth;


  return (
    <ImageBackground
      source={ homeScreenImage }
      imageStyle={{resizeMode: 'cover'}}
      style={{width:this.state.imgwidth, height:this.state.imgheight}}
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
          onPress={() => navigation.navigate('Player', { language: ENGLISH })}
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
          onPress={() => navigation.navigate('Player', { language: HINDI })}
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
