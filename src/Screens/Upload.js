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

let token = '';
let name = '';
let email = '';

const Upload = () => {
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [error, setError] = useState('');
  const [uploadDisabled, setUploadDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

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

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  uploadImage: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    flexGrow: 1,
  },
  descriptnContainer: {
    flex: 1,
    marginLeft: wp(5),
    marginTop: hp(2),
  },
  uploadTxt: {
    fontSize: hp(3),
    color: 'gray',
  },
  image: {
    width: wp(50),
    height: hp(40),
    tintColor: '#C0C0C0',
    resizeMode: 'contain',
  },
  image2: {
    width: wp(90),
    height: hp(45),
    resizeMode: 'contain',
  },
  imageContainer: {
    margin: wp(5),
    flex: 1,
    backgroundColor: '#DCDCDC',
  },
  btnSubmitTxt: {
    color: 'white',
    textAlign: 'center',
    fontSize: hp(2.2),
  },
  btnSubmit: {
    borderWidth: 1,
    borderColor: '#e8e8e8',
    backgroundColor: '#1877f2',
    shadowOpacity: 0.2,
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 20,
    shadowOffset: {
      width: -2,
      height: 4,
    },
    height: hp(6.3),
    justifyContent: 'center',
    width: wp(90),
    marginBottom: hp(1.2),
    flexDirection: 'row',
    padding: wp(3.2),
    borderRadius: hp(1.3),
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  buttonContainer: {
    flex: 1,
    marginTop: hp(5),
    marginLeft: wp(5),
  },
  descriptinBox: {
    width: wp(90),
    backgroundColor: '#F9F9F9',
    borderRadius: hp(0.7),
    borderColor: '#E8E8E8',
    borderWidth: 1,
    height: hp(15),
    borderStyle: 'solid',
    marginTop: hp(1),
    paddingLeft: wp(3),
  },
  descriptionTxt: {
    fontSize: hp(2),
  },
  errorText: {
    color: 'red',
    fontSize: hp(1.8),
  },
});
