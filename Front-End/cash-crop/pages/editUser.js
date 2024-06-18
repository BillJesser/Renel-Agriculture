import React, { useState, useContext } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { IpContext } from '../IpContext'; // Import the context

const EditUser = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();
  const ip = useContext(IpContext); // Access the IP address

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 0) {
      fetch(`http://${ip}/search_user?query=${text}`)
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      setUsers([]);
    }
  };

  const handleUserPress = (user) => {
    navigation.navigate('AccountInfo', { memberID: user.memberID, username: user.username });
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Users"
        value={query}
        onChangeText={handleSearch}
      />
      <FlatList
        data={users}
        keyExtractor={(item) => item.memberID.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleUserPress(item)}>
            <View style={styles.userItem}>
              <Text style={styles.username}>{item.username}</Text>
              <Text style={styles.userDetails}>{item.user_type} #{item.memberID}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingLeft: 8,
    marginBottom: 16,
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  userDetails: {
    fontSize: 14,
    color: 'gray',
  },
});

export default EditUser;