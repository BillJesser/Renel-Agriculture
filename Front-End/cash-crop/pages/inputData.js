import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IpContext } from '../IpContext';

const backgroundImage = require('../assets/farmer1.jpeg');

export default function InputDataScreen({ navigation }) {
  const [formData, setFormData] = useState({
    memberId: '',
    memberName: '',
    transactionDate: '',
    savingsContribution: '',
    cumulativeSavings: '',
    loanAmount: '',
    loanDate: '',
    repaymentDueDate: '',
    loanRepayment: '',
    outstandingLoanBalance: '',
    interestPaid: '',
    dividend: '',
    purposeOfLoan: '',
    remarks: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        const memberId = await AsyncStorage.getItem('memberID');
        if (username && memberId) {
          setFormData((prevData) => ({
            ...prevData,
            memberName: username,
            memberId: memberId
          }));
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
    navigation.goBack(); // or navigate to another screen after submission
  };

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <ScrollView contentContainerStyle={styles.container}>
        {Object.keys(formData).map((key) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Text>
            <TextInput
              style={[styles.input, (key === 'memberId' || key === 'memberName') && styles.readOnlyInput]}
              value={formData[key]}
              onChangeText={(value) => handleChange(key, value)}
              placeholder={key.toLowerCase().includes('date') ? 'dd-mm-yyyy' : ''}
              editable={!(key === 'memberId' || key === 'memberName')}
            />
          </View>
        ))}
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  imageOpacity: {
    opacity: 1,
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Light background to avoid overlapping with text
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff', // Ensure input box is white over the background
  },
  readOnlyInput: {
    backgroundColor: '#f0f0f0',
  },
  buttonContainer: {
    marginTop: 20,
  },
});
