import React from 'react';
import Login from '../Screens/Login';
import SignUp from '../Screens/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from './Routes';
import GetStarted from '../Screens/GetStarted';

const BeforeLoginStack = createNativeStackNavigator();


const BeforeLoginNavigator = () => {
  return (
    <BeforeLoginStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName= {Route.Login}> 
    <BeforeLoginStack.Screen name={Route.GetStarted} component={GetStarted} />
    <BeforeLoginStack.Screen name={Route.Login} component={Login} />
    <BeforeLoginStack.Screen name={Route.SignUP} component={SignUp} />
    </BeforeLoginStack.Navigator>
  )
}

export default BeforeLoginNavigator;