import React from 'react';
import { Linking, StyleSheet, Text, PixelRatio, View, Dimensions} from 'react-native';


//measured from phone
export const pr = PixelRatio.get();
export const height = Dimensions.get("window").height;
export const width = Dimensions.get("window").width;

//our color palette
const darkestBlue = "rgb(43, 35, 103)"; // backgrounds, buttons, text on white
const linkBlue = "#4682b4"; // for links only
const lightBlue = "rgb(43, 35, 103)";
const ourWhite = "rgb(255, 255, 255)";

export const color = {
  background: darkestBlue,
  insetFrame: ourWhite,
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



export const BackgroundImage = ({style, source}) => (
  <Image
    source={source}
    resizeMode='cover'
    style={[styles.image, style]}
  />
)

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

export const H1 = ({children}) => (
  <Text style={styles.h1}>{children}
  </Text>
);

export const H2 = ({style, children}) => (
    <Text style={styles.h2}>
        {children}
    </Text>
);

export const H3 = ({style, children}) => (
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
    {children.map(t => t.toUpperCase())}
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

const styles = StyleSheet.create({
    header: {
        color: "red",
        fontWeight: "100"
    },

    horizontalLine: {
        borderBottomColor: color.rules,
        borderBottomWidth: 1,
        marginTop: 9*pr,
        marginBottom: 9*pr,
    },

    h1: {
      fontSize: 48 * pr * adjustmentFactor,
      fontWeight: "700",
      lineHeight: 48 * pr * adjustmentFactor * 1.3,
      letterSpacing: 0.5 * pr, 
      marginTop: 12 * pr,
      marginBottom: 4 * pr,
      textAlign: "justify",
      color: color.darkText,
    },

    h2: {
        fontSize: 34 * pr * adjustmentFactor,
        fontWeight: "300",
        lineHeight: 34 * pr * adjustmentFactor * 1.3,
        textAlign: "justify",
        color: color.darkText
    },

    h3: {
        fontSize: 34 * pr * adjustmentFactor,
        fontWeight: "500",
        lineHeight: 34 * pr * adjustmentFactor * 1.3,
        marginTop: 8 * pr,
        marginBottom: 8 * pr,
        textAlign: "left",
        color: color.darkText
    },

    insetText:{
      padding: 10*pr,
      paddingLeft: 10*pr,
      paddingRight: 18*pr,
      paddingBottom: 10*pr,
    },

    insetView: {
      flex: 1,
      backgroundColor: "white",
      marginRight: width*0.1,
      marginLeft: width*0.1,
      marginTop: height*0.05,
      paddingRight: width*0.08,
      paddingLeft: width*0.08,
      paddingBottom: width*0.18,
    },
    
    bodyText: {
        fontSize: 30 * pr * adjustmentFactor,
        lineHeight: 30 * pr * adjustmentFactor * 1.8,
        fontWeight: "100", 
        letterSpacing: 0.05 * pr,
        marginBottom: 34 * pr * adjustmentFactor,
        textAlign: "justify",
        color: color.darkText
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

});

export default styles;
