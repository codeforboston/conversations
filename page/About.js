import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import { ENGLISH, HINDI } from "../config";

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';
import pageStyles, { A, H2, Bull, P, Strong, BullHeader,BullHeaderMain } from "./styles.js";


const ProjectDescription = {
    [HINDI]: () => (
        <ScrollView>
            <P>
                आशियाँ | <Strong>Aashiyaan</Strong> एक इंटरैक्टिव मोबाइल डॉक्यूमेंट्री फ़िल्म है जिसे घरेलू श्रमिकों, गृहणियों  और दिल्ली की एक फिल्म निर्माता द्वारा सह-निर्मित किया गया है।इंटरैक्टिव डाक्यूमेंट्री वह होती है  जिस में आप स्वयं, अपनी पसंद की कहानी का चयन कर सकते हैं और अपनी कहानी भी उस में शामिल कर सकते हैं | भारत में फिल्मायी गयी यह डॉक्यूमेंटरी विभिन्न मीडिया (मोबाइल फ़ोन, इंटरनेट इत्यादि) के ज़रिये नई दिल्ली (भारत) में फ़िल्मकारों, स्वयंसेवकों, हैकर्स (कम्प्यूटर की दुनिया के जुगाड़ू) और मित्रों के सहयोग तथा रायरसन और यॉर्क विश्वविद्यालय (कैनडा); कोड फॉर बोस्टन (अमेरिका) और एम.आई.टी. की ओपन डॉक्यूमेंट्री लैब (अमेरिका) के सहयोग से बनी है।

            </P>
            <P>
                यह डॉक्यूमेंटरी दिल्ली की 'अदृश्य' महिलाओं के जीवन और अनुभवों का एक जीवित संग्रह है। यह कई आकार लेता है। एक इंटरैक्टिव मोबाइल ऐप के ज़रिए आप इन महिलाओं की असुरक्षित शहरी क्षेत्रों में रहने, चलने और अपनी राह बनाने की बातचीत में शामिल हो सकते हैं | आप एक ऑडियो-विज़ुअल गैलरी (चित्र और संवाद) के ज़रिये इन महिलाओं की उम्मीदों, यादों और आकांक्षाओं का अनुभव कर सकते हैं |    

            </P>
            <P>
                यदि आप इन महिलाओं के बारे में और जानना चाहते हैं और उनकी आंखों से शहर का अनुभव करना चाहते हैं आप अपनी यात्रा का चयन कर सकते हैं या YouTube पर हमारे इंटरैक्टिव संग्रह पर जा सकते हैं। आप यह भी देख सकते हैं कि ये सह-निर्माता अपनी रोज़ मर्रा की ज़िन्दगी के दौरान  फ़िल्मकार कैसे बनीं?

            </P>
            <P>
            जब शहरों को असुरक्षित महसूस किया जाता है, तब महिलायें आंकड़ों और पीड़ितों के रूप में दिखाई देती हैं। आशियाँ | Aashiyaan इस कथन को विभिन्न वर्गों की महिलाओं के अनुभव के माध्यम से चुनौती देता है। इन महिलाओं द्वारा किए गए घरेलू श्रम, फ़िल्मी श्रम, उनके रचनात्मक श्रम को आकार देते हैं क्योंकि वे वार्तालाप स्थापित करते हैं, उनकी जीवनियाँ दर्शाते हैं और कभी कभी नाचते मोर दिखाते है। आशियाँ | Aashiyaan का मतलब घोंसला,  घर ... अपनी स्वयं की व्यक्तिगत दुनिया है।
            </P>
        </ScrollView>
    ),

    [ENGLISH]: () => (
        <ScrollView>
            <P>
                <Strong>Aashiyaan</Strong> is an interactive mobile documentary that has been co-created by domestic workers, homemakers and a filmmaker from Delhi. Filmed entirely in India, the transmedia project was developed with support from artists, volunteers, hackers and friends in New Delhi, India; Ryerson and York Universities, Canada; <A href="http://codeforboston.org">Code for Boston, USA</A> and the <A href="http://opendoclab.mit.edu">Open Documentary Lab</A> at MIT, USA.
            </P>
            <P>
                When cities are labelled unsafe, women appear as statistics and victims.  This documentary is a living archive of the lives and experiences of the 'invisible' women of Delhi. It invites viewers to listen to and participate in women’s conversations about how they navigate unsafe urban geographies
            </P>
        </ScrollView>
    )
}


const ProjectCredits = () => (
    <ScrollView>

        <BullHeader> Co-creators | सह-रचनाकार </BullHeader> 
        <Bull> Deepa </Bull>
        <Bull> Gurvinder </Bull>
        <Bull> Jaskeerat </Bull>
        <Bull> Manorama </Bull>
        <Bull> Pushpa </Bull>
        <Bull> Reeta </Bull>
        <Bull> Sangeeta </Bull>
        <Bull> Shahina  </Bull>


        <BullHeader> Co-creator Allies |  सह-रचनाकार सहायक </BullHeader>
        <Bull> Aryan </Bull>
        <Bull> Adiba </Bull>
        <Bull> Anju </Bull>
        <Bull> Niharika </Bull>
        <Bull> Payal </Bull>
        <Bull> Preeti </Bull>
        
        <BullHeader> Team Delhi (Film) | टीम दिल्ली (फ़िल्म) </BullHeader>

        <Bull> Abhishek </Bull> 
        <Bull> Alisha </Bull>
        <Bull> Aoun </Bull>
        <Bull> Nagma </Bull>
        <Bull> Saugata </Bull>
        <Bull> Subhash </Bull>
        <Bull> Umang </Bull>


        <BullHeaderMain> Team Boston | टीम बोस्टन </BullHeaderMain>
        <BullHeader> Developers | डेवलपर </BullHeader>
        <Bull> Andrew  </Bull>
        <Bull> Brian  </Bull>
        <Bull> Byron  </Bull>
        <Bull> Kalen  </Bull>
        <Bull> Liam  </Bull>
        <Bull> Liani  </Bull>
        <Bull> Michelle  </Bull>
        <Bull> Ranjani  </Bull>
        <Bull> Sasha  </Bull>
        <Bull> Steve  </Bull>


        <BullHeader> UI/UX | यू. आई./ यू. एक्स </BullHeader>
        <Bull> David </Bull>
        <Bull> Kristine </Bull>
        <Bull> Lizao </Bull>
        <Bull> Mel </Bull>

        <BullHeader> Illustrator | चित्रकार </BullHeader>
        <Bull> Nika </Bull>


        <BullHeader> Editing | संपादन </BullHeader>
        <Bull> Ellie  </Bull>
        <Bull> Mike </Bull>
        <Bull> Sasha </Bull>
        <Bull> (Chief Editor) </Bull>


        <BullHeader> Translators | अनुवादक </BullHeader>
        <Bull> Ankit </Bull>
        <Bull> Akshaya </Bull>
        <Bull> Alisha </Bull>
        <Bull> Arjun </Bull>
        <Bull> Anusha</Bull> 
        <Bull> Anchita </Bull>
        <Bull> Anusha </Bull>
        <Bull> Bidisha </Bull>
        <Bull> Kavita </Bull>
        <Bull> Kush </Bull>
        <Bull> Isha </Bull>
        <Bull> Priyanka </Bull>
        <Bull> Ranjani</Bull> 
        <Bull> Rashmi </Bull>
        <Bull> Rohan </Bull>
        <Bull> Shweta </Bull>
        <Bull> Sudeshna </Bull>
        <Bull> Taiyaba </Bull>
        <Bull> Tatheer</Bull> 
        <Bull> Vidya </Bull>


        <BullHeader> Institutional Partner | संस्थागत सहयोगी </BullHeader>
        <Bull> Code for Boston </Bull>


        <BullHeader> Institutional Support | संस्थागत समर्थन </BullHeader>
        <Bull> Open Documentary Lab, MIT </Bull>
        <Bull> Jamia Millia Islamia </Bull>
        <Bull> Shastri Indo Canadian Institute </Bull>
        <Bull> The Fulbright Association </Bull>
        <Bull> The Ryerson University </Bull>
        <Bull> York University </Bull>


        <BullHeader> Principal Academic Advisors | प्राथमिक शैक्षिक सलाहकार </BullHeader>
        <Bull> Krisna Sankar Kusuma (India) </Bull>
        <Bull> William Uricchio (USA) </Bull>


        <BullHeader> Project Advisors | प्रोजैक्ट सलाहकार </BullHeader>
        <Bull> Aanchal Kapur </Bull>
        <Bull> Alisa Lebow </Bull>
        <Bull> Tony Dowmunt </Bull>
        <Bull> Sarah Wolozin </Bull>


        <BullHeader>Curator/Creator | क्यूरेटर/ रचनाकार </BullHeader>
        <Bull> Anandana Kapur </Bull>


        <BullHeader> © GPL2 2018</BullHeader>
        <BullHeader>  Access code: <A href="https://github.com/codeforboston/conversations">here</A> </BullHeader>

    </ScrollView>
);

export default class AboutPage extends Component {
    static navigationOptions = ({screenProps}) =>({
        tabBarOnPress: (scene, jumpToIndex) => {
          console.log(screenProps.previousTabScreen)
          console.log("FROM ABOUT")
          scene.navigation.navigate('About')
        }
    })

    render() {
        let Description = ProjectDescription[global.LANG || HINDI];

        return (
            <IndicatorViewPager style={styles.container}
                                indicator={<PagerDotIndicator pageCount={2}/>}>
                <View>
                    <Description />
                </View>
                <View>
                    <ProjectCredits/>
                </View>
            </IndicatorViewPager>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

