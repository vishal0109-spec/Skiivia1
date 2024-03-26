import {View, Text, StyleSheet, ImageBackground, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';

//user-define imports
import Button from '../Components/CustomButton';
import {
  LoginWith,
  drawer,
  pencil,
  profileBack,
  userProfile,
} from '../Utils/img';
import {editProfile} from '../Utils/constant';

const Account = () => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState([]);

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

  return (
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
                <Button icon={pencil} iconStyle={Styles.pencilIcon} />
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

              <Button icon={pencil} iconStyle={Styles.pencilIcon2} />
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Account;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
    color:'gray'
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
    width: wp(8),
    height: hp(4),
    top: hp(2),
    right: wp(3),
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: wp(5),
    backgroundColor: 'white',
    resizeMode: 'cover',
  },
  pencilIcon2: {
    width: wp(8),
    height: hp(4),
    left: wp(-7),
    top: hp(1.8),
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: wp(5),
    backgroundColor: 'white',
    resizeMode: 'cover',
  },
  pencilIcon3: {
    width: wp(6),
    height: hp(3),
    right: wp(1),
    borderColor: 'white',
    borderWidth: 1.5,
    borderRadius: wp(5),
    backgroundColor: 'white',
    resizeMode: 'cover',
  },
  profileBack: {
    height: hp(28),
  },
  userProfile: {
    width: wp(30),
    height: hp(15),
    marginTop: hp(-8),
    marginLeft: wp(8),
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
