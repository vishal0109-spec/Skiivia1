import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {camera} from '../Utils/img';
import Button from '../Components/CustomButton';
import {descriptinBoxTxt, uploadPostTxt, uploadTxt} from '../Utils/constant';

const Upload = () => {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(camera);
  const [initialImageLoaded, setInitialImageLoaded] = useState(false);

  
  useEffect(() => {
    setSelectedImage(camera);
    setInitialImageLoaded(true);
  }, []);

  console.log('Initial selected image:', selectedImage);

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    };
  
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response.uri || response.assets?.[0]?.uri;
        console.log('Selected image:', imageUri);
        setSelectedImage(imageUri);
      }
    });
  };
  

  const handlePostUpload = () => {
    firestore()
      .collection('posts')
      .add({
        description,
        image: selectedImage,
        timestamp: firestore.Timestamp.now(),
      })
      .then(() => {
        console.log('Post uploaded successfully!');
        setDescription('');
        setSelectedImage(camera);
      })
      .catch(error => {
        console.error('Error uploading post: ', error);
      });
  };

  console.log('Current image:', selectedImage);

  return (
    <View style={{flex: 1, padding: 20}}>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 18}}>Enter Description:</Text>
        <TextInput
          style={Styles.descriptinBox}
          multiline
          placeholder={descriptinBoxTxt}
          value={description}
          onChangeText={text => setDescription(text)}
        />
      </View>

      <View style={Styles.imageContainer}>
        {selectedImage && typeof selectedImage === 'string' && (
          <Image
            source={{ uri: selectedImage }}
            style={Styles.image} // Adjust the style for the image
            resizeMode="contain"
          />
        )}
        <View >
        <Button
          title={uploadTxt}
          onPress={handleImageUpload}
          btnStyle={Styles.uploadTxt}
        />
        </View>
        
      </View>

      <View>
        <Button
          style={Styles.btnSubmit}
          onPress={handlePostUpload}
          title={uploadPostTxt}
          btnStyle={Styles.btnSubmitTxt}
        />
      </View>
    </View>
  );
};

export default Upload;

const Styles = StyleSheet.create({
  uploadTxt: {
    fontSize: 20,
    marginTop: hp(2),
  },
  image: {
    width: wp(90), // Adjust the width as needed
    height: hp(50), // Adjust the height as needed
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center' ,
    marginTop: 40,
    flex: 1,
  },
  btnSubmitTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
  btnSubmit: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 90,
  },
  descriptinBox: {
    width: wp(90),
    backgroundColor: '#F9F9F9',
    borderRadius: hp(0.7),
    borderColor: '#E8E8E8',
    borderWidth: 1,
    height: hp(15),
    borderStyle: 'solid',
    marginTop: hp(2),
    paddingLeft: wp(3),
  },
});
