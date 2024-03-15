import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

const Upcoming = () => {
  return (
    <View style={Styles.container}>
      <Text>Upcoming Screen</Text>
    </View>
  );
};

export default Upcoming;

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
