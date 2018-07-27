import React, { Component } from "react";
import {
    Animated,
    Image,
    Text,
    TouchableHighlight,
    TouchableOpacity
} from "react-native";
import  _  from 'lodash';


const layers = [require("../assets/HelpTalk/help_talk_anim_0000_Layer-1.png"),
                require("../assets/HelpTalk/help_talk_anim_0001_Layer-2.png"),
                require("../assets/HelpTalk/help_talk_anim_0002_Layer-3.png")]



export default class HelpTalk extends Component {
    constructor(props){
        super(props); 
        this.state = {
            playing: false, 
            layer: 2,
        };
    }
    
    onComponentDidUnmount() {
        clearTimeout(this._showTalking);
    }

    onComponentDidMount() {
        this.showTalking(); 
    }

    showTalking = () => {
        this.setState({ layer: 0 });
        console.log("I'm on layer", this.state.layer);
        setTimeout(() => { this.setState({ layer: 1 }), console.log("show Talking layer", this.state.layer), this.keepTalking() } , 1000);
    }

    keepTalking = () => {
        setTimeout(() => {this.setState({ layer: 2}, console.log("Keep talking layer", this.state.layer)), this.goOn()}, 1000);
    }

    goOn = () => {
        console.log("go on", this.state.layer); 
        this._showTalking = setTimeout(this.showTalking, 1000); 
    }

    stopTalking = () => {
        clearTimeout(this._showTalking);
    }
    
    onPress = () => {
        console.log("I got pressed");
        this.playing ? this.stopTalking : this.showTalking;
    }


    render(){
     const helpLayer = layers[this.state.layer];
        return (
           <TouchableHighlight 
                onPress={this.showTalking}>
                    <Image 
                        source={helpLayer}
                        />
            </TouchableHighlight>
        )
    }
    

}








