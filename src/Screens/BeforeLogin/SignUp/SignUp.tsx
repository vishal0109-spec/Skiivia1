import React, { useRef, useState } from 'react';
import { View, TextInput, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import CheckBox from 'react-native-check-box';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

//user-define import
import Button from '../../../Components/CustomButton';
import { Navback, Passlogo, arrow, logo, warning } from '../../../Utils/img';
import {
  cnfrmPass,
  cnfrmationTxt,
  compltFormTxt,
  dayTxt,
  dobTxt,
  email,
  firstName,
  lastName,
  mnthTxt,
  mrTxt,
  mrsTxt,
  pasInstTxt,
  phnNo,
  registerTxt,
  rgstrPasTxt,
  salutation,
  yearTxt,
} from '../../../Utils/constant';
import { styles } from './resgisterStyle';
import { isValidLength, validateEmail, validateRegister,  } from '../../../Validaton';
import { Route } from '../../../Navigation/Routes';
import LoaderScreen from '../../LoaderScreen';
import axios from 'axios';
import { loginUrl } from '../../../Services/api';
import { ApiConfig } from '../../../Services/apiConfig';

const SignUp: React.FC = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [selectedSalutation, setSelectedSalutation] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confrmPassword, setConfrmPassword] = useState<string>('');
  const [seePass, setSeePass] = useState<boolean>(true);
  const [seePass2, setSeePass2] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [passError, setPassError] = useState<string>('');
  const [confrmPasswordError, setConfrmPasswordError] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<{ [key: string]: string }>({});
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phnNo, setPhnNo] = useState<string>('');
  const [dayValue, setDayValue] = useState<string>('');
  const [mnthValue, setMnthValue] = useState<string>('');
  const [yearValue, setYearValue] = useState<string>('');

  const navigation = useNavigation<any>();
  const frstNameRef = useRef<TextInput>(null);
  const scndNameRef = useRef<TextInput>(null);
  const emlRef = useRef<TextInput>(null);
  const phnRef = useRef<TextInput>(null);
  const yourpassRef = useRef<TextInput>(null);
  const cnfrmPassRef = useRef<TextInput>(null);
  const dayRef = useRef<TextInput>(null);
  const mnthRef = useRef<TextInput>(null);
  const yearRef = useRef<TextInput>(null);

  const handleSalutationSelect = (salutation: string) => {
    setSelectedSalutation(salutation);
    setShowOptions(false);
  };

  const handleRegister = async () => {
    const validationErrors: {
      firstName?: string;
      lastName?: string;
      selectedSalutation?: string;
      phnNo?: string;
      isChecked?: string;
      dob?: string;
    }= validateRegister(
      firstName,
      lastName,
      selectedSalutation,
      email,
      password,
      confrmPassword,
      phnNo,
      isChecked,
      dayValue,
      mnthValue,
      yearValue,
      setError,
      setPassError,
      setConfrmPasswordError,
    );

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      const dob = `${dayValue}/${mnthValue}/${yearValue}`;
      const name = `${firstName}${lastName}`;
      await AsyncStorage.setItem('Name', name);
      await AsyncStorage.setItem('Email', email);

      const body = {
        data: {
          type: 'email_account',
          attributes: {
            full_name: name,
            email: email,
            password: password,
            full_phone_number: phnNo,
          },
        },
      };
      console.log('body', body);
      new ApiConfig()
        .postJSON(loginUrl, body)
        .then(res => {
          console.log(res);
          setLoading(false);
          navigation.navigate(Route.Login);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setErrorMsg(validationErrors);
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
              <View style={styles.frame1}>
                <View style={styles.topNav}>
                  <Button icon={Navback} iconStyle={styles.navBack} onPress={function (): void {
                      throw new Error('Function not implemented.');
                    } } />
                  <Image style={styles.logoIcon} source={logo} />
                </View>
              </View>
              <View style={styles.container3}>
                <View style={styles.container4}>
                  <Text style={styles.registerTxt}>{registerTxt}</Text>
                  <Text style={styles.compltFormTxt}>{compltFormTxt}</Text>
                </View>
                <View style={styles.container5}>
                  <View>
                    <View style={{ flexDirection: 'row' }}>
                      <TextInput
                        placeholder={salutation}
                        style={styles.inputField}
                        value={selectedSalutation || ''}
                        onChangeText={() => { }}
                        onFocus={() => setShowOptions(true)}
                        onBlur={() => {
                          if (selectedSalutation !== null) {
                            setShowOptions(false);
                          }
                        }}
                        onSubmitEditing={() => {
                          frstNameRef.current?.focus();
                        }}
                      />
                      <Button icon={arrow} iconStyle={styles.arrwLogo} onPress={function (): void {
                          throw new Error('Function not implemented.');
                        } } />
                    </View>
                    {errorMsg.selectedSalutation ? (
                      <Text style={styles.errorMessage}>
                        {errorMsg.selectedSalutation}
                      </Text>
                    ) : null}
                    {showOptions && (
                      <View style={styles.optionsBox}>
                        <Button
                          style={styles.option}
                          title={mrTxt}
                          onPress={() => handleSalutationSelect('Mr.')}
                        />
                        <Button
                          style={styles.option}
                          title={mrsTxt}
                          onPress={() => handleSalutationSelect('Mrs.')}
                        />
                      </View>
                    )}
                  </View>

                  <View style={styles.container6}>
                    <View>
                      <TextInput
                        placeholder="First Name*"
                        style={styles.firstName}
                        value={firstName}
                        onChangeText={setFirstName}
                        ref={frstNameRef}
                        onSubmitEditing={() => {
                          scndNameRef.current?.focus();
                        }}
                      />
                      {errorMsg.firstName ? (
                        <Text style={styles.errorName}>
                          {errorMsg.firstName}
                        </Text>
                      ) : null}
                    </View>

                    <View>
                      <TextInput
                        placeholder="Last Name*"
                        value={lastName}
                        onChangeText={setLastName}
                        style={styles.lastName}
                        ref={scndNameRef}
                        onSubmitEditing={() => {
                          emlRef.current?.focus();
                        }}
                      />
                      {errorMsg.lastName ? (
                        <Text style={styles.errorName}>
                          {errorMsg.lastName}
                        </Text>
                      ) : null}
                    </View>
                  </View>
                  <View>
                    <TextInput
                      placeholder="Email *"
                      keyboardType="email-address"
                      style={styles.inputField}
                      ref={emlRef}
                      onSubmitEditing={() => {
                        phnRef.current?.focus();
                      }}
                      onChangeText={text => {
                        setEmail(text);
                        validateEmail(text, setError);
                      }}
                    />

                    {error ? (
                      <Text style={styles.errorMessage}>{error}</Text>
                    ) : null}
                  </View>

                  <View>
                    <TextInput
                      placeholder="Phone #*"
                      keyboardType="numeric"
                      value={phnNo}
                      onChangeText={setPhnNo}
                      style={styles.inputField}
                      ref={phnRef}
                      onSubmitEditing={() => {
                        yourpassRef.current?.focus();
                      }}
                    />
                    {errorMsg.phnNo ? (
                      <Text style={styles.errorMessage}>{errorMsg.phnNo}</Text>
                    ) : null}
                  </View>

                  <View>
                    <View style={styles.warnInst}>
                      <Button icon={warning} iconStyle={styles.warnLogo} onPress={function (): void {
                          throw new Error('Function not implemented.');
                        } } />
                      <Text style={styles.pasInstTxt}>{pasInstTxt}</Text>
                    </View>

                    <View style={styles.passField}>
                      <TextInput
                        placeholder={rgstrPasTxt}
                        style={styles.inputField}
                        secureTextEntry={seePass}
                        ref={yourpassRef}
                        onSubmitEditing={() => {
                          cnfrmPassRef.current?.focus();
                        }}
                        onChangeText={text => {
                          setPassword(text);
                          isValidLength(text, setPassError);
                        }}
                      />
                      <Button
                        icon={Passlogo}
                        iconStyle={styles.passLogo}
                        onPress={() => setSeePass(!seePass)}
                      />
                    </View>

                    {passError ? (
                      <Text style={styles.errorMessage2}>{passError}</Text>
                    ) : null}
                  </View>
                  <View>
                    <View style={styles.passField2}>
                      <TextInput
                        placeholder={cnfrmPass}
                        style={styles.inputField}
                        ref={cnfrmPassRef}
                        secureTextEntry={seePass2}
                        onSubmitEditing={() => {
                          dayRef.current?.focus();
                        }}
                        onChangeText={text => {
                          setConfrmPassword(text);
                          isValidLength(text, setConfrmPasswordError);
                        }}
                      />
                      <Button
                        icon={Passlogo}
                        iconStyle={styles.passLogo}
                        onPress={() => setSeePass2(!seePass2)}
                      />
                    </View>

                    {confrmPasswordError ? (
                      <Text style={styles.errorMessage2}>
                        {confrmPasswordError}
                      </Text>
                    ) : null}
                  </View>

                  <View style={styles.dobContainer}>
                    <Text>{dobTxt}</Text>
                    <View style={styles.dobContainer2}>
                      <TextInput
                        placeholder={dayTxt}
                        value={dayValue}
                        onChangeText={setDayValue}
                        keyboardType="numeric"
                        style={styles.inputField2}
                        ref={dayRef}
                        onSubmitEditing={() => {
                          mnthRef.current?.focus();
                        }}
                      />

                      <TextInput
                        placeholder={mnthTxt}
                        value={mnthValue}
                        onChangeText={setMnthValue}
                        keyboardType="numeric"
                        style={styles.inputField2}
                        ref={mnthRef}
                        onSubmitEditing={() => {
                          yearRef.current?.focus();
                        }}
                      />
                      <TextInput
                        placeholder={yearTxt}
                        value={yearValue}
                        onChangeText={setYearValue}
                        keyboardType="numeric"
                        style={styles.inputField2}
                        ref={yearRef}
                      />
                    </View>
                    {errorMsg.dob ? (
                      <Text style={styles.errorMessage}>{errorMsg.dob}</Text>
                    ) : null}
                  </View>
                  <View>
                    <View style={styles.txtContainer}>
                      <CheckBox
                        style={{ flex: 1 }}
                        onClick={() => setIsChecked(!isChecked)}
                        isChecked={isChecked}
                        rightText={cnfrmationTxt}
                        rightTextStyle={styles.cnfrmTxt}
                        checkedCheckBoxColor="#039be5"
                        uncheckedCheckBoxColor="red"
                      />
                    </View>
                    {errorMsg.isChecked ? (
                      <Text style={styles.errorMessage}>
                        {errorMsg.isChecked}
                      </Text>
                    ) : null}
                  </View>

                  <Button
                    title={registerTxt}
                    style={styles.rgstrButton}
                    btnStyle={styles.rgstrButton1}
                    onPress={handleRegister}
                  />
                </View>
              </View>
            </KeyboardAwareScrollView>
          </ScrollView>
        </View>
      )}
    </>
  );
};

export default SignUp;