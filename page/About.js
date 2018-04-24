import React, { Component } from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';

import {IndicatorViewPager, PagerDotIndicator} from 'rn-viewpager';


import pageStyles, { A, H2, Bull, P, Strong, BullHeader,BullHeaderMain } from "./styles.js";


const ProjectDescription = () => (
    <ScrollView>
        <P>
            <Strong>Aashiyaan</Strong> is an interactive mobile documentary that has been co-created by domestic workers, homemakers and a filmmaker from Delhi. Filmed entirely in India, the transmedia project was developed with support from artists, volunteers, hackers and friends in New Delhi, India; Ryerson and York Universities, Canada; <A href="http://codeforboston.org">Code for Boston, USA</A> and the <A href="http://opendoclab.mit.edu">Open Documentary Lab</A> at MIT, USA.
        </P>
        <P>
            When cities are labelled unsafe, women appear as statistics and victims.  This documentary is a living archive of the lives and experiences of the 'invisible' women of Delhi. It invites viewers to listen to and participate in women’s conversations about how they navigate unsafe urban geographies
        </P>
    </ScrollView>
);

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
    render() {
        return (
            <IndicatorViewPager style={styles.container}
                                indicator={<PagerDotIndicator pageCount={2}/>}>
                <View>
                    <ProjectDescription/>
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
