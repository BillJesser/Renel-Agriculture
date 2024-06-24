// Import necessary modules and components from React and React Native
import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { IpContext } from '../IpContext'; // Import the context for IP address

const backgroundImage = require('../assets/farmer1.jpeg'); // Background image

const AccountInfo = ({ route, navigation }) => {
  // Extract memberID and username from route parameters
  const { memberID, username } = route.params;

  // Define state variables for user inputs and errors
  const [memberIDInput, setMemberIDInput] = useState(memberID);
  const [usernameInput, setUsernameInput] = useState(username);
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [error, setError] = useState('');
  const ip = useContext(IpContext); // Get IP address from context

  // Function to handle saving user information
  const handleSave = async () => {
    if (passwordInput !== confirmPasswordInput) { // Check if passwords match
      setError('Passwords do not match');
      return;
    }

    // Prepare updated information
    const updatedInfo = {
      memberID: memberIDInput,
      ...(usernameInput !== username && { username: usernameInput }), // Update username if changed
      ...(passwordInput.trim() && { password: passwordInput }), // Update password if provided
    };

    try {
      // Send POST request to update user information
      const response = await fetch(`http://${ip}/update_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInfo),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', data.message); // Show success message

        // Update state variables if username was changed
        if (data.updatedUsername) {
          setUsernameInput(data.updatedUsername);
        }
        // Clear password fields
        setPasswordInput('');
        setConfirmPasswordInput('');
      } else {
        setError(data.error || 'Failed to update information'); // Show error message
      }
    } catch (error) {
      console.error('Error:', error); // Log error
      setError('Failed to update information'); // Show error message
    }
  };

  // Function to handle deleting user
  const handleDelete = async () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this user?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              // Send DELETE request to delete user
              const response = await fetch(`http://${ip}/delete_user/${memberID}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              const data = await response.json();
              if (response.ok) {
                Alert.alert('Success', data.message); // Show success message
                navigation.goBack(); // Navigate back
              } else {
                setError(data.error || 'Failed to delete user'); // Show error message
              }
            } catch (error) {
              console.error('Error:', error); // Log error
              setError('Failed to delete user'); // Show error message
            }
          },
        },
      ]
    );
  };

  return (
    // Display background image
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Update Member Information</Text>
        <TextInput
          style={styles.input}
          value={memberIDInput}
          onChangeText={setMemberIDInput}
          placeholder="Member ID"
          editable={false} // Member ID is not editable
        />
        <TextInput
          style={styles.input}
          value={usernameInput}
          onChangeText={setUsernameInput}
          placeholder="Username"
        />
        <TextInput
          style={styles.input}
          value={passwordInput}
          onChangeText={setPasswordInput}
          placeholder="Update Password"
          secureTextEntry // Hide password input
        />
        <TextInput
          style={styles.input}
          value={confirmPasswordInput}
          onChangeText={setConfirmPasswordInput}
          placeholder="Confirm Password"
          secureTextEntry // Hide confirm password input
        />
        {error ? <Text style={styles.error}>{error}</Text> : null} // Display error message if any
        <View style={styles.buttonContainer}>
          <View style={styles.fullWidthButton}>
            <Button title="Save" onPress={handleSave} color="#080" /> // Save button
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.fullWidthButton}>
            <Button title="Delete User" color="red" onPress={handleDelete} /> // Delete button
          </View>
        </View>
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
  buttonContainer: {
    width: '100%',
    marginTop: 16,
  },
  fullWidthButton: {
    width: '100%',
  },
  deleteButtonContainer: {
    marginTop: 16,
    width: '100%',
  },
});

export default AccountInfo; // Export the component as default
