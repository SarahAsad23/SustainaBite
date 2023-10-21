import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import NewUserScreen from './OrganizationsUI/NewUser';

const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="newUser" component={NewUserScreen} options={{headerShown: false}}></Stack.Screen>

      </Stack.Navigator>
    </NavigationContainer>
  );
}


