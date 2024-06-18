import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const AccountInfo = ({ route, navigation }) => {
  const { memberID, username } = route.params;

  const [memberIDInput, setMemberIDInput] = useState(memberID);
  const [usernameInput, setUsernameInput] = useState(username);
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const handleSave = async () => {
    if (passwordInput !== confirmPasswordInput) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    const updatedInfo = {};
    updatedInfo.memberID = memberIDInput;

    if (usernameInput !== username) {
      updatedInfo.username = usernameInput;
    }

    if (passwordInput.trim() !== '') {
      updatedInfo.password = passwordInput;
    }

    try {
      const response = await fetch('http://192.168.1.64:5000/update_user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedInfo),
      });

      const data = await response.json();
      if (response.ok) {
        Alert.alert('Success', data.message);
        // Update username locally if it has changed
        if (data.updatedUsername) {
          setUsernameInput(data.updatedUsername);
        }
      } else {
        Alert.alert('Error', data.error || 'Failed to update information');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Failed to update information');
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
              const response = await fetch(`http://192.168.1.64:5000/delete_user/${memberID}`, {
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
                Alert.alert('Error', data.error || 'Failed to delete user');
              }
            } catch (error) {
              console.error('Error:', error);
              Alert.alert('Error', 'Failed to delete user');
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
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
      <Button title="Save" onPress={handleSave} />
      <View style={styles.deleteButtonContainer}>
        <Button title="Delete User" color="red" onPress={handleDelete} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  deleteButtonContainer: {
    marginTop: 16,
  },
});

export default AccountInfo;