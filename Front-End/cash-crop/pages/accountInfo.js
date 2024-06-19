import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';
import { IpContext } from '../IpContext'; // Import the context

const backgroundImage = require('../assets/farmer1.jpeg');

const AccountInfo = ({ route, navigation }) => {
  const { memberID, username } = route.params;

  const [memberIDInput, setMemberIDInput] = useState(memberID);
  const [usernameInput, setUsernameInput] = useState(username);
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [error, setError] = useState('');
  const ip = useContext(IpContext);

  const handleSave = async () => {
    if (passwordInput !== confirmPasswordInput) {
      setError('Passwords do not match');
      return;
    }

    const updatedInfo = {
      memberID: memberIDInput,
      ...(usernameInput !== username && { username: usernameInput }),
      ...(passwordInput.trim() && { password: passwordInput }),
    };

    try {
      const response = await fetch(`http://${ip}/update_user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInfo),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', data.message);

        // Update username and clear passwords if successful
        if (data.updatedUsername) {
          setUsernameInput(data.updatedUsername);
        }
        setPasswordInput('');
        setConfirmPasswordInput('');
      } else {
        setError(data.error || 'Failed to update information');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to update information');
    }
  };

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
              const response = await fetch(`http://${ip}/delete_user/${memberID}`, {
                method: 'DELETE',
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              const data = await response.json();
              if (response.ok) {
                Alert.alert('Success', data.message);
                navigation.goBack();
              } else {
                setError(data.error || 'Failed to delete user');
              }
            } catch (error) {
              console.error('Error:', error);
              setError('Failed to delete user');
            }
          },
        },
      ]
    );
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <View style={styles.overlay}>
        <Text style={styles.title}>Update Member Information</Text>
        <TextInput
          style={styles.input}
          value={memberIDInput}
          onChangeText={setMemberIDInput}
          placeholder="Member ID"
          editable={false}
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
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          value={confirmPasswordInput}
          onChangeText={setConfirmPasswordInput}
          placeholder="Confirm Password"
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.buttonContainer}>
          <View style={styles.fullWidthButton}>
            <Button title="Save" onPress={handleSave} color="#080" />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.fullWidthButton}>
            <Button title="Delete User" color="red" onPress={handleDelete} />
          </View>
        </View>
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

export default AccountInfo;
