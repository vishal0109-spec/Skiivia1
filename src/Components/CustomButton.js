import { View, Text, TouchableOpacity,Image } from 'react-native';
import React from 'react';
import { styles } from '../Screens/styles';

const Button = ({onPress,title,icon,style,iconStyle,btnStyle}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style={style}
    >
    {icon && <Image source={icon} style ={iconStyle} />}
    {title &&  <Text style={btnStyle}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default Button;