// LoginTutorial.js

import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function LoginTutorial() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login Tutorials</Text>
            <Text style={styles.text}>
                {/* Your tutorial content goes here */}
                Here you can explain how to login or any other related information.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        textAlign: 'center',
        color: '#333',
    },
});
