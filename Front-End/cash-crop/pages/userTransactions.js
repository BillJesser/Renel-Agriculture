import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import { IpContext } from '../IpContext';

const backgroundImage = require('../assets/farmer1.jpeg');

export default function FinancesScreen({ navigation, route }) {
  const { username, memberID } = route.params; // Extract username and memberID from route params
  const [transactions, setTransactions] = useState(null);
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
      const data = await response.json();
      setTransactions(data);
      setLoading(false);
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };

  const handleInputNewData = () => {
    navigation.navigate('AdminInputData', { memberID: memberID, username: username, refreshTransactions: fetchTransactions });
  };

  const handlePrintPaper = () => {
    alert('Print Paper pressed');
  };

  const handleEditData = () => {
    alert('Edit Data pressed');
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

  const tableHead = [
    'Transaction Dates',
    'Saving Contributions',
    'Cumulative Savings',
    'Loan Amount',
    'Loan Date',
    'Repayment Due Date',
    'Loan Repayment',
    'Outstanding Loan Balance',
    'Interest Paid',
    'Dividend',
    'Purpose of Loan',
    'Remarks'
  ];

  // Render an empty row if transactions are empty or null
  const tableData = transactions && transactions.transaction_dates && transactions.transaction_dates.length > 0 ?
    transactions.transaction_dates.map((_, index) => [
      transactions.transaction_dates[index] || '',
      transactions.saving_contributions[index] || '',
      transactions.cumulative_savings[index] || '',
      transactions.loan_amount[index] || '',
      transactions.loan_date[index] || '',
      transactions.repaymentDueDate[index] || '',
      transactions.loanRepayment[index] || '',
      transactions.outstandingLoanBalance[index] || '',
      transactions.interestPaid[index] || '',
      transactions.dividend[index] || '',
      transactions.purposeOfLoan[index] || '',
      transactions.remarks[index] || ''
    ]) : [['', '', '', '', '', '', '', '', '', '', '', '']]; // Show message if no data

  const widthArr = [140, 140, 140, 140, 140, 140, 140, 160, 140, 120, 160, 160];

  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <View style={styles.container}>
        {/* Static Header */}
        <View style={styles.header}>
          <Text style={styles.heading}>Member Name: {username}</Text>
          <Text style={styles.heading}>User ID: {memberID}</Text>
        </View>
  
        {/* Scrollable Table */}
        <ScrollView horizontal>
          <ScrollView contentContainerStyle={styles.tableContainer}>
            {transactions && transactions.transaction_dates && transactions.transaction_dates.length > 0 ? (
              <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                <Row data={tableHead} style={styles.head} widthArr={widthArr} textStyle={styles.text} />
                <Rows data={tableData} widthArr={widthArr} textStyle={styles.text} />
              </Table>
            ) : (
              <Text style={styles.text}>No data available, please input data.</Text>
            )}
          </ScrollView>
        </ScrollView>
  
        {/* Buttons */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleInputNewData}>
              <Text style={styles.buttonText}>Input New Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={handleEditData}>
              <Text style={styles.buttonText}>Edit Data</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.buttonSingle} onPress={handlePrintPaper}>
            <Text style={styles.buttonText}>Print Paper</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
    paddingBottom: 40, // Added padding to the bottom to create space below buttons
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // or 'stretch'
  },
  imageOpacity: {
    opacity: 0.5, // Adjust the opacity as needed
  },
  header: {
    padding: 16,
    alignSelf: 'flex-start', // Align header to the start (left)
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#080', // Green color
  },
  tableContainer: {
    padding: 16,
  },
  head: {
    height: 50,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
    textAlign: 'center',
    fontSize: 12,
  },
  buttonsContainer: {
    marginTop: 20, // Increased margin to move the buttons higher
    alignItems: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
    paddingHorizontal: 20, // Add padding to ensure the buttons don't touch the sides
  },
  button: {
    backgroundColor: '#080',
    paddingVertical: 10, // Reduced vertical padding
    paddingHorizontal: 30, // Reduced horizontal padding
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonSingle: {
    backgroundColor: '#080',
    paddingVertical: 10, // Reduced vertical padding
    paddingHorizontal: 30, // Reduced horizontal padding
    borderRadius: 5,
    marginTop: 10, // Added margin to separate it from the row above
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14, // Slightly smaller font size
    textAlign: 'center',
  },
});
