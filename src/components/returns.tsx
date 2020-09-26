import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../styles/styles';
import {token_prop} from '../types';
import {
  numberWithCommas,
  valueDisplay,
  currencyConversion,
} from '../helpers/currency';

export const Profit = ({
  item,
  priceData,
}: {
  item: token_prop;
  priceData: object;
}) => {
  return (
    <View style={styles.coinView}>
      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={styles.profit}>+ {numberWithCommas(item.returns)}</Text>
        {item.market === 'usdt' && (
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

export const Loss = ({
  item,
  priceData,
}: {
  item: token_prop;
  priceData: object;
}) => {
  return (
    <View style={styles.coinView}>
      <View style={{justifyContent: 'center', alignItems: 'flex-end'}}>
        <Text style={styles.loss}>
          - {numberWithCommas(Math.abs(item.returns))}
        </Text>
        {item.market === 'usdt' && (
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
