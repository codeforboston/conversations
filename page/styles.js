import React from 'react';
import {
    Dimensions,
    Linking,
    Image,
    ImageBackground,
    PixelRatio,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import { withDimensions } from "../component/responsive.js";

//measured from phone
export const pr = PixelRatio.get();
export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

//our color palette
const darkestBlue = "rgb(43, 35, 103)"; // backgrounds, buttons, text on white
const linkBlue = "#4682b4"; // for links only
const lightBlue = "rgb(43, 35, 103)";
const ourWhite = "rgb(255, 255, 255)";
const chillBlue = "rgb(64, 75, 146)";

export const color = {
  background: darkestBlue,
  insetFrame: ourWhite,
  paragraphText: chillBlue,
  darkText: darkestBlue,
  rules: darkestBlue,
  buttons: {
      background: darkestBlue,
      text: ourWhite,
      selected: lightBlue,
  },
  links: linkBlue,
}

//background images
export const homeScreenImage = require('.././assets/BackgroundForAppLanding.png');

//fudge factors
adjustmentFactor = 0.19;

//grid lines
const leftSpacer= 20 * pr;
const rightSpacer = 20 * pr;
const leftGutter = 15 * pr;
const rightGutter = 15 * pr;


/* export const BackgroundImage = ({source}) => (
 *   <Image
 *     source={source || homeScreenImage}
 *     style={{backgroundColor: color.insetFrame}}
 *     resizeMode='cover'
 *     style={[styles.image]}
 *   />
 * ) */

export const BackgroundImage = ({source, style, children, imageStyle,
                                 screenDimensions, ... props}) => (
                                     <ImageBackground source={source || homeScreenImage}
                                                      imageStyle={[{resizeMode: "cover"}, imageStyle]}
                                                      style={[{flex: 1}, style]}>
                                         {children}
                                     </ImageBackground>
                                 );

export const TextContainer = ({style, children}) => (
  <Text style={[styles.bodyText, styles.textContainer, style]}>
    {children}
  </Text>
);

export const InsetView = ({children}) => (
  <View style={styles.insetView}>
      {children}
  </View>
);

export const InsetText = ({style, children}) => (
    <Text style={[styles.bodyText, styles.insetText, style]}>
        {children}
    </Text>
);

export const ScrollHeader = ({style, children}) => (
    <View style={[styles.scrollHeader, style]}>
        {children}
    </View>
);

export const H1 = ({children, cancelVertMargins}) => {
     return <Text style={[{cancelVertMargins}, styles.h1]}>{children}</Text>
};

export const H2 = ({children}) => (
    <Text style={styles.h2}>
        {children}
    </Text>
);

export const H3 = ({children}) => (
    <Text style={styles.h3}>
        {children}
    </Text>
);

export const P = ({children}) => (
  <Text style={styles.bodyText}>
    { children } {'\n'}
  </Text>
);

// H1 centered for centered lists
export const BullHeaderMain = ({children}) => (
  <Text style={[styles.h1, styles.center]}>
    {children}
  </Text>
);

// H3 centered for centered lists
export const BullHeader = ({children}) => (
  <Text style={[styles.h3, styles.center]}>
    {children}
  </Text>
);

// Body text centered for centered lists
export const Bull = ({children}) => (
  <Text style={[styles.bodyText, styles.center]}>
    {children}
  </Text>
);

export const HR = () => (
  <View style={styles.horizontalLine}></View>
);

export const icon = () => {

}
export const ErrorBox = ({style, children}) => (
    <Text style={[styles.bodyText, styles.errorText, style]}>
        {children}
    </Text>
);

export const A = ({children, href, onPress, style, ...props}) => (
    <Text style={[styles.link, style]} onPress={onPress || (() => Linking.openURL(href))}>
        { children }
    </Text>
);

export const Mail = ({children, href, onPress, style, ...props}) => (
    <Text style={[styles.link, style]} 
          onPress={ onPress || (() => {
            Linking.canOpenURL(href).then(supported => {
                if (!supported) {
                  console.log('Can\'t handle url: ' + href);
                } else {
                  return Linking.openURL(href);
                }
              }).catch(err => console.error('An error occurred', err));
          })
        }
    >
        { children }
    </Text>
)

export const Strong = ({children}) => (
    <Text style={styles.bold}>
        { children }
    </Text>
);

export const Em = ({children}) => (
    <Text style={styles.em}>
        {children}
    </Text>
);

export const PaddedImage = ({leftPad, rightPad, ...props}) => (
    <View style={{flex: 1, flexDirection: "row"}}>
        <View style={{width: leftPad || 5}}/>
        <Image {...props} />
        <View style={{width: rightPad || 5}}/>
    </View>
);

const styles = StyleSheet.create({
    header: {
        color: "red",
        fontWeight: "100"
    },

    horizontalLine: {
        borderBottomColor: color.rules,
        borderBottomWidth: 1,
        marginTop: 6*pr,
        marginBottom: 3*pr,
    },

    bodyText: {
        fontSize: 24 * pr * adjustmentFactor,
        lineHeight: 24 * pr * adjustmentFactor * 1.2,
        fontWeight: "100",
        letterSpacing: 0.05 * pr,
        marginBottom: 20 * pr * adjustmentFactor,
        textAlign: "justify",
        color: color.paragraphText,
    },
    h1: {
      fontSize: 48 * pr * adjustmentFactor,
      fontWeight: "700",
      lineHeight: 48 * pr * adjustmentFactor * 1.3,
      letterSpacing: 0.5 * pr,
      marginTop: 14 * pr,
      marginBottom: 4 * pr,
      textAlign: "justify",
      color: color.darkText,
    },

    h2: {
        fontSize: 28 * pr * adjustmentFactor,
        fontWeight: "300",
        lineHeight: 28 * pr * adjustmentFactor * 1.3,
        textAlign: "justify",
        color: color.darkText
    },

    h3: {
        fontSize: 28 * pr * adjustmentFactor,
        fontWeight: "500",
        lineHeight: 28 * pr * adjustmentFactor * 1.3,
        marginTop: 8 * pr,
        marginBottom: 8 * pr,
        textAlign: "left",
        color: color.darkText
    },

    insetArea:{
      marginLeft: leftSpacer,
      marginRight: rightSpacer,
      paddingLeft: leftGutter,
      paddingRight: rightGutter,
      backgroundColor: color.insetFrame
    },

    insetView: {
      flex: 1,
      marginTop: 10*pr,
    },

    scrollHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: leftSpacer / 2,
      paddingRight: leftSpacer,
      marginRight: leftSpacer,
      marginLeft: leftSpacer,
      backgroundColor: color.insetFrame,
      height: 30 * pr,
    },

    cancelVertMargins: {
        marginTop: 0,
        marginBottom: 0,
    },


    errorText: {
        borderWidth: 1,
        borderColor: "maroon",
        padding: 10
    },

    bold: {
        fontWeight: "bold"
    },

    em: {
        fontStyle: "italic"
    },

    link: {
        color: "#4682b4",
        textDecorationLine: "underline"
    },

    center: {
        textAlign: 'center'
    },

    sectionIcon: {
        height: 14 * pr,
        width: 14 * pr,
        margin: 4 * pr
    },
    
    listenButtonImageStyle: {
        height: 14*pr,
        width: 14*pr,
        margin: 4*pr,
    },
    
    bullHeader: {
        fontSize: 15 * pr,
        lineHeight: 20 * pr,
        padding: 15,
        textAlign: "justify"
    },

    bullHeaderMain: {
        fontSize: 16 * pr,
        lineHeight: 20 * pr,
        paddingTop: 19,
        textAlign: "justify"
    },

    // These are the Settings Page Styles . Merge in for the about page from here
    settingsRadioFormLabel: {
        lineHeight: 8*pr,
        width: 150,
        color: color.paragraphText,
        alignSelf: "flex-end",
    },

    settingsRadioButton: {
        lineHeight: 20*pr,
        alignSelf: 'flex-end'
    },

    PageTitle: {
      fontSize: 10 * pr
    },

    // dimensions: 1280 x 173, reducing to 1/5th
    screenshot: {
        flex: 1,
        resizeMode: 'contain',
        height: 35 * pr,
        alignSelf: "center",
    }
});

export default styles;
