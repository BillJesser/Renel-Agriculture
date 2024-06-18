import React, { useState, useContext } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, Text } from 'react-native';
import { IpContext } from '../IpContext'; // Import the context

const AddClient = () => {
  const [username, setUsername] = useState('');
  const [memberID, setMemberID] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const ip = useContext(IpContext); // Access the IP address

  const handleRegister = () => {
    if (!username || !memberID || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const newUser = { username, memberID, password };

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
          alert('Success', 'User has been registered successfully');
          setUsername('');
          setMemberID('');
          setPassword('');
          setConfirmPassword('');
          setError('');
        } else {
          setError(data.message);
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setError('Member ID Must Be Unique. Please try again.');
      });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Member ID"
        value={memberID}
        onChangeText={setMemberID}
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
      <Button title="Register" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
  },
  error: {
    color: 'red',
    marginBottom: 16,
  },
});

export default AddClient;