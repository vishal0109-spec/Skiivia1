import  React, { useEffect } from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import messaging from '@react-native-firebase/messaging';

//user-define import 
import {store} from './src/Redux/store';
import Navigator from './src/Navigation/navigator';
import { styles } from './src/Screens/styles';
import { Alert } from 'react-native';
import { showNotification } from './notifeeDis';

const App = () => {

  useEffect(()=>{
    getDeviceToken();
  },[]);

  const getDeviceToken = async() => {
    let token = await messaging().getToken();
    console.log(token);
  };

  useEffect(() => {
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
