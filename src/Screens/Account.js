import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//user-define imports
import Button from '../Components/CustomButton';
import {logoutTxt} from '../Utils/constant';
import { drawer } from '../Utils/img';
import { useNavigation } from '@react-navigation/native';
import TopTabs from '../Navigation/TopTabNav';
import { logOutAction } from '../Redux/Actions/logOutAction';

const Account = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const logOut = async () => {
    await GoogleSignin.signOut();
    dispatch(logOutAction());
  };
  return (
    <View style={{flex: 1}}>
      <View>
      <Button icon={drawer} iconStyle={Styles.drawerIcon} onPress={()=> navigation.openDrawer()}/>
      </View>
      <View style={Styles.container}>
        <Text style={{fontSize: 16}}>Welcome to Account Screen</Text>
        <Button style={Styles.button} onPress={logOut} title={logoutTxt} />
        <Button style={Styles.button} onPress={()=> navigation.navigate('TopTabs')} title='Top Tabs' />
      </View>
    </View>
  );
};

export default Account;

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
  drawerIcon:{
    tintColor:'gray',
    width: wp(10),
    height: hp(5),
    left:wp(2),
    top:hp(1),
    resizeMode:"cover",
  }
});