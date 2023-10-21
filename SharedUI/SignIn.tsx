import React, {useState} from "react";
import axios from 'axios';


import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";


const SignIn = ({navigation}: {navigation: any}) => {
    const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

   const logIn = async () => {
    axios.post("http://10.253.64.216:9007/sendLoginDetails", {
            username: username,
            password: password
          })
          .then((response) => {
            console.log(response);
            if (response.data.status == "fail") {
                //log in failed
                //TO DO: add message alert saying password or username incorrect
            } else {
              var type = response.data.status; //could be restaurant or organization
              if (type == "restaurant") {
                navigation.navigate('AddMenu');
              } else {
                navigation.navigate('RestaurantTableView');
              }
   }
  }).catch(error => console.log(error));
    // fetch("../sendLoginDetailst", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ username: username, password : password }),
    // })
    //   .then((response) => response.json())
    //   .then((responseData) => {
    //     console.log(responseData);
    //     if (responseData.status == "success") {
    //       navigation.navigate('AddMenu'); 
    //     }
    //   }).catch(function(error) {
    //       console.log('There has been a problem with your fetch operation to sign into the app: ' + error.message);
    //       // ADD THIS THROW error
    //         throw error;
    //   });
      // axios.get('/sendLoginDetails')
      //   .then(function(response) {
      //       // handle response
      //       if (response.data.status == "fail") {
      //           //log in failed
      //           //TO DO: add message alert saying password or username incorrect
      //       } else {
      //         var type = response.data.status; //could be restaurant or organization
      //         if (type == "restaurant") {
      //           navigation.navigate('RegisterRes');
      //         } else {
      //           navigation.navigate('RegisterOrg');
      //         }
      //       }
      //   }).catch(function(error) {
      //       // handle error
      //   }).finally(function() {
      //       // always executes at the last of any API call
      //   });
      return (
        <h1>
          Hello!  </h1>
      );
   }

    return(
        <View style={styles.container}> 

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

        <TouchableOpacity style={styles.button} onPress={logIn}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>

    </View>
    
    )
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
        color: '#1c425e',
      },
      input: {
        height: 45,
        borderColor: 'gray',
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
        borderColor: 'gray',
      },
      buttonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 18,
      },
})

export default SignIn; 