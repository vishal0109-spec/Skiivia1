import React, { FC } from 'react';
import { View, Text, TouchableOpacity, Image, ImageSourcePropType, StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

interface ButtonProps {
  onPress: () => void;
  title?: string;
  icon?: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  iconStyle?: StyleProp<ImageStyle>;
  btnStyle?: StyleProp<TextStyle>;
}

const Button: FC<ButtonProps> = ({ onPress, title, icon, style, iconStyle, btnStyle }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={style}
    >
      {icon && <Image source={icon} style={iconStyle} />}
      {title && <Text style={btnStyle}>{title}</Text>}
    </TouchableOpacity>
  );
};

export default Button;