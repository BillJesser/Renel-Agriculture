import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const AccountInfo = ({ route, navigation }) => {
  const { memberID, username } = route.params;

  const [memberIDInput, setMemberIDInput] = useState(memberID);
  const [usernameInput, setUsernameInput] = useState(username);
  const [passwordInput, setPasswordInput] = useState('');

  const handleSave = () => {
    // Save the updated information
    console.log('Updated Info:', { memberID: memberIDInput, username: usernameInput, password: passwordInput });
    // Here you would typically make an API call to save the updated user information

    // After saving, navigate back or show a success message
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text>Update Member Information</Text>
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
      <Button title="Save" onPress={handleSave} />
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
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default AccountInfo