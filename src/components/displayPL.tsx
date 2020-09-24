import React, {useRef} from 'react';
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
import PortHeader from '../components/portHeader';

interface Props {
  theme: theme_prop;
  token: token_prop[];
  priceData: object;
  toggleOverlay: () => void;
}

function DisplayPL(props: Props) {
  const flatList = useRef(null);

  const Profit = ({item}: {item: token_prop}) => {
    return (
      <View style={styles.coinView}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.profit}>+ {numberWithCommas(item.returns)}</Text>
          {item.market === 'usdt' && (
            <Text style={styles.profitConversion}>
              {valueDisplay(
                currencyConversion({
                  amount: item.returns,
                  from: item.market,
                  to: 'inr',
                  priceData: props.priceData,
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

  const Loss = ({item}: {item: token_prop}) => {
    return (
      <View style={styles.coinView}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
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
                    priceData: props.priceData,
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

  const renderItem = ({item}: {item: token_prop}) => {
    return (
      <View style={styles.coinList}>
        <View style={{alignSelf: 'flex-start', marginLeft: 10}}>
          <Text style={styles.coinTitle}>{item.coin.toUpperCase()}</Text>
          <Text style={styles.coinSub}>{item.market.toUpperCase()}</Text>
        </View>

        <View style={{alignSelf: 'flex-end', marginRight: 10}}>
          {item.returns >= 0 ? <Profit item={item} /> : <Loss item={item} />}
        </View>
      </View>
    );
  };

  const ItemSeparator = () => {
    return (
      <View style={{height: 0.7, width: '100%', backgroundColor: '#000'}} />
    );
  };

  const keyExtractor = (item: token_prop, index: number) => index.toString();

  return (
    <View style={{flex: 1}}>
      <PortHeader toggleOverlay={props.toggleOverlay} />
      <FlatList
        keyExtractor={keyExtractor}
        data={props.token}
        renderItem={renderItem}
        initialNumToRender={6}
        ItemSeparatorComponent={ItemSeparator}
        ref={flatList}
        onContentSizeChange={() =>
          flatList.current.scrollToEnd({animated: true})
        }
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
