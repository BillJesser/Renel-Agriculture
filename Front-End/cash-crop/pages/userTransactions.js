import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const UserTransactions = ({ route }) => {
  const { memberID, username } = route.params;
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (memberID) {
      fetch(`http://192.168.1.19:5000/user_transactions?member_id=${memberID}`)
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

  return (
    <ScrollView
      horizontal={true}
      vertical={true}
      contentContainerStyle={styles.scrollViewContainer}
      maximumZoomScale={2}
      minimumZoomScale={0.5}
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Member Name: {username}</Text>
        <Text style={styles.heading}>Transactions for User ID: {memberID}</Text>
        <View style={styles.table}>
          <View style={styles.row}>
            <Text style={styles.header}>Transaction Dates</Text>
            <Text style={styles.header}>Saving Contributions</Text>
            <Text style={styles.header}>Cumulative Savings</Text>
            <Text style={styles.header}>Loan Amount</Text>
            <Text style={styles.header}>Loan Date</Text>
          </View>
          {transactions.transaction_dates.map((date, index) => (
            <View style={styles.row} key={index}>
              <Text>{date}</Text>
              <Text>{transactions.saving_contributions[index]}</Text>
              <Text>{transactions.cumulative_savings[index]}</Text>
              <Text>{transactions.loan_amount[index]}</Text>
              <Text>{transactions.loan_date[index]}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  table: {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
    minWidth: '100%',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  header: {
    fontWeight: 'bold',
    flex: 1,
    minWidth: 100,
    textAlign: 'center',
  },
});

export default UserTransactions;