import React, { useState } from "react";
import { Text, View, TextInput } from "react-native";

//*****PUSH CREDENTUALS TO TABLE*******

const RegisterOrg = ({navigation}: {navigation:any}) =>{

    const [organizationName, setOrganizationName] = useState('');
    const [address, setAddress] = useState('');
    const [capacity, setCapacity] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return(
        <View>
            <Text>Organization Name</Text>
            <TextInput onChangeText={(text) => setOrganizationName(text)} value={organizationName}/>

            <Text>Address</Text>
            <TextInput onChangeText={(text) => setAddress(text)} value={address}></TextInput>

            <Text>Capacity</Text>
            <TextInput onChangeText={(text) => setCapacity(text)} value={capacity}></TextInput>
            
            <Text>Username</Text>
            <Text>Password</Text>



        </View>

        //name
        
        //address
        //occupancy
        //username
        //password

        //internally generate an ID
    )
}

export default RegisterOrg; 