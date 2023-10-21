import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import ImagePicker from "react-native-image-crop-picker";

const AddMenu = ({ navigation }: { navigation: any }) => {
  const openImagePicker = () => {
    ImagePicker.openPicker({
      multiple: false,
      mediaType: "photo",
    })
      .then((image) => {
        if (image) {
          const selectedImage = image;
          console.log("Selected image URI: " + selectedImage.path);
          // Handle the selected image as needed
        }
      })
      .catch((error) => {
        console.log("ImagePicker Error: ", error);
      });
  };

  return (
    <View style={styles.container}>
      <Text>Add your menu for fast and easy food postings!</Text>
      <Button title="Select Image" onPress={openImagePicker} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddMenu;
