import { View, Text } from 'react-native';
import React, { useState } from 'react';
import { DrawerContent, createDrawerNavigator } from '@react-navigation/drawer';
import { Home } from '../Screens';
import Upload from '../Screens/Upload';
import Account from '../Screens/Account';
import TabRoutes from './TabRoutes';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const Drawer = createDrawerNavigator();

function CustomDrawerContent() {
    const [selectMenu, setSelectMenu] = useState(1);
    const navigation = useNavigation();
    const menuPress = (num) => {
      setSelectMenu(num);
      if (num == 1) {
        navigation.navigate(Route.DrawerTab, {screen: Route.Reels});
      }
    };
    return (
      <View>
        {/* <Button
          style={[
            style.drawerIconOpacity,
            {backgroundColor: selectMenu == 1 ? '#75140C' : '#FFFFFF'},
          ]}
          btnStyle={[
            style.drawerIconTxt,
            {color: selectMenu == 1 ? '#FFFFFF' : '#000000'},
          ]}
          iconStyle={style.drawerIcon}
          icon={video}
          title="Reels"
          onPress={() => {
            menuPress(1);
          }}
        /> */}
        {/* <Button
          style={[
            style.drawerIconOpacity,
            {
              backgroundColor: selectMenu == 2 ? '#75140C' : '#FFFFFF',
            },
          ]}
          btnStyle={[
            style.drawerIconTxt,
            {color: selectMenu == 2 ? '#FFFFFF' : '#000000'},
          ]}
          iconStyle={style.drawerIcon}
          icon={chat}
          title="chat"
          onPress={() => {
            menuPress(2);
          }}
        /> */}
        <TouchableOpacity style={{backgroundColor:'red'}}>
            <Text>Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

const DrawerRoute = () => {
  return (
    <Drawer.Navigator screenOptions={{
        headerShown: false,
      }} drawerContent={props => <CustomDrawerContent />}>
        <Drawer.Screen name = "TabRoutes" component={TabRoutes} />
        <Drawer.Screen name = "Home" component={Home} />
        <Drawer.Screen name = "Upload" component={Upload} />
        <Drawer.Screen name = "Account" component={Account} />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;