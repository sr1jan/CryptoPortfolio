import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import {token_prop} from '../types';
import {styles} from '../styles/styles';
import {
  TouchableHighlight,
  TouchableOpacity,
  gestureHandlerRootHOC,
} from 'react-native-gesture-handler';

import {coins} from '../data/coins';
import {markets} from '../data/markets';
import DropDownList from './searchableList';

interface Props {
  submit: (token_object: token_prop) => void;
  token: token_prop[];
  toggleOverlay: () => void;
}

const CoinInput = (props: Props) => {
  const [coinsVisible, showCoins] = useState<boolean>(false);
  const [marketsVisible, showMarkets] = useState<boolean>(false);
  const [token_object, setTokenObj] = useState<token_prop>({
    id: 0,
    coin: '',
    market: '',
    amount: 0,
    price: 0,
    boughtVal: 0,
    returns: 0,
    percent: 0,
  });

  const setCoin = (value: string) => {
    setTokenObj({...token_object, coin: value.toLowerCase()});
  };

  const setMarket = (value: string) => {
    setTokenObj({...token_object, market: value.toLowerCase()});
  };

  const tobj = token_object;
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#393e46',
      }}>
      <View style={{alignSelf: 'flex-end', marginRight: 30, marginBottom: 10}}>
        <TouchableOpacity onPress={props.toggleOverlay}>
          <Icon
            name="window-close"
            size={30}
            type="material-community"
            // color="#222831"
            color="grey"
          />
        </TouchableOpacity>
      </View>

      <View style={{justifyContent: 'center'}}>
        <TextInput
          value={token_object.coin.toUpperCase()}
          placeholder="Coin: BTC"
          placeholderTextColor="grey"
          autoCapitalize="characters"
          onFocus={() => showCoins(true)}
          onChangeText={value => {
            setTokenObj({...token_object, coin: value.toLowerCase()});
            tobj.coin = token_object.coin;
          }}
          onEndEditing={() => showCoins(false)}
          style={styles.coinInput}
        />
        {coinsVisible && (
          <DropDownList
            value={token_object.coin}
            data={coins}
            setValue={setCoin}
          />
        )}
      </View>

      <View style={{justifyContent: 'center'}}>
        <TextInput
          value={token_object.market.toUpperCase()}
          placeholder="Market: USDT"
          placeholderTextColor="grey"
          autoCapitalize="characters"
          onFocus={() => showMarkets(true)}
          onChangeText={value => {
            setTokenObj({...token_object, market: value.toLowerCase()});
            tobj.market = token_object.market;
          }}
          onEndEditing={() => showMarkets(false)}
          style={styles.coinInput}
        />
        {marketsVisible && (
          <DropDownList
            value={token_object.market}
            data={markets}
            setValue={setMarket}
          />
        )}
      </View>

      <TextInput
        placeholder="Amount: 0.0131"
        placeholderTextColor="grey"
        onChangeText={value => (tobj.amount = parseFloat(value))}
        style={styles.coinInput}
        keyboardType="numeric"
      />

      <TextInput
        placeholder="Price: 7500"
        placeholderTextColor="grey"
        onChangeText={value => (tobj.price = parseFloat(value))}
        style={styles.coinInput}
        keyboardType="numeric"
      />

      <View
        style={{
          alignSelf: 'center',
          marginTop: 10,
        }}>
        <TouchableHighlight
          underlayColor="grey"
          onPress={() => props.submit(tobj)}
          style={{
            backgroundColor: '#222831',
            borderRadius: 3,
          }}>
          <Text
            style={{
              color: '#fff',
              fontSize: 20,
              fontFamily: 'monospace',
              paddingVertical: 10,
              paddingHorizontal: 50,
            }}>
            Submit
          </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default gestureHandlerRootHOC(CoinInput);
