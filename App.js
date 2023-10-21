import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//screens 
import NewUserScreen from './SharedUI/NewUser';
import RegisterOrg from './OrganizationsUI/RegisterOrg';
import RegisterRes from './RestaurantUI/RegisterRes'; 
import RestaurantMapView from './OrganizationsUI/RestaurantTableView';
import SignIn from './SharedUI/SignIn';
import AddMenu from './RestaurantUI/AddMenu'

const Stack = createNativeStackNavigator(); 

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='newUser'>
        <Stack.Screen name="newUser" component={NewUserScreen} options={{title: "Register New User"}}></Stack.Screen>
        <Stack.Screen name="RegisterRes" component={RegisterRes} options={{title: "Register"}}></Stack.Screen>
        <Stack.Screen name="RegisterOrg" component={RegisterOrg} options={{title: "Register"}}></Stack.Screen>
        <Stack.Screen name="MapScreen" component={RestaurantMapView} options={{title: "Map View"}}></Stack.Screen> 
        <Stack.Screen name="SignIn" component={SignIn} options={{title: "Sign In"}}></Stack.Screen>
        <Stack.Screen name='AddMenu' component={AddMenu} options={{title: "Add Menu"}}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}


