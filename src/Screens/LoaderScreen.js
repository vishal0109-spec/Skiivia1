import React from 'react';
import { styles } from './styles';
import {View ,ActivityIndicator } from 'react-native';

const LoaderScreen = () => {
  console.log('LoaderScreen called')
  return (
    <View style={styles.loaderScreenContainer}>
      <ActivityIndicator style={styles.actInd} />
    </View>
  )
}

export default LoaderScreen;