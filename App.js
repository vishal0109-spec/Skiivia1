import  React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';

//user-define import 
import {store} from './src/Redux/store';
import Navigator from './src/Navigation/navigator';

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider style={{flex: 1}}>
        <Navigator />
      </SafeAreaProvider>
    </Provider>
  );
};
export default App;
