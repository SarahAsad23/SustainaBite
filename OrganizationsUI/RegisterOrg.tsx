import React, { useState } from "react";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from 'axios';

const RegisterOrg = ({ navigation }: { navigation: any }) => {
  const [organizationName, setOrganizationName] = useState('');
  const [capacity, setCapacity] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /*
  const register =  () => {
    fetch("/postRegisterAccount/" + "organization", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: organizationName,
        capacity: capacity,
        address: address,
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        if (responseData.status == "success") {
          navigation.navigate('AddMenu'); 
        }
      }).catch(function(error) {
          console.log('There has been a problem with your fetch operation to register the organization: ' + error.message);
          // ADD THIS THROW error
            throw error;
      });
  }
  */
  
  const register =  () => {
    axios.post("/postRegisterAccount/organization", {
      name: organizationName,
      capacity: capacity,
      address: address,
      username: username,
      password: password,
    },
    {
      headers: {
        "Content-Type": "application/json",
      }
    })
    .then((response) => {
      console.log(response.data);
      if (response.data.status === "success") {
        navigation.navigate('AddMenu'); 
      }
    })
    .catch(function (error) {
      console.log('There has been a problem with your Axios request: ' + error.message);
      throw error;
    });
  }
  

  return (
    <View style={styles.container}>
      
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Restaurant Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setOrganizationName(text)}
          value={organizationName}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Capacity</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setCapacity(text)}
          value={capacity}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setAddress(text)}
          value={address}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          value={username}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={true}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={register}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  input: {
    height: 45,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  button: {
    borderWidth: 3,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 50,
    borderColor: 'black',
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default RegisterOrg;
