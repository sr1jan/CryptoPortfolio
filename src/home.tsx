import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';

import {styles} from './styles/styles';

function Home() {
  const navigation = useNavigation();
  const {colors} = useTheme();

  return (
    <View style={styles.mainContent}>
      <Text style={{...styles.title, color: colors.text}}>
        {' '}
        Welcome to the CryptoPortfolio{' '}
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Portfolio')}>
        <Text style={{...styles.androidButtonText, color: colors.text}}>
          {' '}
          Go to my Portfolio{' '}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default Home;
