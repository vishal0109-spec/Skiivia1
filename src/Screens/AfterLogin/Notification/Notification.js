import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//user-define imports
import Button from '../../../Components/CustomButton';
import { drawer } from '../../../Utils/img';
import { useNavigation } from '@react-navigation/native';
import TopTabs from '../../../Navigation/TopTabNav';


const Notification = () => {
  const navigation = useNavigation();

  return (
    <View style={{flex: 1}}>
      <View>
      <Button icon={drawer} iconStyle={Styles.drawerIcon} onPress={()=> navigation.openDrawer()}/>
      </View>
      <View style={Styles.container}>
        <Text style={{fontSize: 16}}>Welcome to Notification Screen</Text>
        <Button style={Styles.button} onPress={()=> navigation.navigate('TopTabs')} title='Top Tabs' />
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