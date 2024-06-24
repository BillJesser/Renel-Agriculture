import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';

// Importing background and tutorial images
const backgroundImage = require('../assets/farmer1.jpeg');
const cornImage = require('../assets/corn.png');
const soybeanImage = require('../assets/soybean.jpg');
const groundnutImage = require('../assets/groundnut.png');  // Added groundnut image
const riceImage = require('../assets/rice.jpg');  // Added rice image

export default function TutorialsScreen({ navigation }) {
    return (
        // Background image setup
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
            <View style={styles.overlay}>
                <Text style={styles.title}>₵ash Crop</Text>
                <Text style={styles.subtitle}>Tutorials</Text>

                {/* Grid container for tutorial buttons */}
                <View style={styles.gridContainer}>
                    {/* Corn tutorial button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Corn')} style={styles.button}>
                            <Image source={cornImage} style={styles.image} />
                            <Text style={styles.buttonText}>Corn</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Soybeans tutorial button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Soybeans')} style={styles.button}>
                            <Image source={soybeanImage} style={styles.image} />
                            <Text style={styles.buttonText}>Soybeans</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Groundnut tutorial button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Groundnut')} style={styles.button}>
                            <Image source={groundnutImage} style={styles.image} />
                            <Text style={styles.buttonText}>Groundnut</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Rice tutorial button */}
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
        opacity: 0.5,  // Opacity of the background image
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
        color: '#080',  // Title color
    },
    subtitle: {
        fontSize: 30,
        fontWeight: 'bold',
        marginBottom: 30,
        color: '#080',  // Subtitle color
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',  // Full width of the screen
        paddingHorizontal: '10%',  // Horizontal padding for spacing
    },
    buttonContainer: {
        width: '45%',  // Adjusted width for spacing between buttons
        marginVertical: 10,  // Vertical margin for button spacing
        alignItems: 'center',
    },
    button: {
        width: 150,  // Size of each button
        height: 150,  // Size of each button
        backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Button background color with opacity
        borderWidth: 2,
        borderColor: '#080',  // Border color
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,  // Button border radius
        padding: 10,  // Padding inside the button
    },
    image: {
        width: 110,  // Size of the image inside the button
        height: 110,  // Size of the image inside the button
        resizeMode: 'contain',  // Image resizing mode
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 8,
        color: '#080',  // Text color of the button
        textAlign: 'center',  // Text alignment
    },
});

