import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

const UserTransactions = ({ route }) => {
  const { memberID, username } = route.params;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (memberID) {
      fetch(`http://192.168.1.65:5000/user_transactions?member_id=${memberID}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setTransactions(data);
          setLoading(false);
        })
        .catch(error => {
          setError('Error fetching data. Please try again.');
          setLoading(false);
        });
    }
  }, [memberID]);

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

  const tableData = transactions.transaction_dates.map((_, index) => [
    transactions.transaction_dates[index],
    transactions.saving_contributions[index],
    transactions.cumulative_savings[index],
    transactions.loan_amount[index],
    transactions.loan_date[index],
    transactions.repaymentDueDate[index],
    transactions.loanRepayment[index],
    transactions.outstandingLoanBalance[index],
    transactions.interestPaid[index],
    transactions.dividend[index],
    transactions.purposeOfLoan[index],
    transactions.remarks[index]
  ]);

  const widthArr = [140, 140, 140, 140, 140, 140, 140, 160, 140, 120, 160, 160];

  return (
    <View style={styles.container}>
      {/* Static Header */}
      <View style={styles.header}>
        <Text style={styles.heading}>Member Name: {username}</Text>
        <Text style={styles.heading}>User ID: {memberID}</Text>
      </View>

      {/* Scrollable Table */}
      <ScrollView horizontal>
        <ScrollView contentContainerStyle={styles.tableContainer}>
          <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
            <Row data={tableHead} style={styles.head} widthArr={widthArr} textStyle={styles.text} />
            <Rows data={tableData} widthArr={widthArr} textStyle={styles.text} />
          </Table>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
});

export default UserTransactions;