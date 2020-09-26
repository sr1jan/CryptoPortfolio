import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {
  RectButton,
  BorderlessButton,
  gestureHandlerRootHOC,
  TextInput,
} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {styles} from '../styles/styles';
import {token_prop} from '../types';
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
    inr: {cap: 0, returns: 0},
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
        ...styles.mainContent,
        alignItems: 'stretch',
        backgroundColor: '#393e46',
      }}>
      <View style={{alignSelf: 'flex-end', marginRight: 30, marginBottom: 10}}>
        <BorderlessButton onPress={props.toggleOverlay}>
          <Icon name="close" size={30} color="grey" />
        </BorderlessButton>
      </View>

      <View style={{justifyContent: 'center'}}>
        <TextInput
          value={token_object.coin.toUpperCase()}
          placeholder="Coin: BTC"
          placeholderTextColor="grey"
          keyboardType="visible-password"
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
          keyboardType="visible-password"
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
          marginTop: 15,
        }}>
        <RectButton
          style={{backgroundColor: '#fff', borderRadius: 3}}
          onPress={() => props.submit(tobj)}>
          <Text style={styles.submitText}>Submit</Text>
        </RectButton>
      </View>
    </View>
  );
};

export default gestureHandlerRootHOC(CoinInput);
