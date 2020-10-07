import React from 'react';
import {View, Text} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import {useTheme} from 'react-native-paper';
import {material} from 'react-native-typography';
import {styles} from '../styles/styles';
import {token_prop, app_state} from '../types';
import {
  numberWithCommas,
  valueDisplay,
  currencyConversion,
} from '../helpers/currency';

export const Profit = ({item}: {item: token_prop}) => {
  const priceData: any = useSelector<app_state>(
    state => state.portReducer.priceData,
    shallowEqual,
  );
  const currency: any = useSelector<app_state>(
    state => state.portReducer.currency,
  );
  const {colors} = useTheme();

  return (
    <View style={styles.coinView}>
      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text
          style={{
            ...material.body1Object,
            color: colors.text,
            marginRight: 4,
          }}>
          + {numberWithCommas(item.returns)}
        </Text>
        {item.market !== currency && (
          <Text
            style={{
              ...material.captionObject,
              color: '#32CD32',
              marginRight: 4,
            }}>
            {valueDisplay(
              currencyConversion({
                amount: item.returns,
                from: item.market,
                to: currency,
                priceData: priceData,
              }),
              currency,
            )}
          </Text>
        )}
      </View>
      <View style={styles.profitBox}>
        <Text
          style={{
            ...material.body2Object,
            color: '#fff',
            padding: 6,
            backgroundColor: '#32CD32',
          }}>
          {item.percent.toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};

export const Loss = ({item}: {item: token_prop}) => {
  const priceData: any = useSelector<app_state>(
    state => state.portReducer.priceData,
    shallowEqual,
  );
  const currency: any = useSelector<app_state>(
    state => state.portReducer.currency,
  );
  const {colors} = useTheme();
  return (
    <View style={styles.coinView}>
      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text
          style={{...material.body1Object, color: colors.text, marginRight: 4}}>
          - {numberWithCommas(Math.abs(item.returns))}
        </Text>
        {item.market !== currency && (
          <Text
            style={{
              ...material.captionObject,
              color: '#c52a0d',
              marginRight: 4,
            }}>
            {valueDisplay(
              Math.abs(
                currencyConversion({
                  amount: item.returns,
                  from: item.market,
                  to: currency,
                  priceData: priceData,
                }),
              ),
              currency,
            )}
          </Text>
        )}
      </View>
      <View style={styles.lossBox}>
        <Text
          style={{
            ...material.body2Object,
            color: '#fff',
            padding: 6,
            backgroundColor: '#c52a0d',
          }}>
          {Math.abs(item.percent).toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};
