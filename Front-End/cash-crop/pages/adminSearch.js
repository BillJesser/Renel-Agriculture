import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet } from 'react-native';

const SearchUser = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 2) { // Only search when the query length is greater than 2
      fetch(`http://192.168.1.78:5000/search_user?query=${text}`)
        .then(response => response.json())
        .then(data => setUsers(data))
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      setUsers([]);
    }
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
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <View style={styles.userItem}>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.userType}>{item.user_type}</Text>
          </View>
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
  userType: {
    fontSize: 14,
    color: 'gray',
  },
});

export default SearchUser;