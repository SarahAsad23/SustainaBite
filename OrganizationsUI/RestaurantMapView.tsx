import React from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, {Marker} from 'react-native-maps';

const RestaurantMapView = () => {

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 42.3630543,
          longitude: -71.1263064,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {/* Marker */}
        <Marker
        coordinate={{latitude: 42.3630543, longitude: -71.1263064}}
        title='Your Location'/>

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

