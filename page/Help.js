import React, { Component } from 'react';
import ReactNative, {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Sound from "react-native-sound";

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

import pageStyles, { A, H3, Em, Bull, P, Strong, BullHeader, BullHeaderMain } from "./styles.js";
import { Button } from "../component/Button.js";


const HelpIcons = {
    home: require("../assets/help/home-24px_default.png"),
    share: require("../assets/help/submit_video-24px_default.png"),
    remnants: require("../assets/help/remnants-24px_default.png")
}

const HelpAudio = {
    home: require("../assets/audio/sound.mp3")
}

const PlayingIcon = require("../assets/help/record_voice_over_playing-24px_default.png");
const ListenIcon = require("../assets/help/audio_help-24px_default.png");

function withSound(name) {
    return new Promise(function(resolve, reject) {
        let sound = new Sound(name, (error) => {
            if (error) {
                reject(sound, error);
            } else {
                resolve(sound);
            }
        })
    });
}


export class SectionedScroller extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageHeight: 500,
            soundKey: null,
            soundPlaying: null,
            soundLoading: null
        };
    }

    _scrollTo(name, animated=false) {
        let child = this.refs[name];

        if (child != null) {
            let nodeHandle = ReactNative.findNodeHandle(this._scroller);
            child.measureLayout(nodeHandle, (_x, y) => {
                this._scroller.scrollTo({x: 0, y: y-30, animated: animated});
            }, (error) => {
                console.log(error);
            })
        }
    }

    stopSound() {
        let {soundPlaying} = this.state;

        if (!soundPlaying) return;

        soundPlaying.stop();
        this.setState({
            soundKey: null,
            soundPlaying: null
        });
    }

    onPlayingComplete(success, name, sound) {
        if (this.state.soundKey === name) {
            this.setState({
                soundKey: null,
                soundPlaying: null
            });
        }
    }

    playSound(key) {
        console.log(`Play sound: ${key}`);
        let {state} = this;

        if (state.soundPlaying) {
            this.stopSound();

            if (state.soundKey === key)
                return;
        }

        this.setState({ soundKey: key, soundLoading: true });
        withSound(HelpAudio.home)
            .then((sound) => {
                console.log(sound);
                if (this.state.soundKey !== key) return;

                console.log("boop");
                sound.play((success) => {
                    this.onPlayingComplete(success, key, sound)
                });
                this.setState({
                    soundPlaying: sound
                })
            })
            .finally(() => {
                if (this.state.soundKey === key)
                    this.setState({ soundLoading: false });
            })
    }

    onLayout = (e) => {
        this.setState({ pageHeight: e.nativeEvent.layout.height });

        if (this.props.selected)
            this._scrollTo(this.props.selected);
    }

    componentDidUpdate(prevProps) {
        console.log('updated props, navigated from ' + this.props.selected)
        // never evaluates to true?
        // if (this.props.selected && prevProps.selected !== this.props.selected)
            this._scrollTo(this.props.selected, true);
    }

    componentWillUnmount() {
        this.stopSound();
    }

    render() {
        let {children, style} = this.props,
            {pageHeight, soundKey, soundLoading, soundPlaying} = this.state;

        return (
            <ScrollView ref={scroller => { this._scroller = scroller; }}
                        style={style}
                        onLayout={ this.onLayout }
                        stickyHeaderIndices={children.map((_, i) => i*2)}>
                {React.Children.map(children, (section) => {
                     let {title} = section.props,
                         icon = HelpIcons[section.key],
                         iconComponent = icon && (<Image source={icon} style={styles.sectionIcon}/>),
                         active = soundKey === section.key;

                     return [
                         (<View style={styles.sectionHead} key={`${section.key}-head`}>
                             {iconComponent}
                             <H3 style={styles.sectionTitle}>
                                 { section.props.title }
                             </H3>
                             <Button image={active && soundPlaying ? PlayingIcon : ListenIcon}
                                     style={styles.listenButton}
                                     imageStyle={[styles.listenButtonImageStyle,
                                                  active && soundLoading && styles.listenButtonImageLoadingStyle]}
                                     onPress={() => this.playSound(section.key)}
                             />
                         </View>),
                         (<View ref={section.key}
                                style={[styles.section, {minHeight: pageHeight}]}
                                key={`${section.key}-body`}>
                             { section.props.children }
                         </View>)
                     ];
                })}
                {children}
            </ScrollView>
        );
    }
}


// Placeholder
const Section = (props) => (<Text/>);


export default class HelpPage extends Component {
    static navigationOptions = ({screenProps}) => ({
        tabBarOnPress: (scene, jumpToIndex) => {
            console.log('arriving at help page from', screenProps.previousTabScreen)
            scene.navigation.navigate('Help',{previousTabScreen: screenProps.previousTabScreen})
        }
    })

    componentDidUpdate(prevProps) {
        this.props.selected = this.props.navigation.getParam('previousTabScreen')
    }

    render() {
        let {navigation} = this.props,
            section = navigation.getParam('previousTabScreen', 'Home'),
            gotoSection = (section) => { navigation.setParams({ section: section })};
            
        let SLink = ({children, s}) => (
            <A onPress={() => navigation.setParams({ section: s })}>{children}</A>);

        return (
            <SectionedScroller selected={section}
                               style={{backgroundColor: "white"}}>
                <Section title="Home" key="Chooser">
                    <P>
                        <Strong>Objects:</Strong> To play a video clip, select
                        one of the Objects at the top of the page. Each video will feature
                        the women in the photograph, and will relate in some way to the
                        Object you selected.
                    </P>
                    <P>
                        <Strong>More Objects:</Strong> You can see more stories
                        by tapping the arrows ({'< >'}) or swiping to the left or right. 
                    </P>
                    <P>
                        <Strong>Remnants:</Strong> After viewing 2 videos a new
                        choice becomes available in the navigation bar at the bottom of the
                        screen. (See <SLink s="remnants">Remnants</SLink> section).
                    </P>
                </Section>
                <Section title="Share Your Video Story" key="Player">
                    <P>
                        Share your own story. By sharing more strategies you will
                        help other women arm themselves and reclaim the city.
                    </P>
                    <P>
                        <Strong>Recording Video:</Strong> (generic how to & links to 3rd-party
                        advice?)
                    </P>
                    <P>
                        <Strong>Uploading Video:</Strong> (find your video on your phone & upload)
                    </P>
                    <P>
                        <Strong>Deleting Video:</Strong> (how to request to have your video removed)
                    </P>
                    <P>
                        <Strong>Notification:</Strong> (is there such a thing? how do they know
                        video has been deleted?)
                    </P>
                </Section>
                <Section title="Remnants" key="RemnantChooser">
                    <P>
                        <Strong>Objects:</Strong> To play a video clip, select
                        one of the Objects at the top of the page. Each video will feature
                        the women in the photograph, and will relate in some way to the
                        Object you selected.
                    </P>
                    <P>
                        <Strong>More Objects:</Strong> You can see more stories
                        by tapping the arrows or swiping to the left or right. 
                    </P>
                    <P>
                        <Strong>Remnants:</Strong> After viewing 2 videos a new
                        choice becomes available in the navigation bar at the bottom of the
                        screen. (See Remnants section). 
                    </P>
                </Section>
                <Section title="Resources" key="About">
                    <P><Em>I’m interested in knowing more</Em></P>
                    <P>
                        Visit <A href="http://www.aashiyaan.org">www.aashiyaan.org</A> to learn more
                        about the co-creators, their stories and experiences of the city of Delhi.
                    </P>

                    <P><Em>How Can I Help?</Em></P>
                    <P>
                        Share your favourite stories (especially strategies!)
                        with #AashiyaanStories on social media so others can also
                        watch, learn, contribute and reclaim the city.
                    </P>
                    <P>
                        Organize a living room or porch conversation with
                        homemakers and domestic workers about their city experiences
                        and strategies. Contact us for ideas and to share post
                        discussion photos and videos on our <A href="http://www.aashiyaan.org">website</A>.
                    </P>
                    <P>
                        Go to our <A href="https://www.youtube.com/playlist?list=PLTXq6Eg-6vhrYDlEKZVYURf1JOSoHkRJz">YouTube
                    channel</A> and add a translation in your local language. Let’s keep the conversation going!
                    </P>
                </Section>
            </SectionedScroller>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    section: {
        paddingLeft: 40
    },

    sectionHead: {
        backgroundColor: "white",
        borderTopColor: "#aaa",
        borderTopWidth: 1,
        flex: 1,
        flexDirection: "row",
    },

    sectionIcon: {
        height: 40,
        width: 40,
        position: "absolute",
        left: 0,
        top: 10
    },

    sectionTitle: {
        fontWeight: "bold",
        paddingLeft: 50
    },

    listenButton: {
        position: "absolute",
        right: 10,
        top: 10
    },

    listenButtonImageStyle: {
        height: 50,
        width: 50
    },

    listenButtonImageLoadingStyle: {
        opacity: 0.5
    }
})

HelpPage.navConfig = {
    screen: HelpPage,

    navigationOptions: ({navigation}) => ({
        headerStyle: pageStyles.header,
        headerTitle: "How to Use",
        initialRouteParams: { section: "home" }
    })
}
