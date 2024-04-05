import  React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

//user-define import 
import {store} from './src/Redux/store';
import Navigator from './src/Navigation/navigator';
// import { styles } from './src/Screens/BeforeLogin/styles';
import { Alert } from 'react-native';
import { showNotification } from './notifeeDis';
import SplashScreen from 'react-native-splash-screen';
import { styles } from './src/Screens/BeforeLogin/Login/styles';

//new branch
const App = () => {

  useEffect(()=>{
    getDeviceToken();
  },[]);

  const getDeviceToken = async() => {
    let token = await messaging().getToken();
  };

  useEffect(() => {
    setTimeout(()=>{
      SplashScreen.hide();
      },500)
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      showNotification(remoteMessage);
    });
    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <SafeAreaProvider style={styles.appContainer}>
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
};
export default App;
