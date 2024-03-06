import { View, Text, StyleSheet } from 'react-native';
import React from 'react';

const Account = () => {
  return (
    <View style={Styles.container}>
      <Text style={{fontSize: 16}}>Welcome to Account Screen</Text>
    </View>
  );
};

export default Account;

const Styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });