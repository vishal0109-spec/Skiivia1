import React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {useDispatch} from 'react-redux';

//user-define imports
import { logOutAction } from '../Redux/Actions/logOutAction';



const Home = () => {
  const dispatch = useDispatch();
  const logOut = () => {
    dispatch(logOutAction())
  };

  return (
    <View style={Styles.container}>
      <Text style={{fontSize: 16}}>Welcome to Home Screen</Text>
      <Button onPress={logOut} title="logOut" />
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
});
