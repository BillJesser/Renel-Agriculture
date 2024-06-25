import React, { useState, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert, ImageBackground } from 'react-native';
import { IpContext } from '../IpContext';

const backgroundImage = require('../assets/farmer1.jpeg');

export default function AdminInputData({ navigation, route }) {
  const { memberID, username, refreshTransactions } = route.params;
  const ip = useContext(IpContext);

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
    outstandingLoanBalance: '', // Ensure this remains empty or undefined initially
    interestPaid: '',
    dividend: '',
    purposeOfLoan: '',
    remarks: ''
  });

  const handleChange = (name, value) => {
    if (name !== 'outstandingLoanBalance') { // Exclude outstandingLoanBalance
      setFormData({ ...formData, [name]: value });
    }
  };

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
        navigation.goBack();
        refreshTransactions(formData.memberId);
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
              style={[styles.input, (key === 'memberId' || key === 'memberName' || key === 'outstandingLoanBalance') && styles.readOnlyInput]}
              value={formData[key]}
              onChangeText={(value) => handleChange(key, value)}
              placeholder={key.toLowerCase().includes('date') ? 'dd-mm-yyyy' : ''}
              editable={!(key === 'memberId' || key === 'memberName' || key === 'outstandingLoanBalance')}
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
    resizeMode: 'cover',
  },
  imageOpacity: {
    opacity: 1,
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
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
    backgroundColor: '#fff',
  },
  readOnlyInput: {
    backgroundColor: '#f0f0f0', // Gray background for read-only inputs
  },
  buttonContainer: {
    marginTop: 20,
  },
});

