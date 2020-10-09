import React from 'react';
import {View, Text} from 'react-native';
import {useTheme} from 'react-native-paper';
import {material} from 'react-native-typography';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {currencySign} from '../styles/styles';

export default function CoinDetailInfo(token) {
  const {colors} = useTheme();
  const token_arr = Object.entries(token.token).filter(
    pair => pair[0] !== 'inr' && pair[0] !== 'usdt' && pair[0] !== 'id',
  );
  const market = token.token.market;

  return (
    <View
      style={{
        alignSelf: 'stretch',
        paddingHorizontal: 10,
        paddingVertical: 10,
      }}>
      {token_arr.map((pair, index) => {
        return (
          <TouchableOpacity key={index} activeOpacity={0.5}>
            <View
              key={index}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: colors.background,
                paddingVertical: 6,
                paddingHorizontal: 8,
                marginTop: index > 0 ? 8 : 0,
              }}>
              <Text
                style={{
                  ...material.body1Object,
                  color: colors.text,
                  fontSize: 18,
                  letterSpacing: 0.8,
                }}>
                {pair[0].toUpperCase()}
              </Text>
              <Text
                style={{
                  ...material.body1Object,
                  color: colors.text,
                  fontSize: 18,
                  letterSpacing: 0.8,
                }}>
                {/* sorry for below code, will change later*/}
                {typeof pair[1] !== 'number'
                  ? pair[1].toUpperCase()
                  : pair[0] === 'percent'
                  ? pair[1].toFixed(3) + '%'
                  : pair[0] === 'amount'
                  ? pair[1]
                  : currencySign[market] + ' ' + pair[1].toFixed(3)}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
