// Import necessary libraries
import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, ImageBackground, TouchableOpacity } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Print from 'expo-print';
import { IpContext } from '../IpContext';

const backgroundImage = require('../assets/farmer1.jpeg');

export default function FinancesScreen({ navigation }) {
  // State variables
  const [username, setUsername] = useState('');
  const [memberID, setMemberID] = useState('');
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const ip = useContext(IpContext); // Accessing context for IP address

  // Fetch user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Retrieve stored username and memberID from AsyncStorage
        const storedUsername = await AsyncStorage.getItem('username');
        const storedMemberID = await AsyncStorage.getItem('memberID');

        // Update state with retrieved data if available
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
        if (storedMemberID !== null) {
          setMemberID(storedMemberID);
          fetchTransactions(storedMemberID); // Fetch transactions for the member
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
        setLoading(false); // Set loading to false on error
      }
    };

    fetchUserData(); // Call fetchUserData function
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // Function to fetch transactions for a given member ID
  const fetchTransactions = async (memberID) => {
    try {
      // Fetch transactions from server using IP context and member ID
      const response = await fetch(`http://${ip}/user_transactions?member_id=${memberID}`);
      const data = await response.json(); // Parse response as JSON
      setTransactions(data); // Update state with fetched transactions
      setLoading(false); // Set loading to false after successful fetch
    } catch (error) {
      console.error('Failed to fetch transactions:', error);
      setError('Error fetching data. Please try again.'); // Set error message on fetch failure
      setLoading(false); // Set loading to false on error
    }
  };

  // Navigate to 'InputData' screen when user wants to input new data
  const handleInputNewData = () => {
    navigation.navigate('InputData', { refreshTransactions: fetchTransactions });
  };

  // Function to handle printing of transaction data as a PDF
  const handlePrintPaper = async () => {
    if (!transactions) {
      alert('No transactions available to generate PDF.'); // Alert if no transactions available
      return;
    }

    try {
      // Generate HTML content for printing
      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 8px 12px; border: 1px solid #ccc; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>Member Name: ${username}</h1>
            <h2>User ID: ${memberID}</h2>
            <table>
              <thead>
                <tr>
                  <th>Transaction Dates</th>
                  <th>Saving Contributions</th>
                  <th>Cumulative Savings</th>
                  <th>Loan Amount</th>
                  <th>Loan Date</th>
                  <th>Repayment Due Date</th>
                  <th>Loan Repayment</th>
                  <th>Outstanding Loan Balance</th>
                  <th>Interest Paid</th>
                  <th>Dividend</th>
                  <th>Purpose of Loan</th>
                  <th>Remarks</th>
                </tr>
              </thead>
              <tbody>
                ${transactions.transaction_dates.map((date, index) => `
                  <tr>
                    <td>${date || ''}</td>
                    <td>${transactions.saving_contributions[index] || ''}</td>
                    <td>${transactions.cumulative_savings[index] || ''}</td>
                    <td>${transactions.loan_amount[index] || ''}</td>
                    <td>${transactions.loan_date[index] || ''}</td>
                    <td>${transactions.repaymentDueDate[index] || ''}</td>
                    <td>${transactions.loanRepayment[index] || ''}</td>
                    <td>${transactions.outstandingLoanBalance[index] || ''}</td>
                    <td>${transactions.interestPaid[index] || ''}</td>
                    <td>${transactions.dividend[index] || ''}</td>
                    <td>${transactions.purposeOfLoan[index] || ''}</td>
                    <td>${transactions.remarks[index] || ''}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </body>
        </html>
      `;

      // Print the HTML content as PDF using Expo Print
      await Print.printAsync({ html: htmlContent });
    } catch (error) {
      console.error('Failed to print document:', error);
      alert('Failed to print document. Please try again.'); // Alert user on print failure
    }
  };

  // Render loading message while data is being fetched
  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  // Render error message if there was an error fetching data
  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  // Table header columns
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

  // Table data rows, default to empty rows if no transactions available
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
    ]) : [['', '', '', '', '', '', '', '', '', '', '', '']]; // Single empty row if no data

  // Widths for table columns
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

        {/* Buttons for inputting new data and printing */}
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={handleInputNewData}>
              <Text style={styles.buttonText}>Input New Data</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.centeredButton]} onPress={handlePrintPaper}>
              <Text style={styles.buttonText}>Print Paper</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}

// Styles for the FinancesScreen component
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
  },
  button: {
    backgroundColor: '#080',
    paddingVertical: 10, // Reduced vertical padding
    paddingHorizontal: 30, // Reduced horizontal padding
    borderRadius: 5,
    marginHorizontal: 10,
    width: 150, // Set a fixed width for uniform size
    alignItems: 'center', // Center text horizontally
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14, // Slightly smaller font size
    textAlign: 'center',
  },
  centeredButton: {
    justifyContent: 'center', // Center content vertically
    alignItems: 'center', // Center content horizontally
  },
});

