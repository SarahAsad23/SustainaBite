import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens 
import NewUserScreen from './NewUser';

const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='newUser'>
        <Stack.Screen name="newUser" component={NewUserScreen} options={{title: "Register New User"}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


