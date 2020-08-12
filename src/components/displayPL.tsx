import React from 'react';
import {View, Text} from 'react-native';
import {ListItem} from 'react-native-elements';
import {theme_prop, token_prop} from '../types';
import {styles} from '../styles/styles';

interface Props {
  theme: theme_prop;
  token: token_prop[];
}

export default function DisplayPL(props: Props) {
  function numberWithCommas(x: number) {
    return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');
  }

  if (props.token.length === 0) return;
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
                <Text
                  style={{
                    color: props.theme.text,
                    fontWeight: 'bold',
                  }}>
                  +{numberWithCommas(token.profit)}{' '}
                </Text>
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
                <Text
                  style={{
                    color: props.theme.text,
                    fontWeight: 'bold',
                  }}>
                  {' '}
                  -{numberWithCommas(token.loss)}{' '}
                </Text>
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
