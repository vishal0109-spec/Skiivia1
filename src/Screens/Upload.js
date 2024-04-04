import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import {camera} from '../Utils/img';
import Button from '../Components/CustomButton';
import {
  descriptinBoxTxt,
  descriptionTxt,
  uploadPostTxt,
  uploadTxt,
} from '../Utils/constant';
import {ScrollView} from 'react-native-gesture-handler';
import storage from '@react-native-firebase/storage';
import LoaderScreen from './LoaderScreen';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Styles } from './uploadStyles';

let token = '';
let name = '';
let email = '';

const Upload = () => {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const wordCount = description.trim().length;
    if (wordCount >= 80 || selectedImage) {
      setUploadDisabled(false);
      setError('');
    } else {
      setUploadDisabled(true);
    }
  }, [description, selectedImage]);

  useEffect(() => {
    getFcmToken();
  }, []);

  const getFcmToken = async () => {
    name = await AsyncStorage.getItem('Name');
    email = await AsyncStorage.getItem('Email');
  };

  const handleImageUpload = () => {
    const options = {
      mediaType: 'photo',
      noData: true,
      maxHeight: 2000,
      maxWidth: 2000,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else {
        let imageUri = response;
        setSelectedImage(imageUri);
        setError('');
      }
    });
  };

  const handlePostUpload = async () => {
    if (!description.trim() && !selectedImage) {
      alert('Error, Please provide a description or upload an image.');
      return;
    }

    if (description.trim().length < 80) {
      setError('Description should be 80-100 characters long.');
    }
    setLoading(true);
    try {
      const reference = storage().ref(selectedImage.assets[0].fileName);
      const pathToFile = selectedImage.assets[0].uri;
      await reference.putFile(pathToFile);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
    setDescription('');
    setSelectedImage(null);
    setError('');
    const url = await storage()
      .ref(selectedImage.assets[0].fileName)
      .getDownloadURL();

    firestore()
      .collection('posts')
      .add({
        image: url,
        description: description,
        email: email,
        name: name,
        timestamp: firestore.Timestamp.now(),
      })
      .then(() => {
        alert('Post uploaded successfully!');
      })
      .catch(error => {
        console.error('Error uploading post: ', error);
        alert('Error', 'Failed to upload post. Please try again later.');
      });
     
  };

  return (
    <>
      {loading ? (
        <LoaderScreen />
      ) : (
        <View style={Styles.container}>
          <ScrollView contentContainerStyle={Styles.container2}>
            <View style={Styles.descriptnContainer}>
              <Text style={Styles.descriptionTxt}>{descriptionTxt}</Text>
              <TextInput
                style={Styles.descriptinBox}
                multiline
                placeholder={descriptinBoxTxt}
                value={description}
                onChangeText={text => setDescription(text)}
              />
              {error ? <Text style={Styles.errorText}>{error}</Text> : null}
            </View>

            <View style={Styles.imageContainer}>
              {selectedImage == null ? (
                <View style={{flex: 1}}>
                  <Button
                    title={uploadTxt}
                    style={Styles.uploadImage}
                    icon={camera}
                    iconStyle={Styles.image}
                    onPress={handleImageUpload}
                    btnStyle={Styles.uploadTxt}
                  />
                </View>
              ) : (
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: 1,
                    backgroundColor: '#fff',
                  }}>
                  <Image
                    source={{uri: selectedImage.assets[0].uri}}
                    style={Styles.image2}
                    resizeMode="contain"
                  />
                  <Button
                    title={uploadTxt}
                    style={Styles.uploadImage}
                    onPress={handleImageUpload}
                    btnStyle={Styles.uploadTxt}
                  />
                </View>
              )}
            </View>

            <View style={Styles.buttonContainer}>
              <Button
                style={[
                  Styles.btnSubmit,
                  uploadDisabled ? Styles.disabledButton : null,
                ]}
                onPress={handlePostUpload}
                title={uploadPostTxt}
                btnStyle={Styles.btnSubmitTxt}
                disabled={uploadDisabled}
              />
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Upload;
