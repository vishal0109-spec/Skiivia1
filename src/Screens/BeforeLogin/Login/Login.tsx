import React, { FC, useEffect, useRef, useState } from 'react';
import { View, Text, Image, ImageBackground, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import axios from 'axios';
import { LoginManager, AccessToken, Profile } from 'react-native-fbsdk-next';

//user-define import
import { back, logo, Glogo, Fblogo, Alogo, Passlogo, Navback, LoginWith } from '../../../Utils/img';
import { continueWithApple, continueWithFacebook, continueWithGoogle, createAccountTxt, email, forgotPassword, loginTxt, newToTxt, orLogin, pass, subTxt } from '../../../Utils/constant';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { isValidLength, validateEmail } from '../../../Validaton';
import Button from '../../../Components/CustomButton';
import LoaderScreen from '../../LoaderScreen';
import { ApiConfig } from '../../../Services/apiConfig';
import { loginUrl } from '../../../Services/api';
import { Route } from '../../../Navigation/Routes';
import { loginAction } from '../../../Redux/Actions/loginAction';

interface LoginProps {}
interface UserData {
  email: string;
  name: string | null; 
  photo: string | null;
}

const Login: FC<LoginProps> = () => {
  const navigation = useNavigation<any>();
  const pssRef = useRef<TextInput>(null);
  const dispatch = useDispatch<any>();

  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [seePass, setSeePass] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [passError, setPassError] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [userInfo, setUserInfo] =  useState<UserData | null>(null);

  const onLogin = async (): Promise<void> => {
    const body = {
      data: {
        type: 'email_account',
        attributes: {
          email: email,
          password: password,
        },
      },
    };
    new ApiConfig()
      .postJSON(loginUrl, body)
      .then(res => {
        console.log(res);
        const userData: UserData = {
          email: res?.data?.attributes?.email || '',
          name: null, 
          photo: null,
        };
        dispatch(loginAction(userData));
      })
      .catch(error => {
        console.log(error);
      });
  };
  

  const register = (): void => {
    navigation.navigate(Route.SignUP);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '363579765475-6ehuog9hiaaftrnv7gahhteij2b9eqnh.apps.googleusercontent.com',
    });
  }, []);

  const googleLogin = async (): Promise<void> => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      // Convert usrInfo to UserData
      const userData: UserData = {
        email: usrInfo.user.email,
        name: usrInfo.user.givenName || '',
        photo: usrInfo.user.photo || '',
      };
      setUserInfo(userData);

      await firestore().collection('users').doc(userData.email).set(userData);
      dispatch(loginAction(userData));
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  async function onFacebookButtonPress() {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile']);
      if (result.isCancelled) {
        throw new Error('User cancelled the login process');
      }
  
      const data = await AccessToken.getCurrentAccessToken();
      if (!data) {
        throw new Error('Something went wrong obtaining access token');
      }
  
      const currentProfile = await Profile.getCurrentProfile();
      if (!currentProfile) {
        throw new Error('Unable to retrieve profile data');
      }
  
      const { name, userID } = currentProfile;
  
      await firestore().collection('users').doc(userID || "").set({
        name: name ,
        userID: userID ,
      });
  
      setLoading(true);
      const userData: UserData = {
        email: '',
        name: name || '', 
        photo: '', 
      };
      dispatch(loginAction(userData));
  
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      await auth().signInWithCredential(facebookCredential);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  
  

  const forgotPass = (): void => {
    if (email.trim() !== '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert('Password reset email sent');
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    } else {
      Alert.alert('Please Enter Registered Email!');
    }
  };

  return (
    <>
      {loading ? (
        <LoaderScreen />
      ) : (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.container2}>
            <KeyboardAwareScrollView contentContainerStyle={styles.container}>
              <View style={styles.container3}>
                <View>
                  <ImageBackground style={styles.imageBgIcon} source={back}>
                    <View style={styles.frame1}>
                      <View style={styles.topNav}>
                        <Button icon={Navback} iconStyle={styles.navBack} onPress={function (): void {
                            throw new Error('Function not implemented.');
                          } } />

                        <Image style={styles.logoIcon} source={logo} />
                      </View>
                    </View>
                    <View style={styles.container4}>
                      <Text style={styles.loginTxt}>{loginTxt}</Text>
                      <Text style={styles.llTxt}>{subTxt}</Text>
                    </View>
                  </ImageBackground>
                </View>
                <View style={styles.container5}>
                  <View style={styles.loginOption}>
                    <TextInput
                      placeholder="Email Address"
                      keyboardType="email-address"
                      style={styles.emailChild}
                      blurOnSubmit={false}
                      onChangeText={text => {
                        setEmail(text);
                        validateEmail(text, setError);
                      }}
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        pssRef.current?.focus();
                      }}
                    />
                    <View>
                      {error ? (
                        <Text style={styles.errorMessage}>{error}</Text>
                      ) : null}
                    </View>
                    <TextInput
                      placeholder={pass}
                      secureTextEntry={seePass}
                      ref={pssRef}
                      onChangeText={text => {
                        setPassword(text);
                        isValidLength(text, setPassError);
                      }}
                      style={styles.pass}
                    />
                    <Button
                      icon={Passlogo}
                      iconStyle={styles.fieldIcons}
                      onPress={() => setSeePass(!seePass)}
                    />
                    <View>
                      {passError ? (
                        <Text style={styles.errorMessage2}>{passError}</Text>
                      ) : null}
                    </View>
                    <Button
                      title={forgotPassword}
                      btnStyle={styles.forgotPassword}
                      onPress={forgotPass}
                    />
                    <Button
                      style={styles.button}
                      title={loginTxt}
                      btnStyle={styles.button1}
                      onPress={onLogin}
                    />
                  </View>
                  <View style={styles.loginWithLayout}>
                    <Image style={styles.orItemLayout} source={LoginWith} />
                    <Text style={styles.orLoginWith}>{orLogin}</Text>
                    <Image style={styles.orItemLayout} source={LoginWith} />
                  </View>
                  <View style={styles.socmedLogin}>
                    <Button
                      style={styles.button2}
                      btnStyle={styles.continueWithGoogle}
                      title={continueWithGoogle}
                      icon={Glogo}
                      iconStyle={styles.logoIconLayout}
                      onPress={() => {
                        googleLogin();
                      }}
                    />
                    <Button
                      style={styles.button3}
                      btnStyle={styles.continueWithFacebook}
                      title={continueWithFacebook}
                      icon={Fblogo}
                      iconStyle={styles.logoIconLayout}
                      onPress={() => onFacebookButtonPress()}
                    />
                    <Button
                        style={styles.button4}
                        btnStyle={styles.continueWithApple}
                        title={continueWithApple}
                        icon={Alogo}
                        iconStyle={styles.logoIconLayout} onPress={function (): void {
                          throw new Error('Function not implemented.');
                        } }                    />
                  </View>
                </View>
              </View>
              <View style={styles.createAccountContainer}>
                <Text>{newToTxt} </Text>
                <Button
                  title={createAccountTxt}
                  btnStyle={styles.createAccount}
                  onPress={register}
                />
              </View>
            </KeyboardAwareScrollView>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default Login;