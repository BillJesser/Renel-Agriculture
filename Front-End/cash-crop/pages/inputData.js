import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IpContext } from '../IpContext';

const backgroundImage = require('../assets/farmer1.jpeg');

export default function InputDataScreen({ navigation, route }) {
  // State to manage form data
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

  const ip = useContext(IpContext); // Access the IP address from context
  const { refreshTransactions } = route.params; // Extract the refreshTransactions callback from route params

  // Effect to fetch user data from AsyncStorage on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = await AsyncStorage.getItem('username');
        const memberId = await AsyncStorage.getItem('memberID');
        if (username && memberId) {
          // Update formData state with fetched user data
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

  // Function to handle input changes in the form fields
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://${ip}/insert`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert("Success", `Data inserted`);
        navigation.goBack(); // Navigate back after successful submission
        refreshTransactions(formData.memberId); // Trigger refresh of transactions on Finance screen
      } else {
        Alert.alert("Error", "Failed to insert data");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred");
    }
  };

  // Component render method
  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* Render each form input dynamically */}
        {Object.keys(formData).map((key) => (
          <View key={key} style={styles.inputContainer}>
            <Text style={styles.label}>
              {/* Format the label text (camelCase to spaced) */}
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
            </Text>
            {/* Text input field */}
            <TextInput
              style={[styles.input, (key === 'memberId' || key === 'memberName') && styles.readOnlyInput]}
              value={formData[key]}
              onChangeText={(value) => handleChange(key, value)}
              placeholder={key.toLowerCase().includes('date') ? 'dd-mm-yyyy' : ''}
              editable={!(key === 'memberId' || key === 'memberName')} // Disable editing for memberId and memberName
            />
          </View>
        ))}
        {/* Button to submit the form */}
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} color="#4CAF50" />
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

// Styles for the component
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
    backgroundColor: '#f0f0f0', // Gray background for read-only inputs
  },
  buttonContainer: {
    marginTop: 20,
  },
});
