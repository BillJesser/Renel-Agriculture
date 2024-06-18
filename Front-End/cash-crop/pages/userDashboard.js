import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ImageBackground } from 'react-native';

const backgroundImage = require('../assets/farmer1.jpeg');
const financeImage = require('../assets/finances.png');
const tutorialsImage = require('../assets/corn.png');

export default function DashboardScreen({ navigation }) {
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <View style={styles.overlay}>
        <Text style={styles.title}>₵ash Crop</Text>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Finances')}>
          <View style={[styles.buttonContent, styles.buttonOutline]}>
            <Image source={financeImage} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Finances</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Tutorials')}>
          <View style={[styles.buttonContent, styles.buttonOutline]}>
            <Image source={tutorialsImage} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Tutorials</Text>
          </View>
        </TouchableOpacity>

        <View style={styles.logoutButtonContainer}>
          <Button title="Logout" onPress={() => navigation.navigate('Home')} color="#080" />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#080',
  },
  buttonContainer: {
    width: '80%',
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#080',
  },
  buttonImage: {
    width: 150,
    height: 100,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#080',
  },
  logoutButtonContainer: {
    width: '80%',
    marginTop: 40,
  },
});