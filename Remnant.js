import React, { Component } from 'react';
import {
	View,
	Text, 
	Image,
	Animated,
	Dimensions,
	TouchableWithoutFeedback,
	StyleSheet,
	Easing
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { remnants } from './config';
import Sound from 'react-native-sound'; 


const height = Dimensions.get('window').height;
const width = Dimensions.get('window').width;



export default class RemnantDisplay extends Component {

	constructor(props) {
		super(props); 
		this.state = {};
	
	};

	render() {
		const navigation = this.props.navigation; 
		const image = navigation.getParam('picture', "require('./assets/RemnantsAppearPlate.png')");
		const audio = navigation.getParam('audio', 'audiotest0.mp3');
		
		const sound = new Sound(audio); 
		const myDuration = sound.getDuration; 
		const duration = myDuration.bind(sound); 



		return(
			<RemnantInteraction  
				image={image}
				audio={audio}
				sound={sound}
				duration={duration}
			/>
		)
	}
}




class RemnantInteraction extends Component {
	constructor({props}){
		super(props); 
		this.state = {
			pressFade: new Animated.Value(1),
		};
	};

		fade = ( ) => {			
			console.log("fade duration " + this.props.duration()); 

			Animated.timing(this.state.pressFade, {
				toValue: 0,
				duration: this.props.duration() * 1000,
				easing: Easing.out(Easing.cubic)
				}).start();
			this.props.sound.play(); 
		}


		stopFade = ( ) => {
			Animated.timing(this.state.pressFade, {
				toValue: 0,
				duration: this.props.duration()  * 1000,
			}).stop();	
			
			this.props.sound.pause(); 
			

			this.props.sound.getCurrentTime((seconds) => {
				let remaining =  this.props.duration() - seconds;
				console.log( "elapsed " + seconds + "\nremaining " + remaining );
			})
		}		


	render() {
		let { image } = this.props; 
		let { pressFade } = this.state;

	return (
		<Animated.View >
			<TouchableWithoutFeedback 
				onPressIn={this.fade} 
				onPressOut={this.stopFade}>
				<Animated.Image 
					source={image}
					style={[styles.remnantImage, {opacity: pressFade}]} />
			</TouchableWithoutFeedback>
		</Animated.View>

		);
	}
}



const styles = StyleSheet.create({
	remnantImage: {
		resizeMode: "cover",
		height: height,
		width: width,
	},

})
