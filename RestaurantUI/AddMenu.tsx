import React from "react";

import { View, Text, Button, StyleSheet } from "react-native";


const AddMenu = ({ navigation }: { navigation: any }) => {
  

  return (
    <View style={styles.container}>
      <Text>Add your menu for fast and easy food postings!</Text>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddMenu;
