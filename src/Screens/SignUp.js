import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  Button,
  Keyboard,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
const SignUp = () => {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.inner}>
        <Text style={styles.header}>Header</Text>
        <View style={styles.btnContainer}>
          <TextInput placeholder="email" style={styles.textInput} />
          <TextInput placeholder="Password" style={styles.textInput} />
          <Button title="Submit" onPress={() => null} />
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 40,
    borderColor: '#000000',
    borderBottomWidth: 1,
    marginBottom: 36,
  },
  btnContainer: {
    backgroundColor: 'white',
    marginTop: 12,
  },
});
export default SignUp;