import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function FinancesScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>₵ash Crop</Text>
      <Text style={styles.subtitle}>Finances</Text>

      <View style={styles.chartContainer}>
        {/* Placeholder for the chart */}
      </View>

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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#080',
  },
  subtitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#080',
  },
  chartContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#f0f0f0',
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    // Style for the placeholder chart area
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
});

