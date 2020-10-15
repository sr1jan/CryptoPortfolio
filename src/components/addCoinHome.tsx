import React from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from 'react-native-paper';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {styles} from '../styles/styles';

export const AddCoinHome = () => {
  const navigation = useNavigation();
  const {colors} = useTheme();
  return (
    <View>
      <Text
        style={{
          color: colors.placeholder,
          fontFamily: 'monospace',
          letterSpacing: 0.8,
        }}>
        Your portofolio is empty!
      </Text>
      <TouchableOpacity
        onPress={() => navigation.navigate('Portfolio', {addCoin: true})}
        style={{
          ...styles.addCoinHomeTouchable,
          backgroundColor: colors.accent,
        }}>
        <Text style={{...styles.addCoinHomeText, color: colors.text}}>
          Add Coin
        </Text>
      </TouchableOpacity>
    </View>
  );
};
