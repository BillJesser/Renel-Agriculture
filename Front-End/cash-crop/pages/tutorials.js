import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';

const backgroundImage = require('../assets/farmer1.jpeg');
const cornImage = require('../assets/corn.png');
const soybeanImage = require('../assets/soybean.jpg');
const groundnutImage = require('../assets/groundnut.png');  // Add the groundnut image
const riceImage = require('../assets/rice.jpg');  // Add the rice image

export default function TutorialsScreen({ navigation }) {
    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
            <View style={styles.overlay}>
                <Text style={styles.title}>₵ash Crop</Text>
                <Text style={styles.subtitle}>Tutorials</Text>

                <View style={styles.gridContainer}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Corn')} style={styles.button}>
                            <Image source={cornImage} style={styles.image} />
                            <Text style={styles.buttonText}>Corn</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Soybeans')} style={styles.button}>
                            <Image source={soybeanImage} style={styles.image} />
                            <Text style={styles.buttonText}>Soybeans</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Groundnut')} style={styles.button}>
                            <Image source={groundnutImage} style={styles.image} />
                            <Text style={styles.buttonText}>Groundnut</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Rice')} style={styles.button}>
                            <Image source={riceImage} style={styles.image} />
                            <Text style={styles.buttonText}>Rice</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imageOpacity: {
        opacity: 0.5,
    },
    overlay: {
        flex: 1,
        width: '100%',
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
        marginBottom: 30,
        color: '#080',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingHorizontal: '10%',
    },
    buttonContainer: {
        width: '45%',  // Adjust this width for spacing between buttons
        marginVertical: 10,
        alignItems: 'center',
    },
    button: {
        width: 150,  // Adjusted size for grid layout
        height: 150,  // Adjusted size for grid layout
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 2,
        borderColor: '#080',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
    },
    image: {
        width: 110,  // Adjusted size for smaller buttons
        height: 110,  // Adjusted size for smaller buttons
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
