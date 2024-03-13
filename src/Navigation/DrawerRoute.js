import {View, Text} from 'react-native';
import React, {useState} from 'react';
import {DrawerContent, createDrawerNavigator} from '@react-navigation/drawer';
import Upload from '../Screens/Upload';
import Account from '../Screens/Account';
import TabRoutes from './TabRoutes';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Home} from '../Screens';
import Button from '../Components/CustomButton';
import {account, home, upload} from '../Utils/img';
import {tabBarstyles} from './tabBarStyle';

const Drawer = createDrawerNavigator();

function CustomDrawerContent() {
  const [selectMenu, setSelectMenu] = useState(1);
  const navigation = useNavigation();
  const menuPress = num => {
    setSelectMenu(num);
    if (num == 1) {
      navigation.navigate('Home');
    }
    if (num == 2) {
      navigation.navigate('Upload');
    }
    if (num == 3) {
      navigation.navigate('Account');
    }
  };
  return (
    <View>
      <Button
        style={[
          tabBarstyles.drawerIconOpacity,
          {backgroundColor: selectMenu == 1 ? '#75140C' : '#FFFFFF'},
        ]}
        title="Home"
        icon={home}
        iconStyle={tabBarstyles.drawerIcon}
        btnStyle={[
          tabBarstyles.drawerIconTxt,
          {color: selectMenu == 1 ? '#FFFFFF' : '#000000'},
        ]}
        onPress={() => {
          menuPress(1);
        }}
      />
      <Button
        style={[
          tabBarstyles.drawerIconOpacity,
          {backgroundColor: selectMenu == 2 ? '#75140C' : '#FFFFFF'},
        ]}
        title="Upload"
        icon={upload}
        iconStyle={tabBarstyles.drawerIcon}
        btnStyle={[
          tabBarstyles.drawerIconTxt,
          {color: selectMenu == 2 ? '#FFFFFF' : '#000000'},
        ]}
        onPress={() => {
          menuPress(2);
        }}
      />
      <Button
        style={[
          tabBarstyles.drawerIconOpacity,
          {backgroundColor: selectMenu == 3 ? '#75140C' : '#FFFFFF'},
        ]}
        title="Account"
        icon={account}
        iconStyle={tabBarstyles.drawerIcon}
        btnStyle={[
          tabBarstyles.drawerIconTxt,
          {color: selectMenu == 3 ? '#FFFFFF' : '#000000'},
        ]}
        onPress={() => {
          menuPress(3);
        }}
      />
    </View>
  );
}

const DrawerRoute = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent />}>
      <Drawer.Screen name="TabRoutes" component={TabRoutes} />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
