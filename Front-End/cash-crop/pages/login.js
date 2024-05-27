import React from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>₵ash Crop</Text>
      <Text style={styles.subtitle}>Agriculture Companion</Text>

      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#888"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        secureTextEntry
      />

      <Button
        title="Login"
        onPress={() => navigation.navigate('Dashboard')}
      />

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.register}>Register an Account</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#080',
  },
  subtitle: {
    fontSize: 20,
    color: '#080',
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
  },
  register: {
    color: 'blue',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
