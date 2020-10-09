import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';

import {styles} from '../styles/styles';
import {totalPort} from '../types';
import {valueDisplay} from '../helpers/currency';

export const Profit = ({
  value,
  currency,
}: {
  value: totalPort;
  currency: string;
}) => {
  return (
    <View style={localStyles.grContainer}>
      <Text
        style={localStyles.grProfitAmount}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {valueDisplay(value.totalPortAmount, currency)}
      </Text>
      <View style={styles.profitBox}>
        <Text
          style={localStyles.grProfitPercent}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {value.totalPortPercent.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

export const Loss = ({
  value,
  currency,
}: {
  value: totalPort;
  currency: string;
}) => {
  return (
    <View style={localStyles.grContainer}>
      <Text
        style={localStyles.grLossAmount}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {valueDisplay(Math.abs(value.totalPortAmount), currency)}
      </Text>
      <View style={styles.lossBox}>
        <Text
          style={localStyles.grLossPercent}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {Math.abs(value.totalPortPercent).toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const localStyles = StyleSheet.create({
  grContainer: {
    ...styles.grContainer,
    alignItems: 'center',
  },
  grProfitAmount: {
    ...styles.grAmount,
    color: '#32CD32',
    fontSize: 40,
    letterSpacing: 1,
  },
  grProfitPercent: {
    ...styles.grPercent,
    backgroundColor: '#32CD32',
    fontSize: 40,
    paddingHorizontal: 10,
    letterSpacing: 1,
  },
  grLossAmount: {
    ...styles.grAmount,
    color: '#c52a0d',
    fontSize: 40,
    letterSpacing: 1,
  },
  grLossPercent: {
    ...styles.grPercent,
    backgroundColor: '#c52a0d',
    fontSize: 40,
    paddingHorizontal: 10,
    letterSpacing: 1,
  },
});
