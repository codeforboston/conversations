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

import pageStyles, { A, H2, Bull, P, Strong } from "./styles.js";


const ProjectDescription = {
    [HINDI]: () => (
        <ScrollView>
            <P>
                आशियाँ | Aashiyaan एक इंटरैक्टिव मोबाइल डॉक्यूमेंट्री फ़िल्म है जिसे घरेलू श्रमिकों, गृहणियों  और दिल्ली की एक फिल्म निर्माता द्वारा सह-निर्मित किया गया है।इंटरैक्टिव डाक्यूमेंट्री वह होती है  जिस में आप स्वयं, अपनी पसंद की कहानी का चयन कर सकते हैं और अपनी कहानी भी उस में शामिल कर सकते हैं | भारत में फिल्मायी गयी यह डॉक्यूमेंटरी विभिन्न मीडिया (मोबाइल फ़ोन, इंटरनेट इत्यादि) के ज़रिये नई दिल्ली (भारत) में फ़िल्मकारों, स्वयंसेवकों, हैकर्स (कम्प्यूटर की दुनिया के जुगाड़ू) और मित्रों के सहयोग तथा रायरसन और यॉर्क विश्वविद्यालय (कैनडा); कोड फॉर बोस्टन (अमेरिका) और एम.आई.टी. की ओपन डॉक्यूमेंट्री लैब (अमेरिका) के सहयोग से बनी है।

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
        <H2>Acknowledgements</H2>
        <P>
            The following people/organizations have contributed to this project.
        </P>
        <Bull>Name 1</Bull>
        <Bull>Name 2</Bull>
        <Bull>Name 3</Bull>
        <Bull>Name 4</Bull>
        <Bull>Name 5</Bull>
        <P>
            The source code is <A href="https://github.com/codeforboston/conversations">available online</A>
        </P>
    </ScrollView>
);

export default class AboutPage extends Component {
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

AboutPage.navConfig = {
    screen: AboutPage,

    navigationOptions: ({navigation}) => ({
        headerStyle: pageStyles.header,
        headerTitle: "About this Project"
    })
}
