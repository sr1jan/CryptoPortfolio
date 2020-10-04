import React from 'react';
import {View, Text} from 'react-native';
import {useSelector, shallowEqual} from 'react-redux';
import {useTheme} from 'react-native-paper';
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
  const {colors} = useTheme();
  return (
    <View style={styles.coinView}>
      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{...styles.profit, color: colors.text}}>
          + {numberWithCommas(item.returns)}
        </Text>
        {item.market !== 'inr' && (
          <Text style={styles.profitConversion}>
            {valueDisplay(
              currencyConversion({
                amount: item.returns,
                from: item.market,
                to: 'inr',
                priceData: priceData,
              }),
            )}
          </Text>
        )}
      </View>
      <View style={styles.profitBox}>
        <Text style={styles.profitPercent}>{item.percent.toFixed(2)}%</Text>
      </View>
    </View>
  );
};

export const Loss = ({item}: {item: token_prop}) => {
  const priceData: any = useSelector<app_state>(
    state => state.portReducer.priceData,
    shallowEqual,
  );
  const {colors} = useTheme();
  return (
    <View style={styles.coinView}>
      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={{...styles.loss, color: colors.text}}>
          - {numberWithCommas(Math.abs(item.returns))}
        </Text>
        {item.market !== 'inr' && (
          <Text style={styles.lossConversion}>
            {valueDisplay(
              Math.abs(
                currencyConversion({
                  amount: item.returns,
                  from: item.market,
                  to: 'inr',
                  priceData: priceData,
                }),
              ),
            )}
          </Text>
        )}
      </View>
      <View style={styles.lossBox}>
        <Text style={styles.lossPercent}>
          {Math.abs(item.percent).toFixed(2)}%
        </Text>
      </View>
    </View>
  );
};
