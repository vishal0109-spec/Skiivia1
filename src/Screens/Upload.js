import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Upload = () => {
  return (
    <View style={Styles.container}>
      <Text style={{fontSize: 16}}>Welcome to Upload Screen</Text>
    </View>
  );
};

export default Upload;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
