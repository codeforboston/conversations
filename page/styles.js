import React from 'react';
import { Linking, StyleSheet, Text, PixelRatio, View} from 'react-native';

const pr = PixelRatio.get();

export const H2 = ({children}) => (
    <Text style={[styles.bodyText, styles.h2]}>
        {children}
    </Text>
);

export const P = ({children}) => (
    <Text style={styles.bodyText}>
        { children}
    </Text>
);

export const A = ({children, href}) => (
    <Text style={styles.link} onPress={() => Linking.openURL(href)}>
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

export const BullHeader = ({children}) => (
    <Text style={[styles.bullHeader, styles.bodyText, styles.liText, styles.bold, styles.center]}>
        {children}
    </Text>
);

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
        fontSize: 18,
        lineHeight: 25,
        color: 'rgb(43, 35, 103)'
        /* textDecorationColor: "#ddd",
         * textDecorationLine: "underline" */
    },

    bodyText: {
        fontSize: 6*pr,
        lineHeight: 20,
        padding: 15,
        textAlign: "justify"
    },

    liText: {
        paddingLeft: 20,
        paddingTop: 0
    },

    bold: {
        fontWeight: "bold"
    },

    link: {
        color: "#4682b4",
        textDecorationLine: "underline"
    },

    center: {
        textAlign: 'center'
    }, 

    bullHeader: {
        fontSize: 15,
        lineHeight: 20,
        padding: 15,
        textAlign: "justify"
    },

    bullHeaderMain: {
        fontSize: 16,
        lineHeight: 20,
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
    }
});

export default styles;
