import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function DashboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>₵ash Crop</Text>

      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button
            title="Finances"
            onPress={() => alert('Finances pressed')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Tutorials"
            onPress={() => alert('Tutorials pressed')}
          />
        </View>
      </View>

      <View style={styles.logoutButtonContainer}>
        <Button
          title="Logout"
          onPress={() => navigation.navigate('Home')}
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
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 200,
    color: '#080',
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  buttonContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  logoutButtonContainer: {
    width: '100%',
    marginTop: 20,
  },
});
