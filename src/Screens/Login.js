import {
  View,
  Text,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useRef} from 'react';
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
import {Home, SignUp} from '../Screens';
import {LOGIN} from '../Redux/Type';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../Components/CustomButton';
import {loginAction} from '../Redux/Actions/loginAction';
import {Route} from '../Navigation/Routes';

const Login = () => {
  const navigation = useNavigation();
  const pssRef = useRef();
  const dispatch = useDispatch();

  const onLogin = async () => {
    dispatch(loginAction());
  };
  const register = () => {
    navigation.navigate(Route.SignUP);
  };
  return (
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
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    pssRef.current.focus();
                  }}
                />
                <TextInput
                  placeholder={pass}
                  secureTextEntry={true}
                  ref={pssRef}
                  style={styles.pass}
                />
                <Button icon={Passlogo} iconStyle={styles.fieldIcons} />
                <Button
                  title={forgotPassword}
                  btnStyle={styles.forgotPassword}
                  onPress={() => navigation.navigate('ForgotPassword')}
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
                />
                <Button
                  style={styles.button3}
                  btnStyle={styles.continueWithFacebook}
                  title={continueWithFacebook}
                  icon={Fblogo}
                  iconStyle={styles.logoIconLayout}
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
  );
};

export default Login;
