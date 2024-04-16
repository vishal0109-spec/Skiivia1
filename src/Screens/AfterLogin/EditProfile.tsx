import { View, Text, StyleSheet, TextInput } from 'react-native';
import React, { FC } from 'react';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//user-define imports
import Button from '../../Components/CustomButton';
import { drawer } from '../../Utils/img';
import { useNavigation } from '@react-navigation/native';
import { email2, firstName, lastName, phn, submit } from '../../Utils/constant';

const EditProfile : FC = () => {
    const navigation = useNavigation<any>();

    return (
      <View style={{flex: 1}}>
        <View>
        <Button icon={drawer} iconStyle={Styles.drawerIcon} onPress={()=> navigation.openDrawer()}/>
        </View>
        <View style={Styles.container}>
          <View style={Styles.inputContainer}>
          <Text style={Styles.txtStyle}>{firstName}</Text>
          {/* </View> */}
          <TextInput
          placeholder='first name'
          style={Styles.inputField} />
          <Text style={Styles.txtStyle}>{lastName} </Text>
          <TextInput
          placeholder='Last name'
          style={Styles.inputField} />
          <Text style={Styles.txtStyle}>{email2}</Text>
          <TextInput
          placeholder='Email Address'
          style={Styles.inputField} />
          <Text style={Styles.txtStyle}>{phn} </Text>
          <TextInput
          placeholder='Phone'
          style={Styles.inputField} />
          </View>
          
          <Button title={submit} style={Styles.submitButton} onPress={()=> navigation.openDrawer()}/>
        </View>
      </View>
    );
};

export default EditProfile;

const Styles = StyleSheet.create({
    container: {
      flex: 1,

    },
    inputContainer:{
      // justifyContent:'center',
      // alignItems:'center',
      marginLeft:wp(3)
    },
    txtStyle:{
     fontFamily:'Roboto-Bold',
    //  marginLeft:wp(0.5),
    },
    submitButton: {
      backgroundColor: '#f3b232',
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
      marginBottom: hp(2),
    },
    inputField: {
      width: wp(90),
      backgroundColor: '#F9F9F9',
      borderRadius: hp(0.7),
      borderColor: '#E8E8E8',
      borderWidth: 1,
      height: hp(6),
      borderStyle: 'solid',
      paddingLeft: wp(3),
      color: '#4B4F54',
      fontFamily:'Roboto-Light',
    },
    drawerIcon:{
      tintColor:'gray',
      width: wp(10),
      height: hp(5),
      left:wp(2),
      top:hp(1),
      resizeMode:"cover",
    },
  });