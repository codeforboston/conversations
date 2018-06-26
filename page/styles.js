import React, { Component } from 'react';
import { Linking, PixelRatio, StyleSheet, Text } from 'react-native';


export const H2 = ({style, children}) => (
    <Text style={[styles.bodyText, styles.h2, style]}>
        {children}
    </Text>
);

export const H3 = ({style, children}) => (
    <Text style={[styles.bodyText, styles.h3, style]}>
        {children}
    </Text>
);

export const P = ({children}) => {
    return (
        <Text style={styles.bodyText}>
            { children }
        </Text>
    )};

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

let fr = PixelRatio.get();

const styles = StyleSheet.create({
    header: {
        color: "red",
        fontWeight: "100"
    },

    h2: {
        fontSize: 16 * fr,
        lineHeight: 22 * fr,
    },

    h3: {
        fontSize: 12 * fr
    },

    bodyText: {
        fontSize: 10 * fr,
        lineHeight: 14 * fr,
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
        fontSize: 15 * fr,
        lineHeight: 20 * fr,
        padding: 15,
        textAlign: "justify"
    },

    bullHeaderMain: {
        fontSize: 16 * fr,
        lineHeight: 20 * fr,
        paddingTop: 19,
        textAlign: "justify"
    }
});

export default styles;
