import React, { Component } from 'react';
import ReactNative, {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Animated
} from 'react-native';
import Sound from "react-native-sound";

import { ENGLISH, HINDI } from '../config';

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';

import pageStyles, { A, H3, Em, Bull, P, Strong, BullHeader, BullHeaderMain } from "./styles.js";
import { Button } from "../component/Button.js";
import HelpTalk, { stopTalking } from "../component/HelpTalk";


const HelpIcons = {
    home: require("../assets/help/home-24px_default.png"),
    share: require("../assets/help/submit_video-24px_default.png"),
    remnants: require("../assets/help/remnants-24px_default.png")
}

const HelpAudio = {
    home: require("../assets/audio/sound.mp3")
}

const PlayingIcon = HelpTalk  // require("../assets/help/record_voice_over_playing-24px_default.png");
const ListenIcon =   //require("../assets/help/audio_help-24px_default.png");

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

const translations = {
    [ENGLISH]: {
        home: {
            title: 'Objects',
            audio: '',
            text: () => (
                <View>
                    <P>Explore stories of the invisible women of Delhi as told by them.</P>
                    <P>
                        <Strong>Objects:</Strong> To play a video clip, select one of the 
                        Objects at the top of the page. Each video will feature the women in 
                        the photograph, and will relate in some way to the Object you selected.
                    </P>
                    <P>
                        <Strong>More Objects:</Strong> You can see more stories
                        by tapping the arrows ({'< >'}) or swiping to the left or right. 
                    </P>
                </View>                
            )
        },
        share: {
            title: 'Share Your Video Story',
            audio: '',
            text: () => (
                <P>
                    Record a video on your phone and share your own story. By sharing more 
                    strategies you will help other women arm themselves and reclaim the city.
                </P>
            )
        },
        remnants: {
            title: 'Remnants',
            audio: '',
            text: () => (
                <View>
                    <P>
                        After viewing 2 videos a new choice (Fork & Knife icon) becomes available 
                        in the navigation bar at the bottom of the screen. Tapping the icon brings 
                        you to the “Remnants” section. Remnants are a collage of images of leftovers 
                        from meals which the women shared while talking of their memories and 
                        experiences of the city.
                    </P>
                    <P>
                        <Strong>Tiles:</Strong> Select a tile from the collage to see a larger version 
                        of the tile. Press and Hold  (INSERT press and hold icon here) to hear a short 
                        story. Keep holding to hear the entire story. As the audio plays, the remnant 
                        tile will fade. If you listen to the entire message, then when you return to 
                        the Remnants page you will start to see something revealed behind the tiles. 
                        Listen to all the remnants to reveal the entire hidden image.
                    </P>
                </View>
            )
        },
        settings: {
            title: 'Settings',
            audio: '',
            text: () => (
                <P>
                    Choose your preferred language
                    अंग्रेजी या हिंदी भाषा चुनें 
                </P>
            )

        },
        resources: {
            title: 'Resources',
            audio: '',
            text: () => (
                <View>
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
                    <P><Em>Support Groups</Em></P>
                    <P>Helplines (India)    http://ncw.nic.in/frmhelpline.aspx</P>
                    <P>Self defense        https://www.slaponline.org/</P>
                    <P>Film for Change    https://krititeam.blogspot.com/</P>
                    <P>Visit www.aashiyaan.org for more...</P>
                </View>
            )
        },
        about: {
            title: 'About',
            audio: '',
            text: () => (
                <P>(See Settings)</P>
            )
        },
        credits: {
            title: 'Credits',
            audio: '',
            text: () => (
                <P>(link to Credits in Settings)</P>
            )
        },
        contact: {
            title: 'Contact',
            audio: '',
            text: () => (
                <P>Email us at idoc.conversations@gmail.com</P>
            )
        },
    },
    [HINDI]: {
        home: {
            title: 'होम',
            audio: '',
            text: () => (
                <View>
                    <P>दिल्ली में रहने वाली महिलाओं की अदृश्य जीवनियों को देखें।</P>
                    <P>
                        <Strong>वस्तु:</Strong> वीडियो क्लिप चलाने के लिए, स्क्रीन के ऊपरी 
                        हिस्से से मनचाही वस्तु का चयन करें। प्रत्येक वीडियो आपको फोटोग्राफ़ में दर्शायी 
                        महिलाओं की कहानियाँ  दिखाएगा, और आपके द्वारा चुनी गयी वस्तु से संबंधित होगा।
                    </P>
                    <P>
                        आप स्क्रीन पर दर्शाये हुए तीरों को टैप* करके (&lt;&gt;) या बाएं या दाएं स्वाइप** 
                        करके और भी कहानियां देख सकते हैं।
                    </P>
                    <P><Em>*टैप: उंगली से एक बार दबाकर उठाना।</Em></P>
                    <P><Em>**स्वाइप: उंगली से दबाकर किसी दिशा में खींचना।</Em></P>
                </View>
            ),
        },
        share: {
            title: 'अपना वीडियो शामिल करें',
            audio: '',
            text: () => (
                <P>
                    अपने फ़ोन पर वीडियो रिकॉर्ड करें और अपनी कहानी भेजें | अपने अलग-अलग उपाय आपस में 
                    बाँटने से महिलाएं ख़ुद को सशक्त बना सकती हैं और शहर का निस्संकोच हिस्सा बन सकती हैं | 
                </P>
            )
        },
        remnants: {
            title: 'निशान',
            audio: '',
            text: () => (
                <View>
                    <P>
                        किन्हीं २ वीडियो को देखने के बाद स्क्रीन के निचले भाग में नेविगेशन बार में एक नया विकल्प 
                        (कांटे और छूरी का चिन्ह) उपलब्ध होता है | चिन्ह पर टैप करने से आपको "निशान" अध्याय 
                        में ले जाया जायेगा। निशान उस भोजन की तस्वीरों का संयोजन है जो महिलाओं की यादों और 
                        शहर में उनके अनुभवों की बातचीत करते समय परोसा गया था।
                    </P>
                    <P>
                        <Strong>टाइलें:</Strong> तस्वीरों के सांचे में से किसी भी तस्वीर को बड़ा करके देखने के 
                        लिए उस चित्र यानी टाइल को चुनें। उंगली दबाकर रखने पर महिलाओं की बातचीत सुनाई देगी। 
                        पूरी कहानी सुनने के लिए  टाइल पर उंगली दबाकर रखें। जैसे-जैसे कहानी बढ़ेगी वह टाइल फ़ीका 
                        पड़ता जायेगा। अगर आप पूरे संदेश को सुनते हैं तब निशान नामक पृष्ठ पर वापस जाने से आप 
                        उस टाइल के पीछे कुछ प्रकट होता पाएंगे। इस छिपी हुई छवि को प्रकट करने के लिए सभी 
                        निशानों की कहानी को सुनना होगा।
                    </P>
                </View>
            )
        },        
        settings: {
            title: 'सेटिंग्स',
            audio: '',
            text: () => (
                <P>
                    अंग्रेजी या हिंदी भाषा चुनें 
                    Choose your preferred language
                </P>
            )

        },        
        resources: {
            title: 'अन्य उपाय और कहानियाँ',
            audio: '',
            text: () => (
                <View>
                    <P><Em>और जानने में दिलचस्पी ?</Em></P>
                    <P>
                        सह-निर्माता और उनकी दिल्ली शहर सम्बन्धी कहानियों और अनुभवों के बारे में 
                        अधिक जानने के लिए www.aashiyaan.org पर जाएं।
                    </P>
                    <P><Em>मैं कैसे मदद कर सकती/सकता हूँ?</Em></P>
                    <Bull>सोशल मीडिया पर #AashiyaanStories के साथ अपनी पसंदीदा कहानियाँ (विशेष रूप से उपाय) प्रचलित करें| इससे अन्य लोग भी नए उपाय सीखेंगे, और अपनी कहानी का योगदान कर शहर को अपना सा बना पाएंगे।</Bull>
                    <Bull>गृहणियों और घरेलू श्रमिकों के साथ अपने शहर के अनुभवों और सुरक्षित रहने के उपायों  के बारे में अपने घर या आँगन में बातचीत का आयोजन करें। बातचीत का आयोजन करने के तरीकों के अलावा चर्चा के फ़ोटो और वीडियो को हमारी वेबसाइट [http://www.aashiyaan.org/] पे शामिल करने के लिए हमसे संपर्क करें।</Bull>
                    <Bull>हमारे यूट्यूब चैनल [https://www.youtube.com/playlist?list=PLTXq6Eg-6vhrYDlEKZVYURf1JOSoHkRJz] पर जायेँ और अपनी स्थानीय भाषा में अनुवाद करें। बातचीत जारी रखें!</Bull>
                    <P><Strong>सहायता</Strong></P>
                    <P>हेल्पलाइन (भारत)        http://ncw.nic.in/frmhelpline.aspx</P>
                    <P>आत्मरक्षा        https://www.slaponline.org/</P>
                    <P>परिवर्तन के लिए फिल्में     https://krititeam.blogspot.com/</P>
                    <P>अधिक जानकारी के लिए पर www.aashiyaan.org जायें </P>
                </View>
            )
        },    
        about: {
            title: 'ऐप के बारे में जानें',
            audio: '',
            text: () => (
                <P>(See Settings)</P>
            )
        },
        credits: {
            title: 'आभार',
            audio: '',
            text: () => (
                <P>(link to Credits in Settings)</P>
            )
        },
        contact: {
            title: 'ईमेल',
            audio: '',
            text: () => (
                <P>idoc.conversations@gmail.com पर ईमेल भेजकर हमसे संपर्क करें |</P>
            )
        },
    },
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
        
        let selectedLang = global.LANG || HINDI,
            localizedText = translations[selectedLang]

        return (
            <ScrollView ref={scroller => { this._scroller = scroller; }}
                        style={style}
                        onLayout={ this.onLayout }
                        stickyHeaderIndices={children.map((_, i) => i*2)}>
                {React.Children.map(children, (section) => {
                     let {title} = section.props,
                         icon = HelpIcons[section.key],
                         iconComponent = icon && (<Image source={icon} style={styles.sectionIcon}/>),
                         active = soundKey === section.key,
                         sectionBody = localizedText[section.key].text() || (<Text>(Not found)</Text>)
                         sectionTitle = localizedText[section.key].title;

                     return [
                         (<View style={styles.sectionHead} key={`${section.key}-head`}>
                             {iconComponent}
                             <H3 style={styles.sectionTitle}>
                                 { sectionTitle }
                             </H3>
                             <HelpTalk />
                             <HelpTalk 
                                    image={active && soundPlaying ? PlayingIcon : ListenIcon}
                                    style={styles.listenButton}
                                    imageStyle={[styles.listenButtonImageStyle,
                                                  active && soundLoading && styles.listenButtonImageLoadingStyle]}
                                    onPress={() => this.playSound(section.key)}
                             />
                         </View>),
                         (<View ref={section.key}
                            style={[styles.section, {minHeight: pageHeight}]}
                            key={`${section.key}-body`}>
                            { sectionBody }
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

const sectionLookup = {
    Chooser: 'home',
    Player: 'share',
    RemnantChooser: 'remnants',
    RemnantDisplay: 'remnants',
    About: 'resources',
    Settings: 'home',
}

export default class HelpPage extends Component {
    static navigationOptions = ({screenProps}) => ({
        tabBarOnPress: (scene, jumpToIndex) => {
            console.log('arriving at help page from', screenProps.previousTabScreen)
            scene.navigation.navigate('Help',{previousTabScreen: screenProps.previousTabScreen})
        }
    })

    componentDidUpdate(prevProps) {
        let prevScreen = this.props.navigation.getParam('previousTabScreen', 'Home')
        this.props.selected = sectionLookup[prevScreen]
    }

    render() {
        let {navigation} = this.props,
            prevScreen = navigation.getParam('previousTabScreen', 'Home'),
            section = sectionLookup[prevScreen],
            gotoSection = (section) => { navigation.setParams({ section: section })};
            
        let SLink = ({children, s}) => (
            <A onPress={() => navigation.setParams({ section: s })}>{children}</A>);
        

        return (
            <SectionedScroller selected={section}
                               style={{backgroundColor: "white"}}>
                <Section key="home"></Section>
                <Section key="share"></Section>
                <Section key="remnants"></Section>
                <Section key="resources"></Section>
                <Section key="about"></Section>
                <Section key="credits"></Section>
                <Section key="contact"></Section>
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
