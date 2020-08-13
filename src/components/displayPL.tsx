import React from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import {theme_prop, token_prop, app_state} from '../types';
import {styles} from '../styles/styles';

interface Props {
  theme: theme_prop;
  token: token_prop[];
  priceData: object;
}

function DisplayPL(props: Props) {
  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  function currencyConversion(amount: number, from: string, to: string) {
    if (from !== 'usdt') return '';
    const name = from + to;
    let price: string;
    try {
      price = props.priceData[name].last;
    } catch (e) {
      return '';
    }
    const converted: number = amount * parseFloat(price);

    return parseFloat(numberWithCommas(converted)).toFixed(2);
  }

  return (
    <View>
      {props.token.map((token, i) => (
        <ListItem
          key={i}
          containerStyle={{backgroundColor: props.theme.background}}
          title={token.coin.toUpperCase()}
          titleStyle={{fontWeight: 'bold', color: props.theme.text}}
          subtitle={token.market.toUpperCase()}
          subtitleStyle={{color: props.theme.text}}
          rightElement={
            token.profit > 0 ? (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: props.theme.text,
                      fontWeight: 'bold',
                      marginRight: 4,
                    }}>
                    + {numberWithCommas(token.profit)}{' '}
                  </Text>
                  {token.market === 'usdt' && (
                    <Text
                      style={{
                        color: styles.profit.color,
                        fontWeight: '100',
                        fontSize: 12,
                        marginRight: 4,
                      }}>
                      ₹ {currencyConversion(token.profit, token.market, 'inr')}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: styles.profit.color,
                  }}>
                  <Text
                    style={{
                      backgroundColor: styles.profit.color,
                      color: props.theme.text,
                      fontWeight: 'bold',
                      padding: 6,
                      fontSize: 14,
                    }}>
                    {token.percent.toFixed(2)}%
                  </Text>
                </View>
              </View>
            ) : (
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={{
                      color: props.theme.text,
                      fontWeight: 'bold',
                      marginRight: 4,
                    }}>
                    {' '}
                    - {numberWithCommas(token.loss)}
                  </Text>
                  {token.market === 'usdt' && (
                    <Text
                      style={{
                        color: styles.loss.color,
                        fontWeight: '100',
                        fontSize: 12,
                        marginRight: 4,
                      }}>
                      ₹ {currencyConversion(token.loss, token.market, 'inr')}
                    </Text>
                  )}
                </View>
                <View
                  style={{
                    borderRadius: 3,
                    borderWidth: 1,
                    borderColor: styles.loss.color,
                  }}>
                  <Text
                    style={{
                      backgroundColor: styles.loss.color,
                      color: props.theme.text,
                      padding: 6,
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    {token.percent.toFixed(2)}%
                  </Text>
                </View>
              </View>
            )
          }
          bottomDivider
        />
      ))}
    </View>
  );
}

const mapStateToProps = (state: app_state) => {
  return {
    priceData: state.portReducer.priceData,
  };
};

export default connect(mapStateToProps)(DisplayPL);
