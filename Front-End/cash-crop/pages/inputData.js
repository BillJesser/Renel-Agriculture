import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IpContext } from '../IpContext'; // Import the context


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
  const ip = useContext(IpContext); // Access the IP address

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
        Alert.alert("Success", `Data inserted with id: ${result.inserted_id}`);
        navigation.goBack();
      } else {
        Alert.alert("Error", "Failed to insert data");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "An error occurred");
    }
  };

  return (
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
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
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
  },
  readOnlyInput: {
    backgroundColor: '#f0f0f0', 
  },
  buttonContainer: {
    marginTop: 20,
  },
})