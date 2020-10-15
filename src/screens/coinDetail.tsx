import React, {useState, useEffect, useLayoutEffect} from 'react';
import {View, Text} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import {useTheme, Surface} from 'react-native-paper';

import {styles, PROFIT_COLOR, LOSS_COLOR} from '../styles/styles';
import {token_prop, app_state} from '../types';
import {Profit, Loss} from '../components/returns';
import CoinDetailInfo from '../components/coinDetailInfo';

export default function CoinDetail({route, navigation}) {
  const {colors} = useTheme();
  const currency: string = useSelector<app_state, string>(
    state => state.portReducer.currency,
  );
  const token: token_prop = useSelector<app_state, token_prop>(
    state => state.portReducer.token[route.params.index],
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${token.coin.toUpperCase()}/${token.market.toUpperCase()}`,
    });
  }, []);

  return (
    <View
      style={{
        ...styles.mainContent,
        justifyContent: 'space-evenly',
        backgroundColor: colors.background,
      }}>
      <Surface
        style={{
          ...styles.surface,
          backgroundColor: colors.accent,
          height: '15%',
        }}>
        {token.returns > 0 ? <Profit item={token} /> : <Loss item={token} />}
      </Surface>

      <Surface
        style={{
          ...styles.surface,
          alignItems: 'stretch',
          backgroundColor: colors.accent,
          height: '63%',
          paddingHorizontal: 10,
        }}>
        <CoinDetailInfo token={token} />
      </Surface>
    </View>
  );
}
