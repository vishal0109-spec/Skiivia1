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
import {
  account,
  car,
  deleteIcon,
  home,
  leaderboard,
  legal,
  letterC,
  logOut,
  notification,
  rightArrow,
  security,
  setting,
  upload,
  wallet,
} from '../Utils/img';
import {tabBarstyles} from './tabBarStyle';
import TopTabs from './TopTabNav';
import {
  dltTxt,
  hlpTxt,
  leaderboardTxt,
  legalTxt,
  logoutTxt,
  notificationTxt,
  profilTxt,
  profilTxt2,
  rideTxt,
  settingTxt,
  walletTxt,
} from '../Utils/constant';

const Drawer = createDrawerNavigator();

function CustomDrawerContent() {
  const [selectMenu, setSelectMenu] = useState(1);
  const navigation = useNavigation();
  // const menuPress = num => {
  //   setSelectMenu(num);
  //   if (num == 1) {
  //     navigation.navigate('Home');
  //   }
  //   if (num == 2) {
  //     navigation.navigate('Upload');
  //   }
  //   if (num == 3) {
  //     navigation.navigate('Account');
  //   }
  // };

  return (
    <View style={tabBarstyles.drawerContainer}>
      <View style={tabBarstyles.drawerContainer}>
        <View style={tabBarstyles.profileContainer}>
          <View style={tabBarstyles.buttonContainer}>
            <View style={tabBarstyles.drawerIconOpacity}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                icon={letterC}
                iconStyle={tabBarstyles.drawerIcon}
              />
              <View style={tabBarstyles.profileTxtContainer}>
                <Text style={tabBarstyles.drawerIconTxt}>{profilTxt}</Text>
                <Text style={tabBarstyles.profileTxt}>{profilTxt2}</Text>
              </View>
            </View>

            <Button icon={rightArrow} iconStyle={tabBarstyles.arrowIcon} />
          </View>
        </View>
        <View style={tabBarstyles.profileContainer2}>
          <View style={tabBarstyles.buttonContainer3}>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={rideTxt}
                icon={car}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
              />
              <Button icon={rightArrow} iconStyle={tabBarstyles.arrowIcon2} />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={leaderboardTxt}
                icon={leaderboard}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
              />
              <Button icon={rightArrow} iconStyle={tabBarstyles.arrowIcon2} />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={walletTxt}
                icon={wallet}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
              />
              <Button icon={rightArrow} iconStyle={tabBarstyles.arrowIcon2} />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={settingTxt}
                icon={setting}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
              />
              <Button icon={rightArrow} iconStyle={tabBarstyles.arrowIcon2} />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={notificationTxt}
                icon={notification}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
              />
              <Button icon={rightArrow} iconStyle={tabBarstyles.arrowIcon2} />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={legalTxt}
                icon={legal}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
              />
              <Button icon={rightArrow} iconStyle={tabBarstyles.arrowIcon2} />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={hlpTxt}
                icon={security}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
              />
              <Button icon={rightArrow} iconStyle={tabBarstyles.arrowIcon2} />
            </View>
          </View>
        </View>
      </View>

      <View style={tabBarstyles.buttonContainer4}>
        <View style={tabBarstyles.buttonContainer5}>
          <Button
            style={tabBarstyles.drawerIconOpacity}
            title={logoutTxt}
            icon={logOut}
            iconStyle={tabBarstyles.drawerIcon2}
            btnStyle={tabBarstyles.drawerIconTxt2}
          />
        </View>
        <View style={tabBarstyles.buttonContainer5}>
          <Button
            style={tabBarstyles.drawerIconOpacity}
            title={dltTxt}
            icon={deleteIcon}
            iconStyle={tabBarstyles.drawerIcon3}
            btnStyle={tabBarstyles.drawerIconTxt3}
          />
        </View>
      </View>
    </View>
  );
}

const DrawerRoute = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,drawerStyle:{backgroundColor:'transparent'}
      }}
      
      drawerContent={props => <CustomDrawerContent />}>
      {/* <Drawer.Screen name="TabRoutes" component={TabRoutes} /> */}
      <Drawer.Screen name="TopTabs" component={TopTabs} />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
