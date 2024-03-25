import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
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
import { drawer } from '../Utils/img';
import { useNavigation } from '@react-navigation/native';

const Notification = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <View>
      <Button icon={drawer} iconStyle={Styles.drawerIcon} onPress={()=> navigation.openDrawer()}/>
      </View>
      <View style={Styles.container}>
        <Text style={{fontSize: 16}}>Welcome to Notification Screen</Text>
      </View>
    </View>
  );
};

export default Notification;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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