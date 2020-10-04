import React, {useEffect, useState} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTheme, ActivityIndicator, Surface, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from '../styles/styles';
import {totalPort, app_state, token_prop} from '../types';
import {ReturnsGraph} from '../components/returnsGraph';

import {valueDisplay} from '../helpers/currency';

const Profit = ({inr}: {inr: totalPort}) => {
  return (
    <View style={localStyles.grContainer}>
      <Text
        style={localStyles.grProfitAmount}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {valueDisplay(inr.totalPortAmount)}
      </Text>
      <View style={styles.profitBox}>
        <Text
          style={localStyles.grProfitPercent}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {inr.totalPortPercent.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

const Loss = ({inr}, {inr: totalPort}) => {
  return (
    <View style={localStyles.grContainer}>
      <Text
        style={localStyles.grLossAmount}
        adjustsFontSizeToFit
        numberOfLines={1}>
        {valueDisplay(Math.abs(inr.totalPortAmount))}
      </Text>
      <View style={styles.lossBox}>
        <Text
          style={localStyles.grLossPercent}
          adjustsFontSizeToFit
          numberOfLines={1}>
          {Math.abs(inr.totalPortPercent).toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

export default function Home() {
  const dispatch = useDispatch();
  const counter: any = useSelector<app_state>(
    state => state.portReducer.counter,
  );
  const inr: any = useSelector<app_state>(state => state.portReducer.inr);
  const {colors, dark} = useTheme();
  const navigation = useNavigation();
  const [graphType, setGraphType] = useState<'line' | 'bar'>('line');

  useEffect(() => {
    dispatch({type: 'SET_CURRENCY', currency: 'inr'});
  }, []);

  useEffect(() => {
    if (counter < 1) return;
    const date = new Date();
    dispatch({
      type: 'ADD_RETURNS',
      value: inr.totalPortAmount,
      time: date.toString().slice(0, 24),
    });
  }, [inr.totalPortAmount]);

  if (counter > 0) {
    return (
      <View
        style={{
          ...styles.mainContent,
          justifyContent: 'space-evenly',
          backgroundColor: colors.background,
        }}>
        <StatusBar
          backgroundColor={colors.background}
          barStyle={dark ? 'light-content' : 'dark-content'}
          animated={true}
        />
        <Surface
          style={{
            ...styles.surface,
            backgroundColor: colors.accent,
            height: '30%',
          }}>
          {Math.sign(inr.totalPortAmount) === 1 ? (
            <Profit inr={inr} />
          ) : (
            <Loss inr={inr} />
          )}
        </Surface>

        <Surface
          style={{
            ...styles.surface,
            backgroundColor: colors.accent,
            height: '63%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-end',
              marginBottom: 5,
            }}>
            <View style={{marginRight: 5}}>
              <TouchableOpacity onPress={() => setGraphType('line')}>
                <Icon
                  name="chart-line"
                  color={
                    graphType === 'line' ? colors.onSurface : colors.placeholder
                  }
                  size={25}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setGraphType('bar')}>
              <Icon
                name="chart-bar"
                color={
                  graphType === 'bar' ? colors.onSurface : colors.placeholder
                }
                size={25}
              />
            </TouchableOpacity>
          </View>

          <ReturnsGraph graphType={graphType} />
        </Surface>
      </View>
    );
  } else {
    return (
      <View
        style={{
          ...styles.mainContent,
          backgroundColor: colors.background,
        }}>
        <StatusBar
          backgroundColor={colors.background}
          barStyle={dark ? 'light-content' : 'dark-content'}
          animated={true}
        />
        <Text
          style={{
            color: colors.placeholder,
            fontFamily: 'monospace',
            letterSpacing: 0.8,
          }}>
          Your portofolio is empty!
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Portfolio')}
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
  }
}

const localStyles = StyleSheet.create({
  grContainer: {
    ...styles.grContainer,
    alignItems: 'center',
  },
  grProfitAmount: {
    ...styles.grAmount,
    color: '#32CD32',
    fontSize: 45,
    letterSpacing: 1,
  },
  grProfitPercent: {
    ...styles.grPercent,
    backgroundColor: '#32CD32',
    fontSize: 45,
    paddingHorizontal: 10,
    letterSpacing: 1,
  },
  grLossAmount: {
    ...styles.grAmount,
    color: '#c52a0d',
    fontSize: 45,
    letterSpacing: 1,
  },
  grLossPercent: {
    ...styles.grPercent,
    backgroundColor: '#c52a0d',
    fontSize: 45,
    paddingHorizontal: 10,
    letterSpacing: 1,
  },
});
