import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

//user define imports
import {camera, dots, search, userWsp} from '../../../Utils/img';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../../Components/CustomButton';
import { useNavigation } from '@react-navigation/native';
import { mySpace } from '../../../Utils/constant';

const Messages = [
  {
    id: '1',
    userName: 'Anurag',
    userImg: userWsp,
    messageTime: '4 mins ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '2',
    userName: 'Vishal',
    userImg: userWsp,
    messageTime: '2 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '3',
    userName: 'Vinay',
    userImg: userWsp,
    messageTime: '1 hours ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '4',
    userName: 'Samarth',
    userImg: userWsp,
    messageTime: '1 day ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
  {
    id: '5',
    userName: 'Sahil',
    userImg: userWsp,
    messageTime: '2 days ago',
    messageText:
      'Hey there, this is my test for a post of my social app in React Native.',
  },
];

const MessagesScreen = () => {
  const navigation= useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <View style={Styles.container}>
      <View style={Styles.topBarContainer}>
        <Text style={Styles.myspaceTxt}>{mySpace}</Text>
        <Button 
        icon={camera}
        iconStyle={Styles.cameraIcon}
        style={Styles.camerabtn}
        />
        <Button 
        icon={dots}
        iconStyle={Styles.cameraIcon}
        style={Styles.dotbtn}
        />

      </View>
      <View style={Styles.searchContainer}>
        <TextInput
          placeholder="Search..."
          style={Styles.searchContainer2}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
        <Button icon={search} iconStyle={Styles.searchIcon} />
      </View>
      <FlatList
       data={Messages.filter(user => user.userName.toLowerCase().includes(searchQuery.toLowerCase()))}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <TouchableOpacity
            style={{width: wp(100)}}
            onPress={() =>
              navigation.navigate('ChatScreen', {userName: item.userName})
            }>
            <View style={Styles.userInfo}>
              <View style={Styles.userImg}>
                <Image source={item.userImg} style={Styles.userImg2} />
              </View>
              <View style={Styles.userInfoTxt}>
                <View style={Styles.userInfoTxt2}>
                  <Text style={Styles.usrnameTxt}>{item.userName}</Text>
                  <Text style={Styles.timeTxt}>{item.messageTime}</Text>
                </View>
                <Text style={Styles.msgTxt}>{item.messageText}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default MessagesScreen;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: wp(4),
    paddingRight: wp(4),
    backgroundColor: '#fff',
  },
  camerabtn:{
    marginLeft:wp(52),
    marginTop:hp(1.5)
  },
  dotbtn:{
    marginLeft:wp(4),
    marginTop:hp(1.5)
  },
  myspaceTxt:{
    fontSize: hp(3),
    color: '#3399ff',
    fontWeight: '700',
    alignSelf: 'center',
    marginTop: hp(1.5),
  },
  topBarContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingTop: hp(1),
    paddingBottom: hp(1.8),
  },
  timeTxt:{
    fontSize:12,
    fontFamily:'Roboto-Regular',
    marginRight:wp(8)
  },
  msgTxt:{
    fontSize:14,
    fontFamily:'Roboto-Regular',
  },
  usrnameTxt:{
   fontSize:14,
   fontWeight:'600',
   fontFamily:'Roboto-Bold',
  },
  userInfoTxt: {
    width: wp(90),
    justifyContent: 'center',
    padding: hp(2),
    paddingLeft: 0,
    marginLeft: wp(2),
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
  },
  userInfoTxt2: {
    flexDirection:'row',
    justifyContent:'space-between',
    marginBottom:hp(0.5)
  },
  userImg: {
    paddingBottom: wp(3),
    paddingTop: hp(3),
  },
  userImg2: {
    width: wp(10),
    height: hp(5),
    backgroundColor: '#cccccc',
    tintColor: '#fff',
    borderRadius: wp(5),
  },
  searchContainer: {
    marginTop:hp(1),
  },
  searchContainer2: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: wp(4),
    paddingHorizontal: wp(10),
    width: wp(94),
  },
  searchIcon: {
    width: wp(5),
    height: hp(2.5),
    left: wp(3),
    resizeMode: 'cover',
    top: -hp(4.5),
    tintColor: 'gray',
  },
  cameraIcon:{
    width: wp(7),
    height: hp(3.5),
    resizeMode: 'cover',
  },
  userInfo: {
    flexDirection: 'row',
  },
});
