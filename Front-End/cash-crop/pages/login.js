import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Alert, ImageBackground, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const farmerImage = require('../assets/farmer1.jpeg');
const renelImage = require('../assets/renellogo.png');

export default function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      // Reset username and password when screen is focused
      setUsername('');
      setPassword('');
    }, [])
  );

  const handleLogin = () => {
    // Perform validation, e.g., check if username and password are not empty
    if (!username || !password) {
      Alert.alert('Error', 'Username and password are required');
      return;
    }

    fetch('http://192.168.1.41:5000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.message === 'Login successful.') {
          // Check user type and navigate to the appropriate screen
          if (data.user_type === 'Admin') {
            navigation.navigate('AdminDashboard');
          } else if (data.user_type === 'Client') {
            navigation.navigate('Dashboard');
          }
        } else {
          // Show error message if login failed
          Alert.alert('Error', 'Incorrect username or password');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      });
  };

  return (
    <ImageBackground
      source={farmerImage}
      style={styles.backgroundImage}
      imageStyle={styles.imageOpacity}
    >
      <View style={styles.overlay}>
        <Image source={renelImage} style={styles.logo} />
        <Text style={styles.title}>₵ash Crop</Text>
        <Text style={styles.subtitle}>Agriculture Companion</Text>

        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={text => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />

        <Button
          title="Login"
          onPress={handleLogin}
        />

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.register}>Register an Account</Text>
        </TouchableOpacity>
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
    opacity: 0.3, // Adjust the opacity as needed
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 220, // Adjust the width as needed
    height: 220, // Adjust the height as needed
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#080',
  },
  subtitle: {
    fontSize: 20,
    color: '#080',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Slightly opaque background for readability
  },
  register: {
    color: 'blue',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
