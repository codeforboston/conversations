import React from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    StatusBar,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';

import { homeScreenImage, ENGLISH, HINDI } from './config';

import Settings, { withSettings } from "./Settings.js";


const HomeScreen = withSettings(class extends React.Component {
    constructor(props) {
        super(props);
        let {width, height} = Dimensions.get("window");
        this.state = {
            width: width,
            height: height - StatusBar.currentHeight,
        };
    }
    handlePress = (lang) => {
        this.props.settings.storeSetting("language", lang);
        this.props.navigation.navigate("Chooser");
    }

    onLayout = (e) => {
        let {width, height} = e.nativeEvent.layout;
        this.setState({width, height});
    }

    render () {
        let {navigation, settings} = this.props,
            {pressing, width, height} = this.state,
            selected = pressing || settings.language;

        let titleImage = require('./assets/Aashiyaan.png');
        let languageImageEnglish =
            selected === ENGLISH ?
            require('./assets/AppLandingEnglishSelected.png') :
            require('./assets/AppLandingEnglish.png');
        let languageImageHindi =
            selected === HINDI ?
            require('./assets/AppLandingHindiSelected.png') :
            require('./assets/AppLandingHindi.png');
        let titleWidth = 0.51 * width;
        let titleHeight = 0.6 * titleWidth;

        return (
            <ImageBackground
                onLayout={this.onLayout}
                source={ homeScreenImage }
                imageStyle={{resizeMode: 'cover'}}
                style={{flex: 1, width: width, height: height}}
            >
                <ImageBackground
                    source={ titleImage }
                    resizeMode='contain'
                    style={{
                        width: titleWidth,
                        height: titleHeight,
                        position: 'absolute',
                        left: '43%',
                        bottom: '15%',
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'stretch'
                    }}
                >
                    <TouchableHighlight
                        onPress={() => this.handlePress(ENGLISH)}
                        onPressIn={() => { this.setState({ pressing: ENGLISH }); }}
                        underlayColor="transparent"
                        style={{
                            padding: 0.1 * titleWidth,
                            position:'relative'
                        }}
                    >
                        <Image source={languageImageEnglish}
                               style={{
                                   width: 0.2 * titleWidth,
                                   height: 0.2 * titleWidth,
                                   position:'relative',
                                   top:'40%'
                               }}
                        />
                    </TouchableHighlight>
                    <TouchableHighlight
                        onPress={() => this.handlePress(HINDI)}
                        onPressIn={() => { this.setState({ pressing: HINDI }); }}
                        underlayColor="transparent"
                        style={{
                            padding: 0.1 * titleWidth,
                            position:'relative'
                        }}
                    >
                        <Image source={languageImageHindi} style={{
                            width: 0.2 * titleWidth,
                            height: 0.2 * titleWidth,
                            position:'relative',
                            top:'80%'
                        }} />
                    </TouchableHighlight>

                </ImageBackground>

            </ImageBackground>
        )
    }
})

export default HomeScreen;
