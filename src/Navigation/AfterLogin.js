import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from './Routes';
import { Home } from '../Screens';

const AfterLoginStack = createNativeStackNavigator();

const AfterLoginNavigator = () =>{
  return(
    <AfterLoginStack.Navigator
    screenOptions={{headerShown: false}}>
      <AfterLoginStack.Screen name="Home" component={Home}/>

    </AfterLoginStack.Navigator>

  );
};
export  default AfterLoginNavigator;
