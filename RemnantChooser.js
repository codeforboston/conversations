import React, { Component } from 'react';
import {
  View,
  Text,
  Dimensions,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet, 
  Button
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { remnants } from './config';
import Sound from 'react-native-sound'; 
import { RemnantDisplay } from './Remnant';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;



function imageTileWithNavigation(navigation) {
  return (remnant) => {
    return (
       <TouchableWithoutFeedback 
        onPress={() => navigation.navigate('RemnantDisplay', {
          picture: remnant.picture, 
          audio: remnant.audio
        })}
       > 
        <Image
          style={[styles.remnantTile, {flex: remnant.flex}]}
          source={remnant.picture}
          resizeMode="cover"
        />
    </TouchableWithoutFeedback>

    )
  }
}


export default class RemnantChooser extends Component {
  constructor(props) {
      super(props); 
      this.state = {
        remnants: remnants
      }
    }

    findSmallerDimension = (image) => {
      let imageWidth = Dimensions.get( image ).width; 
      let imageHeight = Dimensions.get( image ).height; 

      return imageWidth > imageHeight ? imageHeight : imageWidth ;  
    }

  render() {

    const navigation = this.props.navigation;
    const imageTile = imageTileWithNavigation(navigation); 


    return(
      <View style={styles.container}>
          <View style={styles.remnantFrame}>

            {imageTile(remnants[0])}

          <View style={{flex:1}}
          />

      </View>

        <View style={styles.remnantFrame}>
            {imageTile(remnants[1])}
            {imageTile(remnants[2])}
        </View>

        <View style={styles.remnantFrame}>
            {imageTile(remnants[3])}
            {imageTile(remnants[4])}

        </View>

        <View style={styles.remnantFrame}>
          <View style={ [ styles.remnantTile, {flex: 1} ] } />
            {imageTile(remnants[5])}
        </View>        

      </View>

    )
  }
};


const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    flexDirection: 'row',

  }, 
  remnantFrame: {
    flex: 1,
    flexDirection: 'column',
 
  },

  remnantTile: {
    height: '100%', 
    width: '100%',
    borderWidth: 3, 
    borderColor: 'white',
  },



});








