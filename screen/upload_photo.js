import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import ImageResizer from 'react-native-image-resizer';

const UploadScreen = () => {
  const [image, setImage] = useState(null);

  const pickImage = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        resizeImage(response.uri);
      }
    });
  };

  const resizeImage = async (uri) => {
    const resizedImage = await ImageResizer.createResizedImage(
      uri,
      500,
      500,
      'JPEG',
      80
    );
    saveImage(resizedImage.uri);
  };

  const saveImage = async (uri) => {
    const date = new Date();
    const name = `IMG_${date.getFullYear()}${date.getMonth() +
      1}${date.getDate()}_${date.getHours()}${date.getMinutes()}${date.getSeconds()}.jpg`;
    const path = `${RNFS.DocumentDirectoryPath}/${name}`;

    RNFS.copyFile(uri, path)
      .then(() => {
        setImage(path);
        Alert.alert('Image saved successfully!');
      })
      .catch((error) => {
        console.log('Error saving image: ', error);
      });
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#f0f0f0', padding: 20 }}>
      <TouchableOpacity
        style={{
          borderWidth: 1,
          borderColor: '#ccc',
          padding: 10,
          borderRadius: 5,
          alignItems: 'center',
          marginBottom: 20,
        }}
        onPress={pickImage}
      >
        <Text style={{ fontSize: 18 }}>Choose Image</Text>
      </TouchableOpacity>

      {image && (
        <Image
          source={{ uri: `file://${image}` }}
          style={{ width: '100%', height: 300, marginBottom: 20 }}
          resizeMode="contain"
        />
      )}

      {image && (
        <TouchableOpacity
          style={{
            borderWidth: 1,
            borderColor: '#ccc',
            padding: 10,
            borderRadius: 5,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 18 }}>Save Image</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UploadScreen;