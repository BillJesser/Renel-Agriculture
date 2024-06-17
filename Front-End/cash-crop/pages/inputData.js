import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView } from 'react-native';

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

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log(formData);
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {Object.keys(formData).map((key) => (
        <View key={key} style={styles.inputContainer}>
          <Text style={styles.label}>{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</Text>
          <TextInput
            style={styles.input}
            value={formData[key]}
            onChangeText={(value) => handleChange(key, value)}
            placeholder={
              key.toLowerCase().includes('date') ? 'dd-mm-yyyy' : ''
            }
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
  buttonContainer: {
    marginTop: 20,
  },
});
