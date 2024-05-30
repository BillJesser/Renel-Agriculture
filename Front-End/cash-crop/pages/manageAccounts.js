import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Button } from 'react-native';

const financeImage = require('../assets/finances.png');
const manageAccountsImage = require('../assets/settings.jpg');
const tutorialsImage = require('../assets/corn.png');

export default function AdminDashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>₵ash Crop</Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => alert('Finances pressed')}>
          <View style={styles.buttonContent}>
            <Image source={financeImage} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Finances</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={() => alert('Tutorials pressed')}>
          <View style={styles.buttonContent}>
            <Image source={tutorialsImage} style={styles.buttonImage} />
            <Text style={styles.buttonText}>Tutorials</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.buttonContainer} onPress={() => alert('Manage Accounts pressed')}>
        <View style={styles.buttonContent}>
          <Image source={manageAccountsImage} style={styles.buttonImage} />
          <Text style={styles.buttonText}>Manage Accounts</Text>
        </View>
      </TouchableOpacity>

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
    marginBottom: 50,
    color: '#080',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
    justifyContent: 'center',
  },
  buttonContainer: {
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
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  logoutButtonContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
});

