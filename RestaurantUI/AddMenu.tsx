import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";

import * as ImagePicker from 'expo-image-picker';
import { recognizeText } from "./text-recognition";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const createFormData = (photo, body = {}) => {
  const data = new FormData();
  const fileName = 'file://'+ photo.uri;

  data.append(photo.fileName, photo.type, fileName);

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};



const AddMenu = ({ navigation }: { navigation: any }) => {
  let [photo, setPhoto] = React.useState(null);

  const addImage = async () => {
    let photoo = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });
    photo = photoo;
    }

  const handleUploadPhoto = () => {
    fetch("http://10.253.64.216:9007/api/upload", {
      method: 'POST',
      body: createFormData(photo, { userId: '123' }),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log('response', response);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity style={s.touch} onPress={addImage}> 
            <Text style={s.text}>Choose Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={s.touch} onPress={recognizeText}>
          <Text style={s.text}> submit</Text>
          </TouchableOpacity>

          <TextInput placeholder=""></TextInput>
        </View>
      );
    };

const s = StyleSheet.create({
  touch: {
    borderWidth: 3,
    padding: 15,
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 50,
    borderColor: 'black'
  }, 

  text: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
})


export default AddMenu;


/*
{photo && (
            <>
              <Image
                source={{ uri: photo.uri }}
                style={{ width: 300, height: 300 }}
              />
              <Button title="Upload Photo" onPress={handleUploadPhoto} />
            </>
          )}
*/