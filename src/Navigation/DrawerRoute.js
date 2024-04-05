import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {DrawerContent, createDrawerNavigator} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

//user define
import Upload from '../Screens/AfterLogin/Upload/Upload';
import Account from '../Screens/AfterLogin/Account/Account';
import TabRoutes from './TabRoutes';
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
  logout,
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
import {logOutAction} from '../Redux/Actions/logOutAction';

const Drawer = createDrawerNavigator();

function CustomDrawerContent() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [postData, setPostData] = useState([]);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '363579765475-6ehuog9hiaaftrnv7gahhteij2b9eqnh.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const querySnapshot = await firestore().collection('users').get();
        const userDataArray = querySnapshot.docs.map(doc => doc.data());
        if (userDataArray.length > 0) {
          setPostData(userDataArray[0]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const logOut = async () => {
    try {
      await GoogleSignin.signOut();
      dispatch(logOutAction());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={tabBarstyles.drawerContainer}>
      <View style={tabBarstyles.drawerContainer}>
        <View style={tabBarstyles.profileContainer}>
          <View style={tabBarstyles.buttonContainer}>
            <View style={tabBarstyles.drawerIconOpacity}>
              {postData && postData.photo ? (
                <Image
                  source={{uri: postData.photo}}
                  style={tabBarstyles.profileIcon}
                />
              ) : (
                <Button
                  style={tabBarstyles.drawerIconOpacity}
                  icon={letterC}
                  iconStyle={tabBarstyles.drawerIcon}
                />
              )}
              <View style={tabBarstyles.profileTxtContainer}>
                <Text style={tabBarstyles.drawerIconTxt}>
                  {postData ? postData.name : 'User'}
                </Text>
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
            icon={logout}
            onPress={logOut}
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
        headerShown: false,
        drawerStyle: {backgroundColor: 'transparent'},
      }}
      drawerContent={props => <CustomDrawerContent />}>
      <Drawer.Screen name="TabRoutes" component={TabRoutes} />
      <Drawer.Screen name="TopTabs" component={TopTabs} />
    </Drawer.Navigator>
  );
};

export default DrawerRoute;
