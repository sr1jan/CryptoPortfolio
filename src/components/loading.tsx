import React from 'react';
import {View} from 'react-native';
import {styles} from '../styles/styles';
import {ActivityIndicator, useTheme} from 'react-native-paper';

const Loading = () => {
  const {colors} = useTheme();
  return (
    <View style={styles.loading}>
      <ActivityIndicator size={25} color={colors.text} />
    </View>
  );
};

export default Loading;
