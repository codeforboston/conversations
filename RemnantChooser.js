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
  Button,
  Animated
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { remnants } from './config';
import Sound from 'react-native-sound'; 
import { RemnantDisplay } from './Remnant';

const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;


function imageTileWithNavigation(navigation, remnant, watchedRemnants) {
  return (index) => {
    const myOpacity = watchedRemnants[index];
    const disabled = !watchedRemnants[index];

    return (
       <TouchableWithoutFeedback 
        onPress={() => {
          watchedRemnants[index] = 0; 
          navigation.navigate('RemnantDisplay', {
          picture: remnant[index].picture, 
          audio: remnant[index].audio
          });}}
        disabled={disabled}
       > 
        <Image
          style={[styles.remnantTile, {flex: remnant[index].flex, opacity: myOpacity}]}
          source={remnant[index].picture}
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
        remnants: remnants, 
        watchedRemnants: Array(6).fill(1), 

    }
  }


  render() {

  
    const navigation = this.props.navigation;
    const watchedRemnants = this.state.watchedRemnants; 
    const imageTile = imageTileWithNavigation(navigation, remnants, watchedRemnants); 
  


    return(
      <View style={styles.container}>
        <Image 
        style={styles.backgroundImage}
        source={require("./assets/CityBlueDarkSunrise-3.png")}
        resizeMode="contain"
        />

                <View style={styles.remnantFrame}>
                    {imageTile(0)}
                    <View style={{flex:1}}/>
                </View>

                <View style={styles.remnantFrame}>
                    {imageTile(1)}
                    {imageTile(2)}
                </View>

                <View style={styles.remnantFrame}>
                    {imageTile(3)}
                    {imageTile(4)}
                </View>

                <View style={styles.remnantFrame}>
                    <View style={{flex: 1}} />
                    {imageTile(5)}
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
  backgroundImage: {
    position: 'absolute', 
    transform: [
      {translateY: -height*1.8}, 
      {scale: 0.75}, 
      {translateX: -width*0.4}, 
      ], 
  },
  remnantFrame: {
    flex: 1,
    flexDirection: 'column',
  
  },

  remnantTile: {
    height: '100%', 
    width: '100%',
    borderWidth: 2,
    borderColor: 'white',
  
  
  },



});



