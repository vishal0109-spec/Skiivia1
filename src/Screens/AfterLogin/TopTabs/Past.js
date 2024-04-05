import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Past = () => {
  return (
    <View style={Styles.container}>
      <Text>Past Screen</Text>
    </View>
  );
};

export default Past;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
