import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Import your getNutrients function or the module where it is defined
import { getNutrients } from '../nutrition';

const MarkerDetails = ({ route }) => {
  const { restaurant, menu } = route.params;
  const [nutritionalDetails, setNutritionalDetails] = useState(null);

  useEffect(() => {
    // Assuming that menu.item contains the menu item name
    if (menu.item) {
      // Call the getNutrients function with the menu item name
      getNutrients(menu.item)
        .then(nutritionalData => {
          setNutritionalDetails(nutritionalData);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [menu.item]);

  return (
    <View style={styles.container}>
      <Text style={styles.restaurantName}>{restaurant.name}</Text>
      <Text style={styles.menuTitle}>Menu:</Text>
      <Text style={styles.menuItem}>{menu.item}</Text>
      <Text style={styles.menuTitle}>Nutritional Details:</Text>
      {nutritionalDetails && Object.keys(nutritionalDetails).map(nutrientName => (
        <Text key={nutrientName} style={styles.nutrientItem}>
          {nutrientName}: {nutritionalDetails[nutrientName]}
        </Text>
      ))}
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
  nutrientItem: {
    fontSize: 16,
    marginTop: 4,
  },
});

export default MarkerDetails;
