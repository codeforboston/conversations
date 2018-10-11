import React, { Component, Fragment } from 'react';
import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Sound from 'react-native-sound';

import { remnants } from './config';
import { withDimensions } from "./component/responsive.js";


function imageTileWithNavigation(navigation, remnant, watchedRemnants, onWatch) {
  return (index) => {
    const myOpacity = watchedRemnants[index];
    const disabled = !watchedRemnants[index];

    return (
       <TouchableWithoutFeedback 
        onPress={() => {
                onWatch(index);
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


const RemnantChooser = withDimensions(class extends Component {
    state = {
        remnants: remnants,
        watchedRemnants: Array(6).fill(1),
    }

  render() {
      const {navigation, windowDimensions} = this.props,
            {width, height} = windowDimensions;
      const {watchedRemnants} = this.state;
      const imageTile = imageTileWithNavigation(navigation, remnants, watchedRemnants,
                                                (idx) => {
                                                    watchedRemnants[idx] = 0;
                                                    this.setState({ watchedRemnants });
                                                });

    return(
      <View style={[styles.container, {width, height}]}>
        <Image
            style={[styles.backgroundImage, {transform: [{translateY: -height*1.8},
                                                         {scale: 0.75},
                                                         {translateX: -width*0.4}]}]}
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
});

export default RemnantChooser;


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  }, 
  backgroundImage: {
    position: 'absolute', 
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
