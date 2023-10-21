import React, { useState } from "react";
import axios from "axios";
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import path from "path";

const RegisterRes = ({ navigation }: { navigation: any }) => {
  const handleSubmit = async () => {
      axios.post("http://10.253.64.216:9007/postRegisterAccount/" + "restaurant", {
            name: restaurantName,
            address: address,
            username: username,
            password: password
          })
          .then((response) => {
            console.log(response);
            console.log(response.status);
            navigation.navigate('AddMenu'); 
          }).catch(error => console.log(error));
      
      // try {
      //   await fetch("http://67.134.204.4:9007//postRegisterAccount/" + "restaurant", {
      //     // var url = new URL("/postRegisterAccount", "http://localhost:9007"), params = {type:"restaurant"};
      //     // fetch(url, {
      //     method: "POST",
      //     headers: {
      //       // "Accept": "application/json",
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       name: restaurantName,
      //       address: address,
      //       username: username,
      //       password: password,
      //     }),
      //   })
      //     .then((response) => response.json())
      //     .then((responseData) => {
      //       console.log(responseData);
      //       if (responseData.status == "success") {
      //         navigation.navigate('AddMenu'); 
      //       }
      //     })
      //     // .catch(function(error) {
      //     //     console.log('There has been a problem with your fetch operation to register as restaurant: ' + error.message);
      //     //     // ADD THIS THROW error
      //     //       throw error;
      //     // }
      //     // );
      // } catch (error){
      //   console.error(error); 
      // }
      
      return (
        <h1>
          Hello!  </h1>
      );

    
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

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
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
