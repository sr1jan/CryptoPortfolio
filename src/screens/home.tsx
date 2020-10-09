import React, {useEffect, useState} from 'react';
import {View, StatusBar} from 'react-native';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';
import {useTheme, ActivityIndicator, Surface, Text} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {styles} from '../styles/styles';
import {app_state, token_prop} from '../types';
import {ReturnsGraph} from '../components/returnsGraph';
import {Profit, Loss} from '../components/returnsHeading';

export default function Home() {
  const dispatch = useDispatch();
  const counter: any = useSelector<app_state>(
    state => state.portReducer.counter,
  );
  const currency: any = useSelector<app_state>(
    state => state.portReducer.currency,
  );
  const inr: any = useSelector<app_state>(
    state => state.portReducer.inr,
    shallowEqual,
  );
  const usdt: any = useSelector<app_state>(
    state => state.portReducer.usdt,
    shallowEqual,
  );
  const {colors, dark} = useTheme();
  const navigation = useNavigation();
  const [graphType, setGraphType] = useState<'line' | 'bar'>('line');

  useEffect(() => {
    if (counter < 1) return;
    const date = new Date();
    dispatch({
      type: 'ADD_RETURNS',
      value: {inr: inr.totalPortAmount, usdt: usdt.totalPortAmount},
      time: date.toString().slice(0, 24),
    });
  }, [inr.totalPortAmount, usdt.totalPortAmount]);

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
            height: '29%',
          }}>
          {Math.sign(
            currency === 'inr' ? inr.totalPortAmount : usdt.totalPortAmount,
          ) === 1 ? (
            <Profit
              value={currency === 'inr' ? inr : usdt}
              currency={currency}
            />
          ) : (
            <Loss value={currency === 'inr' ? inr : usdt} currency={currency} />
          )}
        </Surface>

        <Surface
          style={{
            ...styles.surface,
            backgroundColor: colors.accent,
            height: '65%',
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'flex-start',
              marginBottom: 5,
            }}>
            <TouchableOpacity
              onPress={() => setGraphType('line')}
              style={{marginHorizontal: 2}}>
              <Icon
                name="chart-line"
                color={
                  graphType === 'line' ? colors.onSurface : colors.placeholder
                }
                size={25}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setGraphType('bar')}
              style={{marginHorizontal: 2}}>
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
  }
}
