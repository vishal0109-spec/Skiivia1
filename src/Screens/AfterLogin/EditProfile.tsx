import {View, Text, StyleSheet, TextInput, Alert} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';

//user-define imports
import Button from '../../Components/CustomButton';
import {drawer} from '../../Utils/img';
import {email2, firstName, lastName, phn, submit} from '../../Utils/constant';

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};
const EditProfile: FC = () => {
  const navigation = useNavigation<any>();
  const [userData, setUserData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
  });

  const fetchUserData = async () => {
    try {
      const currentUser = await firestore()
        .collection('users')
        .doc('userID')
        .get();
      if (currentUser.exists) {
        const userData = currentUser.data() as UserData; 
        setUserData(userData);
      }
    } catch (error) {
      console.error('Error fetching user data: ', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSubmit = async () => {
    try {
      await firestore().collection('users').doc('userID').update(userData);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile: ', error);
      Alert.alert('Error', 'Failed to update profile. Please try again later.');
    }
  };

  const handleInputChange = (key: string, value: string) => {
    setUserData(prevUserData => ({
      ...prevUserData,
      [key]: value,
    }));
  };

  return (
    <View style={{flex: 1}}>
      <Button
        icon={drawer}
        iconStyle={Styles.drawerIcon}
        onPress={() => navigation.openDrawer()}
      />
      <View style={Styles.container}>
        <View style={Styles.inputContainer}>
          <View>
            <Text style={Styles.txtStyle}>{firstName}</Text>
            <TextInput
              placeholder="First name"
              style={Styles.inputField}
              value={userData.firstName}
              onChangeText={value => handleInputChange('firstName', value)}
            />
          </View>
          <View>
            <Text style={Styles.txtStyle}>{lastName} </Text>
            <TextInput
              placeholder="Last name"
              style={Styles.inputField}
              value={userData.lastName}
              onChangeText={value => handleInputChange('lastName', value)}
            />
          </View>

          <View>
            <Text style={Styles.txtStyle}>{email2}</Text>
            <TextInput
              placeholder="Email Address"
              style={Styles.inputField}
              value={userData.email}
              onChangeText={value => handleInputChange('email', value)}
            />
          </View>

          <View>
            <Text style={Styles.txtStyle}>{phn} </Text>
            <TextInput
              placeholder="Phone"
              style={Styles.inputField}
              value={userData.phone}
              onChangeText={value => handleInputChange('phone', value)}
            />
          </View>
        </View>

        <Button
          title={submit}
          btnStyle={Styles.btnTxt}
          style={Styles.submitButton}
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
};

export default EditProfile;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btnTxt: {
    color: '#fff',
    fontSize: hp(2.4),
    fontWeight: '500',
    fontFamily: 'Roboto-Regular',
  },
  inputContainer: {
    marginLeft: wp(4),
    marginTop: hp(3.5),
    gap: hp(2.8),
  },
  txtStyle: {
    fontFamily: 'Roboto-Bold',
    fontSize: hp(2.2),
  },
  submitButton: {
    backgroundColor: '#996600',
    shadowColor: 'gray',
    height: hp(6.3),
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 20,
    shadowOffset: {
      width: -2,
      height: 4,
    },
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: wp(90),
    marginLeft: wp(4),
    marginTop: hp(8),
  },
  inputField: {
    width: wp(90),
    marginTop: hp(0.5),
    backgroundColor: '#F9F9F9',
    borderRadius: hp(0.7),
    borderColor: '#E8E8E8',
    borderWidth: 1,
    height: hp(6),
    borderStyle: 'solid',
    paddingLeft: wp(3),
    color: '#4B4F54',
    fontFamily: 'Roboto-Light',
  },
  drawerIcon: {
    tintColor: 'gray',
    width: wp(10),
    height: hp(5),
    left: wp(2),
    top: hp(1),
    resizeMode: 'cover',
  },
});
