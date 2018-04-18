import React from 'react';
import { StyleSheet, View, TouchableHighlight, Image , Dimensions, Text} from 'react-native';
import { homeScreenImage } from './config';


class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    const window = Dimensions.get('window');
    this.state = {
      imgwidth: window.width,
      imgheight: window.height
    }
  }

  render () {
    let homeScreenImage = require('./assets/objects/AppLandingPage.png');
    const window = Dimensions.get('window');
    console.debug(this.state.imgwidth);
    console.debug(this.state.imgheight);
      return (
          <View>
            <Image source={homeScreenImage} resizeMode="cover" style={{width:this.state.imgwidth, height:this.state.imgheight}}/>
            <View >
                <Text style={styles.previewText}>{"This is text"}</Text>
          </View>
          </View>
      );
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
    left: 0
  }
});
