import React, { Component } from 'react';
import {
	Animated,
	Easing,
	StyleSheet,
	TouchableWithoutFeedback,
	View,
} from 'react-native';
import Sound from 'react-native-sound';

import { withDimensions } from "./component/responsive.js";


const RemnantDisplay = withDimensions(class extends Component {
	render() {
		const {navigation, windowDimensions} = this.props;
		const image = navigation.getParam('picture', "require('./assets/RemnantsAppearPlate.png')");
		const audio = navigation.getParam('audio', 'remnant_1.mp3');

		const sound = new Sound(audio);
		const myDuration = sound.getDuration;
		const duration = myDuration.bind(sound);

		return(
			<RemnantInteraction
          width={windowDimensions.width}
          height={windowDimensions.height}
				image={image}
				audio={audio}
				sound={sound}
				duration={duration}
				navigation={navigation}
			/>
		)
	}
});

export default RemnantDisplay;



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
			this.props.sound.play((success) => {
                this.props.navigation.navigate("RemnantChooser");
   			});
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
		let { image, width, height } = this.props; 
		let { pressFade, pressHint, delayAppearance } = this.state;

	return (
			<View>
			<Animated.View >
				<TouchableWithoutFeedback 
					onPressIn={this.fade} 
					onPressOut={this.stopFade}>
					<Animated.Image 
						source={ image }
						style={[ styles.remnantImage, {width, height}, {opacity: pressFade} ]} />
				</TouchableWithoutFeedback>
				<PressAndHold 
            width={width}
            height={height}
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
		let { transform, delayAppearance, width, height } = this.props; 

		return (
        <Animated.View style={[styles.pressHold, {width, height}]}>
            <Animated.Image source={require("./assets/pointandtouchlarge.png")}
                            style={[styles.pointer,
                                    {transform, width: width/3, height: height/3},
                                    {opacity: delayAppearance} ]}
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
	},
	pressHold: {	
		flex: 1, 
		position: 'absolute', 
		flexDirection: 'column', 	
		alignItems: 'flex-end',
		justifyContent: 'flex-end',
	},
	pointer: {
		marginBottom: '10%',
	},
})
