import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, FlatList, Image} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firestore from '@react-native-firebase/firestore';
import moment from 'moment';

//user-define imports
import Button from '../../../Components/CustomButton';
import {chat, drawer, heart, send, user} from '../../../Utils/img';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();
  const [postData, setPostData] = useState([]);
  useEffect(() => {
    getData();
  });
  const getData = () => {
    let tempData = [];
    firestore()
      .collection('posts')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(documentSnapshot => {
          tempData.push(documentSnapshot.data());
        });
        setPostData(tempData);
      });
  };

  const getTimeAgo = timestamp => {
    return moment(timestamp.toDate()).fromNow();
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          width: wp(100),
          backgroundColor: '#fff',
          flexDirection: 'row',
        }}>
        <Button
          icon={drawer}
          iconStyle={Styles.drawerIcon}
          onPress={() => navigation.openDrawer()}
        />
        <Text style={{fontSize: 18, color: '#000', fontWeight: '600',alignSelf:'center',marginTop:10,marginLeft:10}}>
          Home
        </Text>
      </View>

      {postData.length > 0 ? (
        <FlatList
          showsVerticalScrollIndicator={false}
          data={postData}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  width: wp(90),
                  alignSelf: 'center',
                  marginTop: 20,
                  backgroundColor: '#fff',
                  borderRadius: 20,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                  }}>
                  <Image
                    source={user}
                    style={Styles.icon}
                  />
                  <View
                    style={{
                      fontSize: 18,
                      color: '#000',
                      marginLeft: 15,
                    }}>
                    <Text>{item.name}</Text>
                    <Text>{getTimeAgo(item.timestamp)}</Text>
                  </View>
                </View>
                <Image
                  source={{uri: item.image}}
                  style={{
                    width: wp(80),
                    height: hp(50),
                    alignSelf: 'center',
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 10,
                    marginLeft: 10,
                  }}>
                  <Image
                    source={heart}
                    style={Styles.icon2}
                  />
                  <Image
                    source={chat}
                    style={Styles.icon2}
                  />
                  <Image
                    source={send}
                    style={Styles.icon2}
                  />
                </View>
                <Text style={{margin: 20}}>{item.description}</Text>
              </View>
            );
          }}
        />
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text>No Post Found</Text>
        </View>
      )}
    </View>
  );
};
export default Home;
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drawerIcon: {
    tintColor: 'gray',
    width: wp(10),
    height: hp(5),
    left: wp(2),
    top: hp(1),
    resizeMode: 'cover',
  },
  icon:{
    width: wp(10),
    height: hp(5),
    left: wp(2),
    top: hp(0.5),
    bottom:hp(1),
    resizeMode: 'cover',
  },
  icon2:{
    width: wp(6),
    height: hp(3),
    marginLeft: wp(5),
    top: hp(1),
    resizeMode: 'cover',
  }

});
