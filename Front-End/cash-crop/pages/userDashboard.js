import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ImageBackground } from 'react-native';

// Importing background and button images
const backgroundImage = require('../assets/farmer1.jpeg');
const financeImage = require('../assets/finances.png');
const tutorialsImage = require('../assets/corn.png');

export default function DashboardScreen({ navigation }) {
  return (
    // Background image setup
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <View style={styles.overlay}>
        {/* Title of the dashboard */}
        <Text style={styles.title}>₵ash Crop</Text>

        {/* Finances button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Finances')}>
          <View style={[styles.buttonContent, styles.buttonOutline]}>
            <Image source={financeImage} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Finances</Text>
          </View>
        </TouchableOpacity>

        {/* Tutorials button */}
        <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Tutorials')}>
          <View style={[styles.buttonContent, styles.buttonOutline]}>
            <Image source={tutorialsImage} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Tutorials</Text>
          </View>
        </TouchableOpacity>

        {/* Logout button */}
        <View style={styles.logoutButtonContainer}>
          <Button title="Logout" onPress={() => navigation.navigate('Home')} color="#080" />
        </View>

        {/* User tutorial link */}
        <TouchableOpacity style={styles.tutorialLinkContainer} onPress={() => navigation.navigate('UserTutorial')}>
          <Text style={styles.tutorialLinkText}>User Tutorial</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

// Styles for the dashboard component
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,  // Spacing below the title
    color: '#080',  // Title color
  },
  buttonContainer: {
    width: '80%',  // Width of each button container
    marginVertical: 10,  // Vertical margin between buttons
    alignItems: 'center',  // Center align items
  },
  buttonContent: {
    alignItems: 'center',  // Center align button content
    backgroundColor: 'rgba(255, 255, 255, 0.8)',  // Button background with opacity
    borderRadius: 10,  // Button border radius
    paddingVertical: 20,  // Vertical padding inside button
    paddingHorizontal: 10,  // Horizontal padding inside button
  },
  buttonOutline: {
    borderWidth: 2,
    borderColor: '#080',  // Border color of the button
  },
  buttonImage: {
    width: 150,  // Width of the image inside the button
    height: 100,  // Height of the image inside the button
    marginBottom: 10,  // Spacing below the image
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',  // Text alignment inside the button
    color: '#080',  // Text color of the button
  },
  logoutButtonContainer: {
    width: '80%',  // Width of the logout button container
    marginTop: 40,  // Top margin for the logout button
  },
  tutorialLinkContainer: {
    marginTop: 10,  // Top margin for the tutorial link
  },
  tutorialLinkText: {
    fontSize: 16,
    color: 'blue',  // Color of the tutorial link text
    textDecorationLine: 'underline',  // Underline style for the text
  },
});

