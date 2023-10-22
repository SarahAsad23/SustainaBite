import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MarkerDetails = ({ route }) => {
  const { restaurant, menu } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text style={styles.menuTitle}>Menu:</Text>
      {menu ? (
        menu.map((menuItem, index) => (
          <View key={index}>
            <Text style={styles.menuItem}>Item: {menuItem.item}</Text>
            <Text style={styles.menuItem}>Ingredients: {menuItem.ingredients}</Text>
            <Text style={styles.menuItem}>Servings: {menuItem.servings}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.menuItem}>No menu available</Text>
      )}
    </View>
  );
  
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
  },
  menuItem: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default MarkerDetails;
