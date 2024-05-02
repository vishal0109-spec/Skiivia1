import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import Button from '../../../Components/CustomButton';
import {
  Navback,
  camera,
  dots,
  emoji,
  pin,
  rupee,
  telephone,
  userWsp,
  video,
} from '../../../Utils/img';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {send} from '../../../Utils/constant';

const ChatScreen = ({route}) => {
  const {userName} = route.params;
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
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  const renderCustomFooter = (props) => {
    return (
        <View style={styles.footer}>
          
          <View style={styles.inputContainer}>
          <TextInput
          {...props}
          placeholder='Message'
          style={styles.txtInput}
          />
          </View>
          <Button icon={emoji} iconStyle={styles.emojiIcon} />
          <Button icon={pin} iconStyle={styles.pinIcon} />
          <Button icon={rupee} iconStyle={styles.rupeeIcon} />
          <Button icon={camera} iconStyle={styles.cameraIcon} />
          <Button
            title={send}
            btnStyle={styles.sendTxt}
            style={styles.sendbtn}
          />
        </View>
        
    );
  };

  const formatTime = (createdAt) => {
    const hours = createdAt.getHours().toString().padStart(2, '0');
    const minutes = createdAt.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };
  
  const renderBubble = (props) => {
    const { currentMessage } = props;
    const messageAndTime = `${currentMessage.text} ${formatTime(currentMessage.createdAt)}`;
  const bubbleWidth = messageAndTime.length * 8;

    return (
      <View style={[styles.bubble,{ maxWidth: Math.min(bubbleWidth, wp(70)) }, currentMessage.user._id === 1 ? styles.rightBubble : styles.leftBubble]}>
        <Text style={styles.messageText}>{currentMessage.text}</Text>
        <Text style={styles.timeText}>{formatTime(currentMessage.createdAt)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button icon={Navback} iconStyle={styles.backIcon} />
        <Button icon={userWsp} iconStyle={styles.userIcon} />
        <Text style={styles.headerText}>{userName}</Text>
        <View style={styles.headerIcons}>
          <Button icon={video} iconStyle={styles.videoIcon} />
          <Button icon={telephone} iconStyle={styles.videoIcon} />
          <Button icon={dots} iconStyle={styles.videoIcon} />
        </View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}
        renderBubble={renderBubble}
        // alwaysShowSend
        renderInputToolbar={renderCustomFooter}
      />
      
    </View>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position:'relative',
  },
  bubble: {
    maxWidth: wp(45),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    borderRadius: wp(5),
    flexDirection: 'row', 
    alignItems: 'flex-end',  
  },
  messageText: {
    fontSize: hp(2),
    flex: 1,
  },
  timeText: {
    fontSize: hp(1.5),
    color: '#999',
    marginTop: hp(0.5),
    marginLeft: wp(2),
  },
  leftBubble: {
    backgroundColor: '#fff',
    alignSelf: 'flex-start',
    marginLeft:wp(-12)
  },
  rightBubble: {
    backgroundColor: '#DCF8C6',
    alignSelf: 'flex-end',
  },
  backIcon: {
    width: wp(5),
    height: hp(2),
    tintColor: '#000',
  },
  userIcon: {
    width: wp(8),
    height: hp(4),
    backgroundColor: '#cccccc',
    tintColor: '#fff',
    borderRadius: wp(5),
    marginLeft: wp(3),
  },
  videoIcon: {
    width: wp(8),
    height: hp(4),
    marginLeft: wp(3.5),
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
    marginLeft: wp(3),
  },
  headerIcons: {
    flexDirection: 'row',
    marginLeft: wp(25),
  },
  sendbtn: {
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: '#F9F9F9',
    borderRadius: wp(5),
    borderColor: '#E8E8E8',
    borderWidth: 1,
    height: hp(5),
    borderStyle: 'solid',
    width:wp(15)
  },
  sendTxt: {
    fontSize: hp(2),
    fontWeight: '700',
    color: 'gray',
  },
  pinIcon: {
    width: wp(5),
    height: hp(2.5),
    marginRight:wp(3),
    resizeMode:'cover',
  },
  cameraIcon:{
    width: wp(5),
    height: hp(2.5),
    marginRight:wp(3),
    resizeMode:'cover',
  },
  inputContainer: {
    flex: 1,
  },
  emojiIcon:{
    width: wp(5),
    height: hp(2.5),
    tintColor:'gray',
    resizeMode:'cover',
    marginRight:wp(53),
    marginBottom:hp(0.6)
  },
  footer:{
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtInput:{
    width: wp(85),
    backgroundColor: '#F9F9F9',
    borderRadius: wp(5),
    borderColor: '#E8E8E8',
    borderWidth: 1,
    height: hp(5),
    borderStyle: 'solid',
    paddingLeft: wp(9),
    paddingTop:hp(1),
    alignItems:'center',
    justifyContent:'center'
  },
  rupeeIcon: {
    width: wp(5),
    height: hp(2.5),
    marginTop: hp(0.2),
    backgroundColor: '#a6a6a6',
    borderRadius: wp(3),
    marginRight: wp(3),
    resizeMode:'cover',
  },
});
