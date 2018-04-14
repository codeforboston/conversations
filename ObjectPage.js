import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';




class ObjectButton extends Component {


  render() {

	let { source, style } = this.props

    return (
        <View style={{alignItems: 'center', justifyContent: 'center', width: 150, height: 150}}>
          <Image source={source} style={styles.object} />
        </View>
    )
  };

};



export default class App extends Component {
  render() {
    return (
      <View style={[styles.container, {flex: 1}]}>
        <Image source={require('./assets/Background_with_objects_layout.png')} resizeMode='contain' style={{position: 'absolute', width: 720}}></Image>
	      <View style={[styles.container, {flex: 2, backgroundColor:'#aaddddff'}]}>
	        <ObjectButton  source={require('./assets/Object_2_Chilly_Powdre100_X100.png')}/>
	        <ObjectButton  source={require('./assets/Object_1_Pepper_Spray_100_X100.png')} />
	        <ObjectButton  source={require('./assets/Object_8_Flip_Flop_100_X100.png')}/>
	        <ObjectButton  source={require('./assets/Object_3_Pigeon_100_X100.png')} />
	        <ObjectButton  source={require('./assets/Remnants_appear_Plate_100_X100.png')} style={{opacity: 0}}/>
	        <ObjectButton  source={require('./assets/Object_7_Umbrella_100_X100.png')}/>
	        <ObjectButton  source={require('./assets/Object_4_Safety_Pin_100_X100.png')}/>
	        <ObjectButton  source={require('./assets/Object_5_Elbow_100_X100.png')}/>
	        <ObjectButton  source={require('./assets/Object_6_hundred_100_X100.png')}/>
          </View>
        <View style={{flex: 1, height: 20}}></View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  object: {
  	transform: [{scale: 1.4}]
  },
});
