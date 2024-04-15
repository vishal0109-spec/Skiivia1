import * as React from 'react';
import {Image, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Home} from '../Screens';
import Upload from '../Screens/AfterLogin/Upload/Upload';
import Account from '../Screens/AfterLogin/Account/Account';
import {account, bell, home, upload} from '../Utils/img';
import {tabBarstyles} from './tabBarStyle';
import Notification from '../Screens/AfterLogin/Notification/Notification';

const BottomTab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <BottomTab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#F3B232',
        tabBarInactiveTintColor: '#FFFFFF',
        tabBarStyle: tabBarstyles.tabBar,
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  tintColor: focused ? '#F3B232' : '#FFFFFF',
                }}
                source={home}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Upload"
        component={Upload}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
              style={[tabBarstyles.imageIcon,{
                tintColor: focused ? '#F3B232' : '#FFFFFF',
              }
            ]}
                source={upload}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={{
                  tintColor: focused ? '#F3B232' : '#FFFFFF',
                }}
                source={account}
              />
            );
          },
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={Notification}
        options={{
          tabBarIcon: ({focused}) => {
            return (
              <Image
                style={[tabBarstyles.imageIcon,{
                  tintColor: focused ? '#F3B232' : '#FFFFFF',
                }
              ]}
                source={bell}
              />
            );
          },
        }}
      />
    </BottomTab.Navigator>
  );
}
