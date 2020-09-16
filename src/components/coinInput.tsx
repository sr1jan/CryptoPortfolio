import React from 'react';
import {View, TextInput} from 'react-native';
import {Button, Input, Icon} from 'react-native-elements';
import {token_prop} from '../types';

interface Props {
  submit: (token_object: token_prop) => void;
  token: token_prop[];
}

export default function CoinInput(props: Props) {
  let token_object: token_prop = {
    id: 0,
    coin: '',
    market: '',
    amount: 0,
    price: 0,
    boughtVal: 0,
    returns: 0,
    percent: 0,
  };

  return (
    <View
      style={{
        justifyContent: 'space-between',
        alignItems: 'stretch',
        marginTop: 20,
        marginBottom: 20,
        marginRight: 70,
        marginLeft: 70,
      }}>
      <TextInput
        placeholder="Coin: BTC"
        onChangeText={value => (token_object.coin = value.toLowerCase())}
        style={{textAlign: 'center', fontSize: 20}}
      />
      <TextInput
        placeholder="Market: USDT"
        onChangeText={value => (token_object.market = value.toLowerCase())}
        style={{textAlign: 'center', fontSize: 20}}
      />
      <TextInput
        placeholder="Amount: 0.0131"
        onChangeText={value => (token_object.amount = parseFloat(value))}
        style={{textAlign: 'center', fontSize: 20}}
        keyboardType="numeric"
      />
      <TextInput
        placeholder="Price: 7500"
        onChangeText={value => (token_object.price = parseFloat(value))}
        style={{textAlign: 'center', fontSize: 20}}
        keyboardType="numeric"
      />
      <Button
        title="Submit"
        type="outline"
        containerStyle={{marginTop: 15, marginBottom: 15}}
        titleStyle={{fontSize: 15}}
        onPress={() => props.submit(token_object)}
        raised
      />
    </View>
  );
}
