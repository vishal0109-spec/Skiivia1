import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat';
import Button from '../../../Components/CustomButton';
import { Navback, camera, dots, pin, rupee, telephone, userWsp, video } from '../../../Utils/img';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { send } from '../../../Utils/constant';


const ChatScreen = ({ route }) => {
  const { userName } = route.params;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: 'Hello world',
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ]);
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderSend = (props) => {
    return (
      <Send {...props}>
        <View style={{flexDirection:'row'}}>
        <Button
        icon={pin}
        iconStyle={styles.pinIcon}
        />
        <Button
        icon={rupee}
        iconStyle={styles.rupeeIcon}
        />
        <Button
        icon={camera}
        iconStyle={styles.pinIcon}
        />
        <Button
        title={send}
        btnStyle={styles.sendTxt}
        style={styles.sendbtn}
        />
        </View>
        
      </Send>
    );
  };

  // const formatTime = (createdAt) => {
  //   const options = { hour: 'numeric', minute: 'numeric' };
  //   return new Intl.DateTimeFormat('en-US', options).format(createdAt);
  // };
  
  const renderBubble = (props) => {
    // const time = formatTime(props.currentMessage.createdAt);
  
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            marginLeft: wp(-12),
            backgroundColor: '#d9d9d9',
          },
          right: {
            backgroundColor: '#2e64e5',
          },
        }}
        textStyle={{
          left: {
            color: '#333',
          },
          right: {
            color: '#fff',
          },
        }}
      >
        {/* <View style={styles.bubbleContent}>
          <Text style={styles.messageText}>{props.currentMessage.text}</Text>
          {time && <Text style={styles.timeText}>{time}</Text>}
        </View> */}
      </Bubble>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
        icon={Navback}
        iconStyle={styles.backIcon}
        />
        <Button
        icon={userWsp}
        iconStyle={styles.userIcon}
        />
        <Text style={styles.headerText}>{ userName }</Text>
        <View style={styles.headerIcons}>
        <Button
        icon={video}
        iconStyle={styles.videoIcon}
        />
        <Button
        icon={telephone}
        iconStyle={styles.videoIcon}
        />
        <Button
        icon={dots}
        iconStyle={styles.videoIcon}
        />
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
      />
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // bubbleContent: {
  //   flexDirection: 'row',
  //   padding: 10,
  // },
  // messageText: {
  //   fontSize: 16,
  //   flex: 1,
  // },
  // timeText: {
  //   fontSize: 12,
  //   marginLeft: 5,
  //   color: '#aaa',
  // },
  backIcon:{
    width:wp(5),
    height:hp(2),
    tintColor:'#000',   
  },
  userIcon:{
    width: wp(8),
    height: hp(4),
    backgroundColor: '#cccccc',
    tintColor: '#fff',
    borderRadius: wp(5),
    marginLeft:wp(3)
  },
  videoIcon:{
    width: wp(8),
    height: hp(4),
    marginLeft:wp(3.5)
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: hp(2),
  },
  headerText: {
    fontSize: hp(2.6),
    fontWeight: '400',
    marginLeft:wp(3)
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft:wp(25)
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#f0f0f0',
  },
  footerIcon: {
    marginHorizontal: 5,
  },
  sendbtn: {
    marginRight: wp(3),
    marginBottom: hp(1.5),
  },
  sendTxt: {
    fontSize: hp(2.2),
    fontWeight: '700',
    color:'gray'
  },
  pinIcon:{
    width:wp(6),
    height:hp(3),
    marginRight:wp(3)
  },
  rupeeIcon:{
    width:wp(5),
    height:hp(2.5),
    marginTop:hp(0.2),
    backgroundColor:'#a6a6a6',
    borderRadius:wp(3),
    marginRight:wp(3)
  }
});
