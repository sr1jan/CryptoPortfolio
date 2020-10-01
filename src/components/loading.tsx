import React from 'react';
import {View} from 'react-native';
import {styles} from '../styles/styles';
import {ActivityIndicator} from 'react-native-paper';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={25} color="grey" />
    </View>
  );
};

export default Loading;
