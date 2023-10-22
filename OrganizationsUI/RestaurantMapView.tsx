import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

const RestaurantMapView = ({navigation}: {navigation:any}) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    getRes(); // Fetch restaurants when the component mounts
  }, []);

  const getRes = async () => {
    try {
      const response = await axios.get('http://10.253.87.12:9007/getRestaurants', {});
      console.log(response);
      if (response.data.status === 'fail') {
        Alert.alert('No restaurants nearby', null, [{ text: 'OK' }]);
      } else {
        // Process the restaurants and fetch their coordinates
        const restaurantsData = response.data.restaurants;
        const restaurantsWithCoordinates = await fetchCoordinatesForRestaurants(restaurantsData);
        setRestaurants(restaurantsWithCoordinates);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCoordinatesForRestaurants = async (restaurants) => {
    const apiKey = 'AIzaSyAw_IpFvC_OlmTmKns8JqaWzKSZl6YI9yg';
    const restaurantsWithCoordinates = [];

    for (const restaurant of restaurants) {
      const address = restaurant.address;
      const coordinates = await getCoordinatesForAddress(address, apiKey);
      if (coordinates) {
        restaurantsWithCoordinates.push({
          ...restaurant,
          latitude: coordinates.lat,
          longitude: coordinates.lng,
        });
      }
    }

    return restaurantsWithCoordinates;
  };

  const getCoordinatesForAddress = async (address, apiKey) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return location;
      } else {
        console.warn(`Coordinates not found for address: ${address}`);
        return null;
      }
    } catch (error) {
      console.error('Error fetching coordinates:', error);
      return null;
    }
  };

  const callServer = async (restaurant) => {
    try {
      const response = await axios.get(`http://10.253.87.12:9007/getMenu/${restaurant.id}`);
      if (response.data.status === 'fail') {
        Alert.alert('No menu available for this restaurant', null, [{ text: 'OK' }]);
      } else {
        // Process the menu data as needed
        const menuData = response.data.menu;
        // Navigate to the 'MarkerDetails' screen, pass the restaurant and menu data
        navigation.navigate('Markers', { restaurant: restaurant, menu: menuData });
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleMarkerPress = async (restaurant) => {
    try {
      // Replace this with your code to fetch menu data for the restaurant
      const menuData = await callServer(restaurant); // Assuming you have a function to fetch menu data
      navigation.navigate('Markers', { restaurant, menu: menuData });
    } catch (error) {
      console.error('Error fetching menu data:', error);
      // Handle the error, e.g., show an error message
    }
  };
  


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 42.3630543,
          longitude: -71.1263064,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>

        <Marker
        coordinate={{latitude: 42.3630543, longitude: -71.1263064}}
        title='Your Location'/>
        
        {restaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.latitude,
              longitude: restaurant.longitude,
            }}
            title={restaurant.name}
            onPress={() => handleMarkerPress(restaurant)}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default RestaurantMapView;
