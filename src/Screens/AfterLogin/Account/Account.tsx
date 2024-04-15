import React, { FC, useEffect, useState } from 'react';
import { View, Text, ImageBackground, Image, TouchableWithoutFeedback, Alert } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native-gesture-handler';
import { launchImageLibrary, launchCamera, MediaType, ImagePickerResponse } from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';

//user-define imports
import Button from '../../../Components/CustomButton';
import {
  LoginWith,
  camera,
  drawer,
  gallery,
  pencil,
  profileBack,
  upload,
  userProfile,
} from '../../../Utils/img';
import {
  deviceTxt,
  editProfile,
  galleryTxt,
  pop1Txt,
  pop2Txt,
} from '../../../Utils/constant';
import EditProfile from '../EditProfile';
import { Styles } from './accountStyles';

interface UserData {
  selectedSalutation: string;
  name: string;
  phnNo: string;
  email: string;
  dob: string;
}

const Account: FC = () => {
  const navigation = useNavigation<any>();
  const [postData, setPostData] = useState<UserData | null>(null);
  const [showOptionScreen, setShowOptionScreen] = useState<boolean>(false);
  const [showEditView, setShowEditView] = useState<string>('');
  const [selectedImage, setSelectedImage] = useState<ImagePickerResponse | null>(null);
  const [clickType, setClickType] = useState<string>('');
  const [coverPhoto, setCoverPhoto] = useState<string | null>(null);
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await firestore().collection('users').get();
        const userDataArray = querySnapshot.docs.map(doc => doc.data() as UserData);
        if (userDataArray.length > 0) {
          setPostData(userDataArray[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUserData();
  }, []);

  useEffect(() => {
    if (selectedImage) {
      uploadImage();
    }
  }, [selectedImage]);

  const editProfilePhoto = (): void => {
    setShowEditView('profile');
  };

  const editCoverPhoto = (): void => {
    setShowEditView('cover');
  };

  const uploadCover = (): void => {
    setShowOptionScreen(true);
    setClickType('Cover');
  };

  const uploadProfile = (): void => {
    setShowOptionScreen(true);
    setClickType('Profile');
  };

  const handleGalleryPress = async (): Promise<void> => {
    setShowOptionScreen(false);
    const options = {
      mediaType: 'photo' as MediaType,
    };
    launchImageLibrary(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image selection');
      } else if (response.errorMessage) {
        console.error('Image picker error:', response.errorMessage);
      } else {
        setSelectedImage(response);
        uploadImage();
      }
    });
  };

  const handleCameraPress = async (): Promise<void> => {
    setShowOptionScreen(false);
    const options = {
      mediaType: 'photo' as MediaType,
    };
    launchCamera(options, response => {
      if (response.didCancel) {
        console.log('User cancelled image capture');
      } else if (response.errorMessage) {
        console.error('Camera error:', response.errorMessage);
      } else {
        setSelectedImage(response);
        uploadImage();
      }
    });
  };

  const closeOptionScreen = (): void => {
    setShowOptionScreen(false);
  };

  const closeEditView = (): void => {
    setShowEditView('');
  };

  const uploadImage = async (): Promise<void> => {
    if (selectedImage && selectedImage.assets) {
      try {
        const reference = storage().ref(selectedImage.assets[0].fileName);
        const pathToFile: string = selectedImage?.assets[0]?.uri ?? ''; 
        await reference.putFile(pathToFile);
        const url = await storage()
          .ref(selectedImage.assets[0].fileName)
          .getDownloadURL();
        const email = postData?.email;
        const name = postData?.name;

        await firestore().collection('posts').add({
          image: url,
          email: email,
          name: name,
          timestamp: firestore.Timestamp.now(),
        });

        Alert.alert('Image uploaded successfully!');

        if (clickType === 'Profile') {
          setProfilePhoto(url);
        } else if (clickType === 'Cover') {
          setCoverPhoto(url);
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        Alert.alert('Error uploading image. Please try again.');
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
              {coverPhoto ? (
                <ImageBackground
                  source={{uri: coverPhoto}}
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
              )}
            </View>

            <View style={Styles.allContainers}>
              <View style={Styles.userProfileContainer2}>
                {profilePhoto ? (
                  <Image
                    source={{uri: profilePhoto}}
                    style={Styles.userProfile}
                  />
                ) : (
                  <Button icon={userProfile} iconStyle={Styles.userProfile} onPress={function (): void {
                      throw new Error('Function not implemented.');
                    } } />
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

