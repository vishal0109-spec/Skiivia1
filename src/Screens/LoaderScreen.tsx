import React from 'react';
import {View ,ActivityIndicator } from 'react-native';
import { styles } from './BeforeLogin/Login/styles';

const LoaderScreen = () => {
  return (
    <View style={styles.loaderScreenContainer}>
      <ActivityIndicator style={styles.actInd} />
    </View>
  )
}

export default LoaderScreen;