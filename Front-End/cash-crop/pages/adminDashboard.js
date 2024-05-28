import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

export default function AdminDashboardScreen({ navigation }) {
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

      <View style={styles.buttonRow}>
        <View style={styles.buttonContainer}>
          <Button
            title="Search Database"
            onPress={() => alert('Search Database pressed')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Manage Accounts"
            onPress={() => alert('Manage Accounts pressed')}
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
    marginBottom: 100,
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
