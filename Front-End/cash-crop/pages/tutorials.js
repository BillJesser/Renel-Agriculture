import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

const cornImage = require('../assets/corn.png');
const soybeanImage = require('../assets/soybean.jpg');
const generalImage = require('../assets/general.jpg');

export default function TutorialsScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>₵ash Crop</Text>
            <Text style={styles.subtitle}>Tutorials</Text>

            <View style={styles.buttonRow}>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Corn')}>
                        <View style={styles.button}>
                            <Image
                                source={cornImage}
                                style={styles.image}
                            />
                            <Text style={styles.buttonText}>Corn</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={() => alert('Soybeans pressed')}>
                        <View style={styles.button}>
                            <Image
                                source={soybeanImage}
                                style={styles.image}
                            />
                            <Text style={styles.buttonText}>Soybeans</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.singleButtonContainer}>
                <TouchableOpacity onPress={() => alert('General pressed')}>
                    <View style={styles.button}>
                        <Image
                            source={generalImage}
                            style={styles.image}
                        />
                        <Text style={styles.buttonText}>General</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#080',
    },
    subtitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 50,
        color: '#080',
    },
    buttonRow: {
        flexDirection: 'row',
        marginBottom: 20,
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        marginHorizontal: 10,
        alignItems: 'center',
    },
    singleButtonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        width: 180, // Increased width
        height: 180, // Increased height
        backgroundColor: '#f0f0f0',
        borderWidth: 2,
        borderColor: '#080',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
    },
    image: {
        width: 140, // Decreased image size slightly to accommodate larger button
        height: 140, // Decreased image size slightly to accommodate larger button
        resizeMode: 'contain',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#080',
        textAlign: 'center',
    },
});
