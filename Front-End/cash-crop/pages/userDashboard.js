import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';

const financeImage = require('../assets/finances.png');
const tutorialsImage = require('../assets/corn.png');

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
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

      <View style={styles.logoutButtonContainer}>
        <Button title="Logout" onPress={() => navigation.navigate('Home')} />
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
    marginBottom: 100,
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
    borderWidth: 2,
    borderColor: '#080',
    borderRadius: 10,
    padding: 10,
  },
  buttonImage: {
    width: 150,
    height: 100,
    marginBottom: 10, // space between image and text
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButtonContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center', // center align the logout button
  },
});