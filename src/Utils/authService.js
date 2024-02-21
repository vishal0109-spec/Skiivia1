import AsyncStorage from '@react-native-async-storage/async-storage';
const logIn = async user => {
  console.log('user info', user);
  try {
    const {email, password} = user;
    if (email === 'Admin@gmail.com' && password === 'Admin123') {
      const newUser = {
        email,
      };
      AsyncStorage.setItem('user', JSON.stringify(newUser));
      return {
        status: 'success',
        message: 'You are redirecting to home page',
        user: newUser,
      };
    } else {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
};
const signUp = async () => {
  try {
    AsyncStorage.clear();
    return {
      status: 'success',
      message: 'You are logged out',
    };
  } catch (error) {
    return {
      status: 'error',
      message: error.message,
    };
  }
};
export default {
  logIn,
  signUp,
};
