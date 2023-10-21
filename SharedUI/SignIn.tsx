import React, {useState} from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";


const SignIn = ({navigation}: {navigation: any}) => {
    const [username, setUsername] = useState('');
   const [password, setPassword] = useState('');

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

        <TouchableOpacity style={styles.button}>
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