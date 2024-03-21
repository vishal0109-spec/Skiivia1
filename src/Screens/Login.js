import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  back,
  logo,
  Glogo,
  Fblogo,
  Alogo,
  Passlogo,
  Navback,
  LoginWith,
} from '../Utils/img';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {styles} from './styles';
import {useNavigation} from '@react-navigation/native';
import {
  continueWithApple,
  continueWithFacebook,
  continueWithGoogle,
  createAccountTxt,
  email,
  forgotPassword,
  loginTxt,
  newToTxt,
  orLogin,
  pass,
  subTxt,
} from '../Utils/constant';
import {useDispatch} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import {LoginManager, AccessToken, Profile} from 'react-native-fbsdk-next';

//user-define import
import {Home, SignUp} from '../Screens';
import {LOGIN} from '../Redux/Type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Components/CustomButton';
import {loginAction} from '../Redux/Actions/loginAction';
import {Route} from '../Navigation/Routes';
import {isValidLength, validateEmail} from '../Validaton';
import LoaderScreen from './LoaderScreen';

const Login = () => {
  const navigation = useNavigation();
  const pssRef = useRef();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [seePass, setSeePass] = useState(true);
  const [error, setError] = useState('');
  const [passError, setPassError] = useState('');
  const [message, setMessage] = useState('');
  const [userInfo, setUserInfo] = useState(null);

  const onLogin = async () => {
    try {
      const {user} = await auth().signInWithEmailAndPassword(email, password);
      if (!user.emailVerified) {
        alert('Please verify your email before logging in.');
        return;
      }
      const userData = {
        email: user.email,
        password: user.password,
      };
      dispatch(loginAction(userData));
    } catch (err) {
      console.log(err.message);
      if (err.code === 'auth/user-not-found') {
        alert('Please register your account.');
      } else if (err.code === 'auth/wrong-password') {
        alert('Invalid credentials. Please try again.');
      } else if (err.code === 'auth/invalid-email') {
        alert('Please register your account.');
      } else {
        setError(err.message);
      }
    }
  };

  const register = () => {
    navigation.navigate(Route.SignUP);
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '363579765475-6ehuog9hiaaftrnv7gahhteij2b9eqnh.apps.googleusercontent.com',
    });
  }, []);

  const googleLogin = async () => {
    try {
      setLoading(true);
      await GoogleSignin.hasPlayServices();
      const usrInfo = await GoogleSignin.signIn();
      setUserInfo(usrInfo);
      const {email, givenName} = usrInfo.user;

      const userData = {
        email: email,
        name: givenName,
      };
      dispatch(loginAction(userData));

      await firestore().collection('users').doc(email).set({
        email: email,
        name: givenName,
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  async function onFacebookButtonPress() {
    const result = await LoginManager.logInWithPermissions(['public_profile']);

    if (result.isCancelled) {
      throw 'User cancelled the login process';
    }

    const data = await AccessToken.getCurrentAccessToken();
    const currentProfile = await Profile.getCurrentProfile();
    if (currentProfile) {
      const {name, userID} = currentProfile;
      await firestore().collection('users').doc(userID).set({
        name,
        userID,
      });
    }
    setLoading(true);
    dispatch(loginAction(data));

    if (!data) {
      throw 'Something went wrong obtaining access token';
    }

    const facebookCredential = auth.FacebookAuthProvider.credential(
      data.accessToken,
    );
    return auth().signInWithCredential(facebookCredential);
    setLoading(false);
  }

  const forgotPass = () => {
    if (email.trim() !== '') {
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          alert('Password reset email sent');
        })
        .catch(error => {
          alert(error.message);
        });
    } else {
      alert('Please Enter Registered Email!');
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
                        <Button icon={Navback} iconStyle={styles.navBack} />

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
                        pssRef.current.focus();
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
                      iconStyle={styles.logoIconLayout}
                    />
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
