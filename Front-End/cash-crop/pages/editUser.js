import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const EditUser = () => {
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const navigation = useNavigation();

  const handleSearch = (text) => {
    setQuery(text);
    if (text.length > 0) {
      fetch(`http://192.168.1.49:5000/search_user?query=${text}`)
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
    <View style={styles.outerContainer}>
      <View style={styles.searchBackground}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search Users"
            value={query}
            onChangeText={handleSearch}
          />
        </View>
      </View>
      <View style={styles.innerContainer}>
        {users.length === 0 ? (
          <View style={styles.noUsersContainer}>
            <Text style={styles.noUsersText}>Users will display here</Text>
          </View>
        ) : (
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
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    borderWidth: 30, // Thicker border
    borderColor: 'green',
    borderRadius: 0,
    paddingTop: 60, // Added padding to allow space for search tool
    backgroundColor: 'green', // Set background color to green
  },
  searchBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90, // Adjust the height to ensure it covers the search container
    backgroundColor: 'green',
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  searchContainer: {
    marginTop: 15, // Adjust to position the search container correctly
    marginHorizontal: 15,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'green', // Match border color with outer container
  },
  innerContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
    marginTop: 60, // Adjust margin to account for search tool
  },
  noUsersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noUsersText: {
    fontSize: 16,
    color: 'gray',
  },
  searchInput: {
    height: 40,
    paddingLeft: 8,
    borderRadius: 4,
  },
  userItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'green',
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
