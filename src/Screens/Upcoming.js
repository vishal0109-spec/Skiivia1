import {View, Text, StyleSheet} from 'react-native';
import React, { useEffect, useState } from 'react';
import {useDispatch} from 'react-redux';

//user-define imports
import { logOutAction } from '../Redux/Actions/logOutAction';
import Button from '../Components/CustomButton';
import { logoutTxt } from '../Utils/constant';
import { GoogleSignin, statusCodes} from '@react-native-google-signin/google-signin';

const Upcoming = () => {
  const [userInfo,setUserInfo] = useState(null);
  const dispatch = useDispatch();

  useEffect(()=>{
    GoogleSignin.configure({
      webClientId: "363579765475-6ehuog9hiaaftrnv7gahhteij2b9eqnh.apps.googleusercontent.com",
    });
  },[])

  const logOut = async() => {
    try {
      await GoogleSignin.signOut();
      setUserInfo(null); // Remember to remove the user from your app's state as well
      dispatch(logOutAction())
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={Styles.container}>
      <Text>Upcoming Screen</Text>
      <Button 
      style={Styles.button}
      onPress={logOut} title={logoutTxt} />
    </View>
  );
};

export default Upcoming;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#f3b232',
    shadowColor: 'gray',
    height: 30,
    shadowOpacity: 0.2,
    shadowColor: '#000000',
    shadowRadius: 3,
    elevation: 20,
    shadowOffset: {
      width: -2,
      height: 4,
    },
    borderRadius: 10,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
  },
});
