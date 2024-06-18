import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, ImageBackground } from 'react-native';
import { Table, Row, Rows } from 'react-native-table-component';
import AsyncStorage from '@react-native-async-storage/async-storage';

const backgroundImage = require('../assets/farmer1.jpeg');

export default function FinancesScreen({ navigation }) {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedUsername = await AsyncStorage.getItem('username');
        if (storedUsername !== null) {
          setUsername(storedUsername);
        }
      } catch (error) {
        console.error('Failed to load username:', error);
      }
    };
    fetchUsername();
  }, []);

  const tableHead = [
    'Date', 'Savings', 'Cumulative', 'Loan',
    'Loan Date', 'Repayment Due', 'Repayment', 'Outstanding',
    'Interest', 'Dividend', 'Purpose', 'Remarks'
  ];
  const tableData = [
    ['2024-06-01', '$500', '$1500', '$2000', '2024-05-15', '2024-11-15', '$250', '$1750', '$50', '$20', 'Business', 'On track'],
    ['2024-06-01', '$100000', '$1500', '$2000', '2024-05-15', '2024-11-15', '$250', '$1750', '$50', '$20', 'Business', 'On track'],
  ];
  const widthArr = [80, 80, 100, 80, 100, 120, 100, 100, 80, 80, 100, 100];

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
