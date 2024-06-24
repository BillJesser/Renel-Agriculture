import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native'; // Import hook for navigation focus events
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage for local storage
import { IpContext } from '../IpContext'; // Import the IP context

const farmerImage = require('../assets/farmer1.jpeg'); // Import background image
const renelImage = require('../assets/renellogo.png'); // Import logo image

export default function HomeScreen({ navigation }) {
  // State variables
  const [password, setPassword] = useState('');
  const [memberId, setMemberId] = useState('');
  const [loading, setLoading] = useState(false); // Loading state for async operations
  const ip = useContext(IpContext); // Access the IP address from context

  // Reset memberId and password on focus (using useFocusEffect hook)
  useFocusEffect(
    useCallback(() => {
      setPassword('');
      setMemberId('');
    }, [])
  );

  // Function to handle login button press
  const handleLogin = async () => {
    if (!password || !memberId) {
      Alert.alert('Error', 'Member ID and password are required');
      return;
    }

    setLoading(true); // Set loading state to true

    try {
      // Fetch login data from server
      const response = await fetch(`http://${ip}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, memberId }),
      });

      const data = await response.json(); // Parse response JSON

      setLoading(false); // Set loading state to false after fetch

      // Handle successful login
      if (data.message === 'Login successful.') {
        await AsyncStorage.setItem('memberID', data.memberId); // Store memberId in AsyncStorage
        await AsyncStorage.setItem('username', data.username); // Store username in AsyncStorage

        // Navigate based on user type
        if (data.user_type === 'Admin') {
          navigation.navigate('AdminDashboard'); // Navigate to admin dashboard
        } else if (data.user_type === 'Client') {
          navigation.navigate('Dashboard'); // Navigate to client dashboard
        }
      } else {
        Alert.alert('Error', 'Incorrect member ID or password');
      }
    } catch (error) {
      setLoading(false); // Set loading state to false in case of error
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.'); // Display error alert
    }
  };

  // Function to handle changes in member ID input
  const handleMemberIdChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setMemberId(numericValue); // Update memberId state
  };

  // Component render method
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

        {/* Member ID input field */}
        <TextInput
          style={styles.input}
          placeholder="Member ID"
          placeholderTextColor="#888"
          value={memberId}
          onChangeText={handleMemberIdChange}
          keyboardType="numeric" // Ensure numeric keyboard
        />
        {/* Password input field */}
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry // Secure text entry for password
          value={password}
          onChangeText={setPassword}
        />

        {/* Conditional rendering based on loading state */}
        {loading ? (
          <ActivityIndicator size="large" color="#080" /> // Show loading indicator
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

        {/* Navigation links */}
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.register}>Register an Account</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('LoginTutorial')}>
          <Text style={styles.tutorial}>Login Tutorial</Text>
        </TouchableOpacity>
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
    opacity: 0.25, // Opacity for background image
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
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#080', // Green color for the title
  },
  subtitle: {
    fontSize: 22,
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Background color for input field
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
  register: {
    color: 'blue',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  tutorial: {
    color: 'blue',
    marginTop: 10,
    textDecorationLine: 'underline',
  },
});
