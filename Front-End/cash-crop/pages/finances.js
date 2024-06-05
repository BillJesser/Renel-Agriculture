import React from 'react';
import { StyleSheet, Text, View, Button, ScrollView } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';

export default function FinancesScreen({ navigation }) {
  const tableHead = [
    'Date', 'Savings', 'Cumulative', 'Loan', 
    'Loan Date', 'Repayment Due', 'Repayment', 'Outstanding', 
    'Interest', 'Dividend', 'Purpose', 'Remarks'
  ];

  const tableData = [
    ['2024-06-01', '$500', '$1500', '$2000', '2024-05-15', '2024-11-15', '$250', '$1750', '$50', '$20', 'Business', 'On track'],
    ['2024-06-01', '$100000', '$1500', '$2000', '2024-05-15', '2024-11-15', '$250', '$1750', '$50', '$20', 'Business', 'On track'],

    // Add more rows as needed
  ];

  const widthArr = [80, 80, 100, 80, 100, 120, 100, 100, 80, 80, 100, 100];

  return (
    <View style={styles.container}>
      <Text style={styles.memberName}>Client: John Doe</Text>
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
            onPress={() => alert('Input New Data pressed')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Print Paper"
            onPress={() => alert('Print Paper pressed')}
          />
        </View>
      </View>

      <View style={styles.singleButtonContainer}>
        <Button
          title="Finance Tutorial"
          onPress={() => alert('Finance Tutorial pressed')}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    alignSelf: 'flex-start', // Aligns "Member Name" to the start
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
