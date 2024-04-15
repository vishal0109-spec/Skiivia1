import * as React from 'react';
import {Text, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Upcoming from '../Screens/AfterLogin/TopTabs/Upcoming';
import Past from '../Screens/AfterLogin/TopTabs/Past';
import { tabBarstyles } from './tabBarStyle';

const TopTab = createMaterialTopTabNavigator();

export default function TopTabs() {
  return (
    <TopTab.Navigator
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: tabBarstyles.label,
        tabBarIndicatorStyle: tabBarstyles.indicator,
    
      }}>
      <TopTab.Screen name="Upcoming" component={Upcoming} />
      <TopTab.Screen name="Past" component={Past} />
    </TopTab.Navigator>
  );
}
