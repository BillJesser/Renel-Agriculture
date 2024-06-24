// Import necessary modules and components from React and React Native
import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert, ImageBackground } from 'react-native';
import { IpContext } from '../IpContext'; // Import the IP context

// Import the background image
const backgroundImage = require('../assets/farmer1.jpeg');

// Define and export the AdminInputData component
export default function AdminInputData({ navigation, route }) {
  // Extract memberID, username, and refreshTransactions from route.params
  const { memberID, username, refreshTransactions } = route.params;
  // Access the IP address from the context
  const ip = useContext(IpContext);

  // Initialize form data state
  const [formData, setFormData] = useState({
    memberId: memberID || '',
    memberName: username || '',
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

  // Handle change in form input
  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
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
        navigation.goBack(); // Navigate back
        refreshTransactions(formData.memberId); // Trigger refresh of transactions on Finance screen
      } else {
        Alert.alert("Error", "Failed to insert data");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred");
    }
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

// Define styles for the component
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
    backgroundColor: '#f0f0f0', // Slightly darker background for read-only inputs
  },
  buttonContainer: {
    marginTop: 20,
  },
});
