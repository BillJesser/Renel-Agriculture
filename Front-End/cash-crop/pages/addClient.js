// Import necessary modules and components from React and React Native
import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, ImageBackground } from 'react-native';
import { IpContext } from '../IpContext'; // Import the context for IP address

const backgroundImage = require('../assets/farmer1.jpeg'); // Background image

const AddClient = () => {
  // Define state variables for user inputs and errors
  const [username, setUsername] = useState('');
  const [memberID, setMemberID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const ip = useContext(IpContext); // Get IP address from context

  // Function to handle registering a new client
  const handleRegister = () => {
    if (!username || !memberID || !password || !confirmPassword) { // Check if all fields are filled
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) { // Check if passwords match
      setError('Passwords do not match.');
      return;
    }

    // Prepare new client information
    const newUser = { username, memberID, password };

    // Send POST request to add new client
    fetch(`http://${ip}/add_client`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newUser),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          Alert.alert('Success', 'User has been registered successfully'); // Show success message
          // Clear input fields
          setUsername('');
          setMemberID('');
          setPassword('');
          setConfirmPassword('');
          setError('');
        } else {
          setError(data.message); // Show error message
        }
      })
      .catch(error => {
        console.error('Error:', error); // Log error
        setError('Member ID must be unique. Please try again.'); // Show error message
      });
  };

  // Function to handle member ID input and allow only numeric values
  const handleMemberIDChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setMemberID(numericValue); // Set member ID
  };

  return (
    // Display background image
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Add Client</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername} // Update username input
        />
        <TextInput
          style={styles.input}
          placeholder="Member ID"
          value={memberID}
          onChangeText={handleMemberIDChange} // Update member ID input
          keyboardType="numeric" // Ensures numeric keyboard
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword} // Update password input
          secureTextEntry={true} // Hide password input
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword} // Update confirm password input
          secureTextEntry={true} // Hide confirm password input
        />
        {error ? <Text style={styles.error}>{error}</Text> : null} 
        <Button title="Register" onPress={handleRegister} color="#080" /> 
      </View>
    </ImageBackground>
  );
};

// Define styles for the component
const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOpacity: {
    opacity: 0.3,
  },
  overlay: {
    flex: 1,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#080',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default AddClient; // Export the component as default
