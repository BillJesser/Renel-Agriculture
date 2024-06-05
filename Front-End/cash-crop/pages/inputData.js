import React from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView, Button } from 'react-native';

export default function InputDataScreen({ navigation }) {

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Input Financial Data</Text>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Transaction Date</Text>
        <TextInput style={styles.input} placeholder="yyyy-mm-dd" />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Savings Contribution</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Cumulative Savings</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Loan Amount</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Loan Date</Text>
        <TextInput style={styles.input} placeholder="yyyy-mm-dd" />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Repayment Due Date</Text>
        <TextInput style={styles.input} placeholder="yyyy-mm-dd" />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Loan Repayment</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Outstanding Loan Balance</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Interest Paid</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Dividend</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Purpose of Loan</Text>
        <TextInput style={styles.input} />
      </View>
      <View style={styles.inputRow}>
        <Text style={styles.label}>Remarks</Text>
        <TextInput style={styles.input} />
      </View>
      <Button title="Submit" onPress={() => alert('Data Submitted')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
  input: {
    flex: 2,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
});
