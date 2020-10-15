import React, {useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {Text, Surface, useTheme} from 'react-native-paper';

import {styles} from '../styles/styles';
import {totalPort, app_state} from '../types';
import {valueDisplay} from '../helpers/currency';

const Profit = ({value, currency}: {value: totalPort; currency: string}) => {
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

const Loss = ({value, currency}: {value: totalPort; currency: string}) => {
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

export const ReturnsHeading = () => {
  const dispatch = useDispatch();
  const counter: number = useSelector<app_state, number>(
    state => state.portReducer.counter,
  );
  const currency: string = useSelector<app_state, string>(
    state => state.portReducer.currency,
  );
  const inr: totalPort = useSelector<app_state, totalPort>(
    state => state.portReducer.inr,
    shallowEqual,
  );
  const usdt: totalPort = useSelector<app_state, totalPort>(
    state => state.portReducer.usdt,
    shallowEqual,
  );
  const {colors, dark} = useTheme();

  useEffect(() => {
    if (counter < 1) return;
    const time = `${new Date()
      .toString()
      .slice(0, 15)} ${new Date().toLocaleString().slice(11, 22)}`;

    dispatch({
      type: 'ADD_RETURNS',
      value: {inr: inr.totalPortAmount, usdt: usdt.totalPortAmount},
      time: time,
    });
  }, [inr.totalPortAmount, usdt.totalPortAmount]);

  return (
    <Surface
      style={{
        ...styles.surface,
        backgroundColor: colors.accent,
        height: '30%',
      }}>
      {Math.sign(
        currency === 'inr' ? inr.totalPortAmount : usdt.totalPortAmount,
      ) === 1 ? (
        <Profit value={currency === 'inr' ? inr : usdt} currency={currency} />
      ) : (
        <Loss value={currency === 'inr' ? inr : usdt} currency={currency} />
      )}
    </Surface>
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
