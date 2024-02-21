import  React, { useEffect } from 'react';
import "react-native-gesture-handler";
import {NavigationContainer} from '@react-navigation/native';
import {LOGIN,LOGIN_FAILURE} from '../Redux/Type';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import * as  Storage from '../Services/AsyncStorageConfig';
import AfterLoginNavigator from './AfterLogin';
import BeforeLoginNavigator from './BeforeLogin';
import { Route } from './Routes';
import { loginReducer,Initial_State } from '../Redux/Reducer/loginReducer';
import LoaderScreen from '../Screens/LoaderScreen';

const RootStack = createNativeStackNavigator();
const Navigator = () => {
   
  const loginRecord = useSelector((state) => state.loginReducer);
  const dispatch = useDispatch();
  
  useEffect(()=>{
    validateUser('userInfo');
  },[]);

  const validateUser =async (key) => {
    const user = await Storage.getData(key);
    if(user){
      dispatch({
        type: LOGIN,
        payload: JSON.parse(user),
      });
    }
    else{
      dispatch({
        type:LOGIN_FAILURE,
        payload:true,
      });
    }
  };

  return(
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        {!loginRecord?.hideProgress && (
          <RootStack.Screen name={Route.Loader} component={LoaderScreen} />
        )}
        {loginRecord?.hideProgress && loginRecord?.loginData ? (
          <RootStack.Screen
            name={Route.AppStack}
            component={AfterLoginNavigator}
          />
        ) : (
          <RootStack.Screen
            name={Route.AuthStack}
            component={BeforeLoginNavigator}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
