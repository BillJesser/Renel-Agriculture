import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ImageBackground } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IpContext } from '../IpContext'; // Import the context

const backgroundImage = require('../assets/farmer1.jpeg');

export default function FinancesScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [memberID, setMemberID] = useState('');
  const [transactions, setTransactions] = useState(null);
  const [loading, setLoading] = useState(true);
  const ip = useContext(IpContext); // Access the IP address

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        const storedMemberID = await AsyncStorage.getItem('memberID');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
        if (storedMemberID !== null) {
          setMemberID(storedMemberID);
          fetchTransactions(storedMemberID);
        }
      } catch (error) {
        console.error('Failed to load user data:', error);
        setLoading(false);
      }
    };


    fetchUserData();

  }, []);

  const fetchTransactions = async (memberID) => {
    try {
      const response = await fetch(`http://${ip}/user_transactions?member_id=${memberID}`);
      
      const data = await response.json();
      setTransactions(data);
    }  finally {
      setLoading(false);
    }
  };

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

  const tableData = transactions && transactions.transaction_dates ? transactions.transaction_dates.map((_, index) => [
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

  const widthArr = [140, 140, 140, 140, 140, 140, 140, 160, 140, 120, 160, 160];


  return (
    <ImageBackground source={backgroundImage} style={styles.backgroundImage} imageStyle={styles.imageOpacity}>
      <View style={styles.overlay}>
        <Text style={styles.memberName}>Client: {username}</Text>
        <View style={styles.header}>
          <Text style={styles.title}>₵ash Crop</Text>
        </View>
        <Text style={styles.subtitle}>Finances</Text>
        <ScrollView horizontal style={styles.chartContainer}>
          <View>
            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
              <Row data={tableHead} style={styles.head} widthArr={widthArr} textStyle={styles.text} />
              <Rows data={tableData} widthArr={widthArr} textStyle={styles.text} />
            </Table>
          </View>
        </ScrollView>
        <View style={styles.buttonRow}>
          <View style={styles.buttonContainer}>
            <Button
              title="Input New Data"
              onPress={() => navigation.navigate('InputData')} // Update this line
              color="#080"
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="Print Paper"
              onPress={() => alert('Print Paper pressed')}
              color="#080"
            />
          </View>
        </View>
        <View style={styles.singleButtonContainer}>
          <Button
            title="Finance Tutorial"
            onPress={() => alert('Finance Tutorial pressed')}
            color="#080"
          />
        </View>
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
    alignItems: 'center',
    padding: 20,
  },
  header: {
    width: '100%',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#080',
  },
  memberName: {
    fontSize: 16,
    color: '#080',
    alignSelf: 'flex-start',
    marginBottom: 5
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#080',
  },
  chartContainer: {
    flex: 1,
    width: '100%',
    marginBottom: 20,
  },
  head: {
    height: 40,
    backgroundColor: '#f1f8ff',
  },
  text: {
    margin: 6,
    textAlign: 'center',
    fontSize: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  singleButtonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
});
