import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text, ImageBackground } from 'react-native';
import { IpContext } from '../IpContext'; // Import the context
const backgroundImage = require('../assets/farmer1.jpeg');

const AddAdmin = () => {
  const [username, setUsername] = useState('');
  const [adminID, setAdminID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const ip = useContext(IpContext); // Access the IP address

  const handleRegister = () => {
    if (!username || !adminID || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const newAdmin = { username, adminID, password };

    fetch(`http://${ip}/add_admin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newAdmin),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (data.success) {
          Alert.alert('Success', 'Admin has been registered successfully');
          setUsername('');
          setAdminID('');
          setPassword('');
          setConfirmPassword('');
          setError('');
        } else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Admin ID must be unique. Please try again.');
      });
  };

  // Function to handle admin ID input
  const handleAdminIDChange = (text) => {
    const numericValue = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    setAdminID(numericValue);
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Add Admin</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Admin ID"
          value={adminID}
          onChangeText={handleAdminIDChange}
          keyboardType="numeric" // Ensures numeric keyboard
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry={true}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <Button title="Register" onPress={handleRegister} color="#080" />
      </View>
    </ImageBackground>
  );
};

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

export default AddAdmin;
