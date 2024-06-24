import React, { useState, useContext } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, ImageBackground, Image, ActivityIndicator, Alert } from 'react-native';
import { IpContext } from '../IpContext'; // Import the context

// Importing background and logo images
const farmerImage = require('../assets/farmer1.jpeg');
const renelImage = require('../assets/renellogo.png');

export default function RegisterScreen({ navigation }) {
  // State variables for form inputs and loading state
  const [username, setUsername] = useState('');
  const [memberId, setMemberId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false); // Define the loading state
  const ip = useContext(IpContext); // Access the IP address

  // Function to handle registration process
  const handleRegister = async () => {
    // Validate form inputs
    if (!username || !memberId || !password) {
      Alert.alert('Error', 'Username, Member ID, and password are required');
      return;
    }

    if (username && memberId && password && !confirmPassword) {
      Alert.alert('Error', 'Please confirm your password');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      const url = `http://${ip}/register`;

      // Send registration request to server
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, memberId, password }),
      });

      const data = await response.json();
      setLoading(false); // Reset loading state

      // Handle registration success or failure
      if (response.ok) {
        Alert.alert('Success', data.message);
        navigation.navigate('Home');
      } else {
        Alert.alert('Error', data.error);
      }
    } catch (error) {
      setLoading(false); // Reset loading state
      console.error('An error occurred during registration:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  // Function to handle member ID input and restrict to numeric characters
  const handleMemberIdChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setMemberId(numericValue);
  };

  return (
    <ImageBackground
      source={farmerImage}
      style={styles.backgroundImage}
      imageStyle={styles.imageOpacity}
    >
      <View style={styles.overlay}>
        <Image source={renelImage} style={styles.logo} />
        <Text style={styles.title}>Register</Text>
        <Text style={styles.subtitle}>Create a new account</Text>

        {/* Username input field */}
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#888"
          value={username}
          onChangeText={setUsername}
        />

        {/* Member ID input field */}
        <TextInput
          style={styles.input}
          placeholder="Member ID"
          placeholderTextColor="#888"
          value={memberId}
          onChangeText={handleMemberIdChange}
          keyboardType="numeric" // Ensures numeric keyboard
        />

        {/* Password input field */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {/* Confirm Password input field */}
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {/* Conditional rendering of loading indicator or register button */}
        {loading ? (
          <ActivityIndicator size="large" color="#080" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleRegister}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOpacity: {
    opacity: 0.25, // Increase the opacity value to make the background image more faded
  },
  overlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 270,
    height: 270,
    resizeMode: 'contain',
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#080', // Green color for the title
  },
  subtitle: {
    fontSize: 20,
    color: '#080', // Green color for the subtitle
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  button: {
    backgroundColor: '#080', // Green color for the button
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
