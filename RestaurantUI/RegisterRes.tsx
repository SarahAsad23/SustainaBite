import React, { useState } from "react";

import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

const RegisterRes = ({ navigation }: { navigation: any }) => {
  const handleSubmit = () => {
     axios.get('http://10.253.87.12:9007/postRegisterAccount/' + "restaurant")
         .then(function(response) {
             // handle response
             if (response.data.status == "success") {
                 //log in success
               navigation.navigate('AddMenu'); 
             }
         }).catch(function(error) {
             // handle error
         }).finally(function() {
             //always executes at the last of any API call
      });
    };
  

  const go = () =>{
    navigation.navigate('AddMenu'); 
  }
  
  const [restaurantName, setRestaurantName] = useState('');
  const [address, setAddress] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Restaurant Name</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setRestaurantName(text)}
          value={restaurantName}
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

      <TouchableOpacity style={styles.button} onPress={go}>
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

export default RegisterRes;
