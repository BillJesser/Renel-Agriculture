import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import * as Print from 'expo-print';
import { IpContext } from '../IpContext';

const backgroundImage = require('../assets/farmer1.jpeg');

export default function EditUserFinances({ navigation, route }) {
  const { username, memberID, refreshTransactions } = route.params;
  
  // Initialize transactions state with all fields
  const initialTransactions = {
    "Transaction dates": [],
    "Saving Contributions": [],
    "Cumulative savings": [],
    "Loan amount": [],
    "Loan date": [],
    "Repayment Due Date": [],
    "Loan Repayment": [],
    "Outstanding Loan Balance": [],
    "Interest Paid": [],
    "Dividend": [],
    "Purpose of Loan": [],
    "Remarks": []
  };

  const [transactions, setTransactions] = useState(initialTransactions);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ip = useContext(IpContext);

  useEffect(() => {
    if (memberID) {
      fetchTransactions(memberID);
    }
  }, [memberID]);

  const fetchTransactions = async (memberID) => {
    try {
      const response = await fetch(`http://${ip}/user_transactions?member_id=${memberID}`);
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Response is not in JSON format');
      }
  
      const data = await response.json();
      // Process the JSON data here
      const transformedData = {
        "Transaction dates": data.transaction_dates || [],
        "Saving Contributions": data.saving_contributions || [],
        "Cumulative savings": data.cumulative_savings || [],
        "Loan amount": data.loan_amount || [],
        "Loan date": data.loan_date || [],
        "Repayment Due Date": data.repaymentDueDate || [],
        "Loan Repayment": data.loanRepayment || [],
        "Outstanding Loan Balance": data.outstandingLoanBalance || [],
        "Interest Paid": data.interestPaid || [],
        "Dividend": data.dividend || [],
        "Purpose of Loan": data.purposeOfLoan || [],
        "Remarks": data.remarks || []
      };
  
      setTransactions(transformedData);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setError(`Error fetching data: ${error.message}`);
      setLoading(false);
    }
  };

  const handleInputChange = (value, key, index) => {
    const updatedTransactions = { ...transactions };
    updatedTransactions[key][index] = value;
    setTransactions(updatedTransactions);
    console.log('Updated Transactions:', updatedTransactions);
  };

  const saveChanges = async () => {
    try {
      const updateData = {
        memberId: memberID,
        transactions: transactions
      };

      const response = await fetch(`http://${ip}/updateFinance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Changes saved successfully.');
        refreshTransactions(memberID); // Assuming refreshTransactions is passed as a prop
      } else {
        alert('Failed to save changes: ' + data.message);
      }
    } catch (error) {
      console.error('Error saving changes:', error);
      alert('Failed to save changes. Please try again.');
    }
    navigation.navigate('UserTransactions', { memberID: memberID, username: username, refreshTransactions: fetchTransactions });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>Member Name: {username}</Text>
            <Text style={styles.heading}>User ID: {memberID}</Text>
          </View>

          {transactions["Transaction dates"].map((_, index) => (
            <View key={`transaction-${index}`} style={styles.transactionContainer}>
              <Text style={styles.transactionIndex}>Transaction index {index + 1}</Text>
              {Object.keys(transactions).map((key) => (
                <View key={`${key}-${index}`} style={styles.transactionRow}>
                  {key !== "Remarks" && <Text style={styles.label}>{key}:</Text>}
                  <TextInput
                    style={styles.input}
                    value={transactions[key][index] || ''}
                    onChangeText={(text) => handleInputChange(text, key, index)}
                    placeholder={key}
                  />
                </View>
              ))}
              <View style={styles.divider} />
            </View>
          ))}

          <TouchableOpacity style={styles.buttonSingle} onPress={saveChanges}>
            <Text style={styles.buttonText}>Save Changes</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  imageOpacity: {
    opacity: 0.5,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#080',
  },
  transactionContainer: {
    marginBottom: 20,
  },
  transactionIndex: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#080',
  },
  transactionRow: {
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
    color: '#080',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonSingle: {
    backgroundColor: '#080',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  divider: {
    borderBottomWidth: 2,
    borderBottomColor: '#080',
    marginBottom: 10,
  },
});
