import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button, ImageBackground } from 'react-native';

const backgroundImage = require('../assets/farmer1.jpeg');
const financeImage = require('../assets/finances.png');
const tutorialsImage = require('../assets/corn.png');
const manageAccountsImage = require('../assets/settings.jpg');
const searchDatabaseImage = require('../assets/search.png');

export default function AdminDashboardScreen({ navigation }) {
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <View style={styles.overlay}>
        <Text style={styles.title}>₵ash Crop</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Finances')}>
            <View style={styles.buttonContent}>
              <Image source={financeImage} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Finances</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Tutorials')}>
            <View style={styles.buttonContent}>
              <Image source={tutorialsImage} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Tutorials</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Search')}>
            <View style={styles.buttonContent}>
              <Image source={searchDatabaseImage} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Search Database</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate('Manage')}>
            <View style={styles.buttonContent}>
              <Image source={manageAccountsImage} style={styles.buttonImage} />
              <Text style={styles.buttonText}>Manage Accounts</Text>
            </View>
          </TouchableOpacity>
        </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#080',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 10,
    alignItems: 'center',
  },
  buttonContent: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderWidth: 2,
    borderColor: '#080',
    borderRadius: 10,
    padding: 10,
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
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
});