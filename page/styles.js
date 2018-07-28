import React from 'react';
import { Linking, StyleSheet, Text, PixelRatio, View} from 'react-native';

const pr = PixelRatio.get();


export const H2 = ({style, children}) => (
    <Text style={[styles.bodyText, styles.h2, style]}>
        {children}
    </Text>
);

export const HMedium = ({style, children}) => (
    <Text style={[styles.bodyText, styles.hMedium, style]}>
        {children}
    </Text>
);

export const H3 = ({style, children}) => (
    <Text style={[styles.bodyText, styles.h3, style]}>
        {children}
    </Text>
);

export const ErrorBox = ({style, children}) => (
    <Text style={[styles.bodyText, styles.errorText, style]}>
        {children}
    </Text>
);

export const P = ({children, style}) => (
    <Text style={[styles.bodyText, style]}>
        { children }
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
        { children }
    </Text>
);

export const Bull = ({children}) => (
    <Text style={[styles.bodyText, styles.liText, styles.center]}>
        {children}
    </Text>
);

//header for bullets
export const BullHeader = ({children}) => (
    <Text style={[styles.bullHeader, styles.bodyText, styles.liText, styles.bold, styles.center]}>
        {children}
    </Text>
);

//an larger bullet header with slightly more spacing
export const BullHeaderMain = ({children}) => (
    <Text style={[styles.bullHeaderMain , styles.liText, styles.bold, styles.center]}>
        {children}
    </Text>
);

export const HR = () => (
    <View style={styles.horizontalLine}></View>
);

const styles = StyleSheet.create({
    header: {
        color: "red",
        fontWeight: "100"
    },

    horizontalLine: {
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        marginTop: 3*pr
    },

    h2: {
        fontSize: 14 * pr,
        lineHeight: 22 * pr,
        color: 'rgb(43, 35, 103)'
        /* textDecorationColor: "#ddd",
         * textDecorationLine: "underline" */
    },
    hMedium: {
         fontSize: 9*pr
    },

    bodyText: {
        fontSize: 6*pr,
        lineHeight: 20,
        padding: 15,
        textAlign: "justify"
    },

    errorText: {
        borderWidth: 1,
        borderColor: "maroon",
        padding: 10
    },

    liText: {
        paddingLeft: 20,
        paddingTop: 0
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
        lineHeight: 12*pr,
        width: 150
    },
    fontSize10: {
        fontSize: 7*pr
    },
    settingsRadioButton: {
        lineHeight: 10,
        alignSelf: 'flex-start'
    },

    PageTitle: {
      fontSize: 10 * pr
    }

});

export default styles;
