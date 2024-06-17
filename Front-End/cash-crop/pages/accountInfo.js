import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

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
});

export default AccountInfo;