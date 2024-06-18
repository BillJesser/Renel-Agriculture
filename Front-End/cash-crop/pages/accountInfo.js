import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ImageBackground } from 'react-native';

const backgroundImage = require('../assets/farmer1.jpeg');

const AccountInfo = ({ route, navigation }) => {
  const { memberID, username } = route.params;

  const [memberIDInput, setMemberIDInput] = useState(memberID);
  const [usernameInput, setUsernameInput] = useState(username);
  const [passwordInput, setPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');

  const handleSave = () => {
    if (passwordInput !== confirmPasswordInput) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    console.log('Updated Info:', { memberID: memberIDInput, username: usernameInput, password: passwordInput });

    navigation.goBack();
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
    </View>
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
  buttonContainer: {
    width: '100%',
    marginTop: 16,
  },
});

export default AccountInfo;
