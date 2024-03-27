import {View, Text, StyleSheet, ImageBackground, Image, TouchableWithoutFeedback} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
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

const Account = () => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState([]);
  const [showOptionScreen, setShowOptionScreen] = useState(false);
  const [showEditView, setShowEditView] = useState(false); 
  const [selectedImage, setSelectedImage] = useState(null);
  const [clickType ,setClickType]=useState('');

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
  
  const uploadCover =()=>{
    setShowOptionScreen(true);
    setClickType('Cover');
  }

  const uploadProfile =()=>{
    setShowOptionScreen(true);
    setClickType('Profile');
  }

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
        uploadImage(source); 
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
        let source =  response;
        setSelectedImage(source); 
        uploadImage(source); 
      }
    });
  };

  const closeOptionScreen = () => {
    setShowOptionScreen(false);
  };

  console.log(selectedImage);
  const uploadImage = async () => {
    
    // setLoading(true);
    try {
      const reference = storage().ref(selectedImage.assets[0].fileName);
      const pathToFile = selectedImage.assets[0].uri;
      await reference.putFile(pathToFile);
      // setLoading(false);
    } catch (e) {
      console.log(e);
    }
    setSelectedImage(null);
    setError('');
    const url = await storage().ref(selectedImage.assets[0].fileName).getDownloadURL();

    firestore()
      .collection('posts')
      .add({
        image: url,
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
    <TouchableWithoutFeedback onPress={closeOptionScreen}>
      <SafeAreaView style={Styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <ImageBackground source={profileBack} style={Styles.profileBack}>
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
          </View>

          <View style={Styles.userProfileContainer}>
            <View style={Styles.userProfileContainer2}>
              {postData && postData.photo ? (
                <Image
                  source={{uri: postData.photo}}
                  style={Styles.userProfile2}
                />
              ) : (
                <Button icon={userProfile} iconStyle={Styles.userProfile} />
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
              />
            </View>
          </View>

          <View style={{flex: 1}}>
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
          {showEditView &&
            (showEditView === 'profile' ? (
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
            ) : (
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
            ))}
          {showOptionScreen && (
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
                  <Text style={{alignSelf: 'center', fontSize: 15}}>or</Text>
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
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
    </TouchableWithoutFeedback>
    
  );
};

export default Account;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  btnProfile: {
    flexDirection: 'row',
    width: wp(40),
    backgroundColor: '#fff',
    height: hp(4),
    borderRadius: wp(2),
  },
  arrowBtn: {
    width: wp(4),
    height: hp(4),
    resizeMode: 'contain',
    alignSelf: 'center',
    marginLeft: wp(1),
  },
  editViewContainer1: {
    position: 'absolute',
    top: hp(6),
    right: wp(5),
  },
  editViewContainer2: {
    position: 'absolute',
    top: hp(34),
    right: wp(1),
    justifyContent: 'center',
    alignItems: 'center',
  },
  editTextContainer: {
    alignSelf: 'center',
    marginLeft: wp(2),
    fontWeight: '400',
    fontSize: hp(1.7),
  },
  optionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectBtn: {
    backgroundColor: '#e6fffa',
    width: wp(28),
    height: hp(14),
    borderRadius: 10,
    margin: hp(2.5),
    justifyContent: 'center',
  },
  editImageView: {
    backgroundColor: '#fff',
    height: hp(26.5),
    width: wp(80),
    alignSelf: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  btnTxt: {
    color: 'gray',
    textAlign: 'center',
    fontWeight: '300',
    fontSize: hp(1.8),
    marginTop: hp(1),
  },
  imageBtn: {
    height: hp(5),
    width: wp(10),
    alignSelf: 'center',
    marginTop: hp(2),
  },
  uploadPhotoText: {
    color: '#fff',
    marginLeft: wp(2),
    fontWeight: '400',
    fontSize: hp(2.5),
  },
  uploadPhotoTextContainer: {
    backgroundColor: '#00ccff',
    height: hp(7),
    justifyContent: 'center',
    borderTopLeftRadius: wp(5),
    borderTopRightRadius: wp(5),
  },
  editImageButtons: {
    flexDirection: 'row',
  },
  partition: {
    width: wp(100),
    resizeMode: 'cover',
    marginTop: hp(2.5),
  },
  infoContainer: {
    flexDirection: 'row',
    marginTop: hp(2.5),
    justifyContent: 'space-between',
  },
  editProfileButton: {
    flexDirection: 'row-reverse',
    marginTop: hp(0.5),
    marginBottom: hp(3),
  },
  drawerIconTxt: {
    fontSize: hp(3),
    fontWeight: '600',
    alignSelf: 'center',
  },
  infoTxt: {
    fontSize: hp(2),
    fontWeight: '500',
    alignSelf: 'stretch',
    marginLeft: wp(3),
  },
  infoTxt2: {
    fontSize: hp(2),
    fontWeight: '500',
    alignSelf: 'stretch',
    marginRight: wp(3),
    color: 'gray',
  },
  profileTxt: {
    color: 'gray',
  },
  topNav: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileTxtContainer: {
    alignSelf: 'center',
    marginTop: hp(1),
  },
  drawerIcon: {
    tintColor: 'white',
    width: wp(10),
    height: hp(5),
    left: wp(2),
    top: hp(1),
    resizeMode: 'cover',
  },
  pencilIcon: {
    width: wp(6),
    height: hp(3),
    top: hp(0.5),
    resizeMode: 'cover',
    alignSelf:'center',
    justifyContent:'center'
  },
  pencilBtn: {
    width: wp(8),
    height: hp(4),
    top: hp(2),
    right: wp(2),
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: wp(5),
    backgroundColor: 'white',
  },
  pencilBtn2: {
    width: wp(8),
    height: hp(4),
    top: hp(2),
    right: wp(8),
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: wp(5),
    backgroundColor: 'white',
  },
  pencilIcon3: {
    width: wp(6),
    height: hp(3),
    top: hp(-0.5),
    left:wp(-1),
    resizeMode: 'cover',
    alignSelf:'center',
    justifyContent:'center'
  },
  profileBack: {
    height: hp(28),
  },
  userProfile: {
    width: wp(30),
    height: hp(15),
    marginTop: hp(-8),
    marginLeft: wp(8),
    borderColor:'white',
    borderRadius:wp(15),
    borderWidth:2,
  },
  userProfile2: {
    width: wp(30),
    height: hp(15),
    marginTop: hp(-8),
    marginLeft: wp(8),
    borderRadius: wp(15),
  },
  userProfileContainer2: {
    alignSelf: 'center',
    flexDirection: 'row',
  },
  userProfileContainer: {
    flex: 1,
    backgroundColor: '#e6fffa',
  },
});
