import React from "react";

import {TouchableOpacity, View, Text, StyleSheet} from 'react-native'; 

const NewUserScreen = ({navigation}: {navigation:any}) => {

    const handleResRegistration = () => {
        // Navigate to the "RegisterRes" screen when registering as a restaurant
        navigation.navigate('RegisterRes');
      };

    const handleOrgRegistration = () => {
    // Navigate to the "RegisterRes" screen when registering as a restaurant
    navigation.navigate('RegisterOrg');
    };  

    const handleLogin = () => {
        navigation.navigate('SignIn'); 
    }

    return(
        <View style={styles.view}> 
            <TouchableOpacity style={styles.touchStyle1} onPress={handleResRegistration}>
                <Text style={styles.textStyle}>Register as Restaurant</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.touchStyle2} onPress={handleOrgRegistration}>
                <Text style={styles.textStyle}>Register as Organization</Text>
            </TouchableOpacity>

            <View style={styles.login}>
                <TouchableOpacity onPress={handleLogin}>
                    <Text style={styles.loginText}>Already a user? Sign in</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        backgroundColor: 'white',
        flex: 1,
    },
    touchStyle1: {
        borderWidth: 3,
        borderRadius: 5,
        borderColor: 'black',
        marginTop: 75, 
        marginRight: 30, 
        marginLeft: 30,
        padding: 50, 
        alignItems: 'center', 
        backgroundColor: 'white',
    }, 
    touchStyle2: {
        borderWidth: 3,
        borderRadius: 5,
        borderColor: 'black',
        marginTop: 50, 
        marginRight: 30, 
        marginLeft: 30,
        padding: 50, 
        alignItems: 'center',
        backgroundColor: 'white', 
    },
    textStyle: {
        fontSize: 20,
        color: 'black',
        fontWeight: 'bold',
    },
    login: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 100,
    },
    loginText:{
        color: 'blue',
        fontSize: 18,
    },
});

export default NewUserScreen; 