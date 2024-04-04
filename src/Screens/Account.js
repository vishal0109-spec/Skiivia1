import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

//user-define imports
import Button from '../Components/CustomButton';
import {
  LoginWith,
  camera,
  drawer,
  gallery,
  pencil,
  profileBack,
  upload,
  userProfile,
} from '../Utils/img';
import {
  deviceTxt,
  editProfile,
  galleryTxt,
  pop1Txt,
  pop2Txt,
} from '../Utils/constant';
import EditProfile from './EditProfile';
import { Styles } from './accountStyles';

const Account = () => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState([]);
  const [showOptionScreen, setShowOptionScreen] = useState(false);
  const [showEditView, setShowEditView] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [clickType, setClickType] = useState('');
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePhoto, setProfilePhoto] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await firestore().collection('users').get();
        const userDataArray = querySnapshot.docs.map(doc => doc.data());
        if (userDataArray.length > 0) {
          setPostData(userDataArray[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUserData();
  }, []);

  const editProfilePhoto = () => {
    setShowEditView('profile');
  };

  const editCoverPhoto = () => {
    setShowEditView('cover');
  };

  const uploadCover = () => {
    setShowOptionScreen(true);
    setClickType('Cover');
  };

  const uploadProfile = () => {
    setShowOptionScreen(true);
    setClickType('Profile');
  };

  const handleGalleryPress = async () => {
    setShowOptionScreen(false);
    const options = {
      mediaType: 'photo',
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.error) {
        console.error('Image picker error:', response.error);
      } else {
        let source = response;
        setSelectedImage(source);
        uploadImage();
      }
    });
  };

  const handleCameraPress = async () => {
    setShowOptionScreen(false);
    const options = {
      mediaType: 'photo',
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image capture');
      } else if (response.error) {
        console.error('Camera error:', response.error);
      } else {
        let source = response;
        setSelectedImage(source);
        uploadImage();
      }
    });
  };

  const closeOptionScreen = () => {
    setShowOptionScreen(false);
  };

  const closeEditView = () => {
    setShowEditView(false);
  };

  const uploadImage = async () => {
    if (selectedImage && selectedImage.assets) {
      try {
        const reference = storage().ref(selectedImage.assets[0].fileName);
        const pathToFile = selectedImage.assets[0].uri;
        await reference.putFile(pathToFile);

        const url = await storage()
          .ref(selectedImage.assets[0].fileName)
          .getDownloadURL();
        const email = postData.email;
        const name = postData.name;

        await firestore().collection('posts').add({
          image: url,
          email: email,
          name: name,
          timestamp: firestore.Timestamp.now(),
        });

        alert('Image uploaded successfully!');

        if (clickType === 'Profile') {
          setProfilePhoto(selectedImage);
        } else if (clickType === 'Cover') {
          setCoverPhoto(selectedImage);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        alert('Error uploading image. Please try again.');
      } finally {
        setSelectedImage(null);
      }
    }
  };

  return (
    <SafeAreaView style={Styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
        <TouchableWithoutFeedback onPress={closeEditView}>
          <View style={Styles.allContainers}>
            <View style={Styles.allContainers}>
              {coverPhoto == null ? (
                <ImageBackground
                  source={profileBack}
                  style={Styles.profileBack}>
                  <View style={Styles.topNav}>
                    <Button
                      icon={drawer}
                      iconStyle={Styles.drawerIcon}
                      onPress={() => navigation.openDrawer()}
                    />
                    <Button
                      icon={pencil}
                      style={Styles.pencilBtn}
                      iconStyle={Styles.pencilIcon}
                      onPress={editCoverPhoto}
                    />
                  </View>
                </ImageBackground>
              ) : (
                <ImageBackground
                  source={{uri: coverPhoto.assets[0].uri}}
                  style={Styles.profileBack}>
                  <View style={Styles.topNav}>
                    <Button
                      icon={drawer}
                      iconStyle={Styles.drawerIcon}
                      onPress={() => navigation.openDrawer()}
                    />
                    <Button
                      icon={pencil}
                      style={Styles.pencilBtn}
                      iconStyle={Styles.pencilIcon}
                      onPress={editCoverPhoto}
                    />
                  </View>
                </ImageBackground>
              )}
            </View>

            <View style={Styles.allContainers}>
              <View style={Styles.userProfileContainer2}>
                {profilePhoto == null ? (
                  <Button icon={userProfile} iconStyle={Styles.userProfile} />
                ) : (
                  <Image
                    source={{uri: profilePhoto.assets[0].uri}}
                    style={Styles.userProfile}
                  />
                )}

                <Button
                  icon={pencil}
                  style={Styles.pencilBtn2}
                  iconStyle={Styles.pencilIcon}
                  onPress={editProfilePhoto}
                />
              </View>
              <View style={Styles.profileTxtContainer}>
                <Text style={Styles.drawerIconTxt}>
                  {postData ? postData.name : 'User'}
                </Text>
                <Button
                  title={editProfile}
                  style={Styles.editProfileButton}
                  icon={pencil}
                  iconStyle={Styles.pencilIcon3}
                  btnStyle={Styles.profileTxt}
                  onPress={() => navigation.navigate(EditProfile)}
                />
              </View>
            </View>

            <View style={{flex: 1, backgroundColor: '#fff'}}>
              <View style={Styles.infoContainer}>
                <Text style={Styles.infoTxt}>Salutation</Text>
                <Text style={Styles.infoTxt2}>
                  {postData ? postData.selectedSalutation : ''}
                </Text>
              </View>
              <Image style={Styles.partition} source={LoginWith} />
              <View style={Styles.infoContainer}>
                <Text style={Styles.infoTxt}>Full Name</Text>
                <Text style={Styles.infoTxt2}>
                  {postData ? postData.name : 'User'}
                </Text>
              </View>
              <Image style={Styles.partition} source={LoginWith} />
              <View style={Styles.infoContainer}>
                <Text style={Styles.infoTxt}>Phn No.</Text>
                <Text style={Styles.infoTxt2}>
                  {postData ? postData.phnNo : ''}
                </Text>
              </View>
              <Image style={Styles.partition} source={LoginWith} />
              <View style={Styles.infoContainer}>
                <Text style={Styles.infoTxt}>Email Address</Text>
                <Text style={Styles.infoTxt2}>
                  {postData ? postData.email : ''}
                </Text>
              </View>
              <Image style={Styles.partition} source={LoginWith} />
              <View style={Styles.infoContainer}>
                <Text style={Styles.infoTxt}>DOB</Text>
                <Text style={Styles.infoTxt2}>
                  {postData ? postData.dob : ''}
                </Text>
              </View>
              <Image style={Styles.partition} source={LoginWith} />
            </View>
            {showEditView === 'profile' && (
              <View style={Styles.editViewContainer2}>
                <Button
                  title={pop1Txt}
                  btnStyle={Styles.editTextContainer}
                  icon={upload}
                  iconStyle={Styles.arrowBtn}
                  style={Styles.btnProfile}
                  onPress={uploadProfile}
                />
              </View>
            )}
            {showEditView === 'cover' && (
              <View style={Styles.editViewContainer1}>
                <Button
                  title={pop2Txt}
                  btnStyle={Styles.editTextContainer}
                  icon={upload}
                  iconStyle={Styles.arrowBtn}
                  style={Styles.btnProfile}
                  onPress={uploadCover}
                />
              </View>
            )}

            {showOptionScreen && (
              <TouchableWithoutFeedback onPress={closeOptionScreen}>
                <View style={Styles.optionContainer}>
                  <View style={Styles.editImageView}>
                    <View style={Styles.uploadPhotoTextContainer}>
                      <Text style={Styles.uploadPhotoText}>Upload Photo</Text>
                    </View>

                    <View style={Styles.editImageButtons}>
                      <Button
                        icon={gallery}
                        style={Styles.selectBtn}
                        title={galleryTxt}
                        onPress={handleGalleryPress}
                        iconStyle={Styles.imageBtn}
                        btnStyle={Styles.btnTxt}
                      />
                      <Text
                        style={{
                          alignSelf: 'center',
                          fontSize: 14,
                          fontWeight: '300',
                        }}>
                        or
                      </Text>
                      <Button
                        icon={camera}
                        title={deviceTxt}
                        style={Styles.selectBtn}
                        onPress={handleCameraPress}
                        iconStyle={Styles.imageBtn}
                        btnStyle={Styles.btnTxt}
                      />
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            )}
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;
