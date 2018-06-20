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
		const audio = navigation.getParam('audio', 'audiotest3.mp3');
		
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
			pressHint: new Animated.Value(1),
			delayAppearance: new Animated.Value(0),
		};
	}

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


		pressHinter = () => {
			Animated.sequence([
				Animated.timing(this.state.delayAppearance, {
					toValue: 1, 
					duration: 500,
					delay: 2000,	
				}),
				Animated.timing(this.state.pressHint, {
					toValue: 0.8,  
					duration:1000,
					easing: Easing.out(Easing.cubic)
				}),
				Animated.spring(this.state.pressHint, {
					toValue: 1.1, 
					friction: 4
				})
			]).start( () => setTimeout(this.pressHinter, 1000) )
		}

		componentDidMount = () => { this.pressHinter }


	render() {
		let { image } = this.props; 
		let { pressFade, pressHint, delayAppearance } = this.state;

	return (
			<View>
			<Animated.View >
				<TouchableWithoutFeedback 
					onPressIn={this.fade} 
					onPressOut={this.stopFade}>
					<Animated.Image 
						source={ image }
						style={[ styles.remnantImage, {opacity: pressFade} ]} />
				</TouchableWithoutFeedback>
				<PressAndHold 
					transform={ [{scale: pressHint}] }
					opacity={delayAppearance} 
				/>
			</Animated.View>
		</View>

		);
	}
}





class PressAndHold extends Component {
	constructor({props}){
		super(props); 
		this.state = {}
	}


	render(){

		let { transform, delayAppearance } = this.props; 

		return (
			<Animated.View style={styles.pressHold}>
			<Animated.Image 
				source={require("./assets/pointandtouchlarge.png")}
				style={[styles.pointer, {transform: transform }, {opacity: delayAppearance} ]}
				resizeMode="contain"
			/>	
			</Animated.View>
		)
	}
}


//have icon appear at 2s, move at 3s
//incorporate mike's changes

const styles = StyleSheet.create({
	remnantImage: {
		resizeMode: "cover",
		height: height,
		width: width,
	},
	pressHold: {	
		flex: 1, 
		position: 'absolute', 
		flexDirection: 'column', 	
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
		height: height, 
		width: width,
	},
	pointer: {
		height: height/3,
		width: width/3,
		marginBottom: '10%',
	},
})
