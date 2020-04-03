import React, { Component, Fragment } from 'react';
import {
  Animated,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Sound from 'react-native-sound';

import { siteURL, remnants } from './config';
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

const isCompleted = xs => xs.every(v => v === 0);

const RemnantChooser = withDimensions(class extends Component {
    state = {
        remnants: remnants,
        watchedRemnants: Array(6).fill(1),
    }

    goToSite = () => {
        Linking.openURL(siteURL);
    }

    _linkOpacity = new Animated.Value(0)

    _fadeIn = Animated.timing(this._linkOpacity, { toValue: 1 })

    componentDidUpdate(_, prevState) {
        if (this.state.watchedRemnants !== prevState.watchedRemnants &&
            isCompleted(this.state.watchedRemnants) && !isCompleted(prevState.watchedRemnants)) {
            this._fadeIn.start();
        }
    }

  render() {
      const {navigation, windowDimensions} = this.props,
            {width, height} = windowDimensions;
      const {watchedRemnants} = this.state;
      const imageTile = imageTileWithNavigation(navigation, remnants, watchedRemnants,
                                                (idx) => {
                                                    this.setState(({watchedRemnants}) => {
                                                        const updated = Array.from(watchedRemnants);
                                                        updated[idx] = 0;
                                                        return { watchedRemnants };
                                                    });
                                                });
      // Have all the remnants been watched?
      const complete = isCompleted(watchedRemnants);

    return (
        <TouchableWithoutFeedback onPress={complete && this.goToSite}>
          <View style={[styles.container, {width, height}]}>
            <Image
              style={[styles.backgroundImage, {transform: [{translateY: -height*1.8},
                                                           {scale: 0.75},
                                                           {translateX: -width*0.4}]}]}
              source={require("./assets/CityBlueDarkSunrise-3.png")}
              resizeMode="contain"
            />
            {complete && <Animated.View style={[styles.completedOverlay, { opacity: this._linkOpacity }]}>
                           <Text style={styles.linkStyle}>
                             www.aashiyaan.org
                           </Text>
                         </Animated.View>}
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
        </TouchableWithoutFeedback>
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

    completedOverlay: {
        justifyContent: 'center',
        position: 'absolute',
        bottom: 80,
        left: 50,
        right: 50,
    },

    linkStyle: {
        fontSize: 36,
        fontWeight: '500',
        flex: 1,
        color: '#887DBA',
        textAlign: 'center',
        width: '100%',
        // textDecorationLine: 'underline',
        // textDecorationColor: 'white'
    }
});
