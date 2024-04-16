import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useDispatch, useSelector } from 'react-redux';
import * as Storage from '../Services/AsyncStorageConfig';
import AfterLoginNavigator from './AfterLogin';
import BeforeLoginNavigator from './BeforeLogin';
import { Route } from './Routes';
import LoaderScreen from '../Screens/LoaderScreen';

interface RootState {
  loginReducer: {
    loginData: boolean;
    hideProgress: boolean;
  };
}

const RootStack = createNativeStackNavigator();

const Navigator = (): JSX.Element => {
  const loginRecord = useSelector((state: RootState) => state.loginReducer);
  const dispatch = useDispatch<any>();

  useEffect(() => {
    validateUser('userInfo');
  }, []);

  const validateUser = async (key: string): Promise<void> => {
    try {
      const userData: string | null = await Storage.getData(key);  
      if (userData) {
        const user = JSON.parse(userData); 
        dispatch({
          type: 'LOGIN',
          payload: user,
        });
      } else {
        dispatch({
          type: 'LOGIN_FAILURE',
          payload: true,
        });
      }
    } catch (error) {
      console.error('Error validating user:', error);
      dispatch({
        type: 'LOGIN_FAILURE',
        payload: true,
      });
    }
  };
  
  
  

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
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