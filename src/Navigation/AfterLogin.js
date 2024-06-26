import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from './TabRoutes';
import DrawerRoute from './DrawerRoute';
import EditProfile from '../Screens/EditProfile';

const AfterLoginStack = createNativeStackNavigator();

const AfterLoginNavigator = () =>{
  return(
    <AfterLoginStack.Navigator
    screenOptions={{headerShown: false}}>
      <AfterLoginStack.Screen name="DrawerRoute" component={DrawerRoute}/>
      <AfterLoginStack.Screen name="TabRoutes" component={TabRoutes}/>
      <AfterLoginStack.Screen name="EditProfile" component={EditProfile}/>
    </AfterLoginStack.Navigator>

  );
};
export  default AfterLoginNavigator;
