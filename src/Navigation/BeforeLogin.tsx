import React from 'react';
import Login from '../Screens/BeforeLogin/Login/Login';
import SignUp from '../Screens/BeforeLogin/SignUp/SignUp';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Route } from './Routes';

const BeforeLoginStack = createNativeStackNavigator();


const BeforeLoginNavigator = () => {
  return (
    <BeforeLoginStack.Navigator
    screenOptions={{ headerShown: false }}
    initialRouteName= {Route.Login}> 
    <BeforeLoginStack.Screen name={Route.Login} component={Login} />
    <BeforeLoginStack.Screen name={Route.SignUP} component={SignUp} />
    </BeforeLoginStack.Navigator>
  )
}

export default BeforeLoginNavigator;