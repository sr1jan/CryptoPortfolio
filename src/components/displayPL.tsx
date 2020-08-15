import React from 'react';
import {View, Text, FlatList, ListRenderItem} from 'react-native';
import {connect} from 'react-redux';
import {ListItem} from 'react-native-elements';
import {theme_prop, token_prop, app_state} from '../types';
import {styles} from '../styles/styles';
import {
  currencyConversion,
  numberWithCommas,
  valueDisplay,
} from '../helpers/currency';

interface Props {
  theme: theme_prop;
  token: token_prop[];
  priceData: object;
}

function DisplayPL(props: Props) {
  const keyExtractor = (item: token_prop, index: number) => index.toString();
  const renderItem: ListRenderItem<token_prop> = ({item}) => (
    <ListItem
      containerStyle={{backgroundColor: props.theme.background}}
      title={item.coin.toUpperCase()}
      titleStyle={styles.coinTitle}
      subtitle={item.market.toUpperCase()}
      subtitleStyle={styles.coinSub}
      rightElement={
        item.returns >= 0 ? (
          <View style={styles.coinView}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.profit}>
                + {numberWithCommas(item.returns)}
              </Text>
              {item.market === 'usdt' && (
                <Text style={styles.profitConversion}>
                  {valueDisplay(
                    currencyConversion(
                      item.returns,
                      item.market,
                      'inr',
                      props.priceData,
                    ),
                  )}
                </Text>
              )}
            </View>
            <View style={styles.profitBox}>
              <Text style={styles.profitPercent}>
                {item.percent.toFixed(2)}%
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.coinView}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.loss}>
                - {numberWithCommas(Math.abs(item.returns))}
              </Text>
              {item.market === 'usdt' && (
                <Text style={styles.lossConversion}>
                  {valueDisplay(
                    Math.abs(
                      currencyConversion(
                        item.returns,
                        item.market,
                        'inr',
                        props.priceData,
                      ),
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
        )
      }
      topDivider
    />
  );

  return (
    <View style={{flex: 1}}>
      <FlatList
        keyExtractor={keyExtractor}
        data={props.token}
        renderItem={renderItem}
      />
    </View>
  );
}

const mapStateToProps = (state: app_state) => {
  return {
    token: state.portReducer.token,
    priceData: state.portReducer.priceData,
  };
};

export default connect(mapStateToProps)(DisplayPL);
