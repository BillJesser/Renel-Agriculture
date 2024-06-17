import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, TouchableOpacity, Alert, ImageBackground, Image, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const farmerImage = require('../assets/farmer1.jpeg');
const renelImage = require('../assets/renellogo.png');

export default function HomeScreen({ navigation }) {
  const [password, setPassword] = useState('');
  const [memberId, setMemberId] = useState(''); 
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    React.useCallback(() => {
      setPassword('');
      setMemberId(''); 
    }, [])
  );

  const handleLogin = async () => {
    if (!password || !memberId) {
      Alert.alert('Error', 'Member ID and password are required');
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch('http://192.168.1.49:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password, memberId }), 
      });
  
      const data = await response.json();
  
      setLoading(false);
  
      if (data.message === 'Login successful.') {
        await AsyncStorage.setItem('memberID', data.memberId);
        await AsyncStorage.setItem('username', data.username);
  
        if (data.user_type === 'Admin') {
          navigation.navigate('AdminDashboard');
        } else if (data.user_type === 'Client') {
          navigation.navigate('Dashboard');
        }
      } else {
        Alert.alert('Error', 'Incorrect member ID or password');
      }
    } catch (error) {
      setLoading(false);
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <ImageBackground
      source={farmerImage}
      style={styles.backgroundImage}
      imageStyle={styles.imageOpacity}
    >
      <View style={styles.overlay}>
        <Image source={renelImage} style={styles.logo} />
        <Text style={styles.title}>₵ash Crop</Text>
        <Text style={styles.subtitle}>Agriculture Companion</Text>

     
        <TextInput
          style={styles.input}
          placeholder="Member ID" // New Member ID input
          placeholderTextColor="#888"
          value={memberId}
          onChangeText={text => setMemberId(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#888"
          secureTextEntry
          value={password}
          onChangeText={text => setPassword(text)}
        />

        {loading ? (
          <ActivityIndicator size="large" color="#080" />
        ) : (
          <Button title="Login" onPress={handleLogin} />
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.register}>Register an Account</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

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
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 220,
    height: 220,
    resizeMode: 'contain',
    marginBottom: 30,
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
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  register: {
    color: 'blue',
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});