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


import pageStyles, { A, H2, Bull, P, Strong } from "./styles.js";


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
