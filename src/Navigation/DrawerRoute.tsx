import {View, Text, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import firestore from '@react-native-firebase/firestore';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

//user define
import TabRoutes from './TabRoutes';
import Button from '../Components/CustomButton';
import {
  car,
  deleteIcon,
  leaderboard,
  legal,
  letterC,
  logout,
  notification,
  rightArrow,
  security,
  setting,
  userProfile,
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
  rideTxt,
  settingTxt,
  walletTxt,
} from '../Utils/constant';
import {logOutAction} from '../Redux/Actions/logOutAction';

const Drawer = createDrawerNavigator();

interface PostData {
  photo: string;
  name: string;
}

function CustomDrawerContent(): JSX.Element {
  const navigation = useNavigation<any>();
  const dispatch = useDispatch<any>();

  const [postData, setPostData] = useState<PostData[]>();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '363579765475-6ehuog9hiaaftrnv7gahhteij2b9eqnh.apps.googleusercontent.com',
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      try {
        const querySnapshot = await firestore().collection('users').get();
        const userDataArray = querySnapshot.docs.map(
          doc => doc.data() as PostData,
        );
        console.log();
        if (userDataArray.length > 0) {
          setPostData(userDataArray);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);

  const logOut = async (): Promise<void> => {
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
              {postData && postData.length > 0 && postData[0]?.photo ? (
                <Image
                  source={{uri: postData[0]?.photo}}
                  style={tabBarstyles.profileIcon}
                />
              ) : (
                <Button
                  style={tabBarstyles.drawerIconOpacity}
                  icon={userProfile}
                  iconStyle={tabBarstyles.drawerIcon}
                  onPress={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              )}
              <View style={tabBarstyles.profileTxtContainer}>
                <Text style={tabBarstyles.drawerIconTxt}>
                  {postData && postData.length > 0 ? postData[0].name : 'User'}
                </Text>
              </View>
            </View>
            <Button
              icon={rightArrow}
              iconStyle={tabBarstyles.arrowIcon}
              onPress={function (): void {
                throw new Error('Function not implemented.');
              }}
            />
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
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <Button
                icon={rightArrow}
                iconStyle={tabBarstyles.arrowIcon2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={leaderboardTxt}
                icon={leaderboard}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <Button
                icon={rightArrow}
                iconStyle={tabBarstyles.arrowIcon2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={walletTxt}
                icon={wallet}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <Button
                icon={rightArrow}
                iconStyle={tabBarstyles.arrowIcon2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={settingTxt}
                icon={setting}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <Button
                icon={rightArrow}
                iconStyle={tabBarstyles.arrowIcon2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={notificationTxt}
                icon={notification}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <Button
                icon={rightArrow}
                iconStyle={tabBarstyles.arrowIcon2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={legalTxt}
                icon={legal}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <Button
                icon={rightArrow}
                iconStyle={tabBarstyles.arrowIcon2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
            </View>
            <View style={tabBarstyles.buttonContainer2}>
              <Button
                style={tabBarstyles.drawerIconOpacity}
                title={hlpTxt}
                icon={security}
                iconStyle={tabBarstyles.drawerIcon2}
                btnStyle={tabBarstyles.drawerIconTxt2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <Button
                icon={rightArrow}
                iconStyle={tabBarstyles.arrowIcon2}
                onPress={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
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
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        </View>
      </View>
    </View>
  );
}

const DrawerRoute = (): JSX.Element => {
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
