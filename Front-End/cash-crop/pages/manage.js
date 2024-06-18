import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground } from 'react-native';

const backgroundImage = require('../assets/farmer1.jpeg');
const editImage = require('../assets/edit.png');
const computerImage = require('../assets/computer.jpg');
const addClientImage = require('../assets/addclient.jpg');

export default function ManageScreen({ navigation }) {
    return (
        <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
            <View style={styles.overlay}>
                <Text style={styles.title}>₵ash Crop</Text>
                <Text style={styles.subtitle}>Manage accounts</Text>
                <View style={styles.buttonRow}>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Add Client')}>
                            <View style={styles.button}>
                                <Image source={addClientImage} style={styles.image} />
                                <Text style={styles.buttonText}>Add new client</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('Add Admin')}>
                            <View style={styles.button}>
                                <Image source={computerImage} style={styles.image} />
                                <Text style={styles.buttonText}>Add new admin</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.singleButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('Edit User')}>
                        <View style={styles.button}>
                            <Image source={editImage} style={styles.image} />
                            <Text style={styles.buttonText}>Edit user</Text>
                        </View>
                    </TouchableOpacity>
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
    buttonRow: {
        flexDirection: 'row',
        marginBottom: 20,
        width: '100%',
        justifyContent: 'space-between',
    },
    buttonContainer: {
        marginHorizontal: 5,
        alignItems: 'center',
    },
    singleButtonContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 20,
    },
    button: {
        width: 160, // Decreased width
        height: 160, // Decreased height
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderWidth: 2,
        borderColor: '#080',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
    },
    image: {
        width: 120, // Decreased image size
        height: 120, // Decreased image size
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