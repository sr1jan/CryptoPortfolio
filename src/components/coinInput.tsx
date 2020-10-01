import React, {useState, useEffect} from 'react';
import {View, Text, BackHandler} from 'react-native';
import {
  RectButton,
  BorderlessButton,
  TextInput,
} from 'react-native-gesture-handler';
import {useTheme} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {styles} from '../styles/styles';
import {token_prop} from '../types';
import {coins} from '../data/coins';
import {markets} from '../data/markets';
import DropDownList from './searchableList';

interface Props {
  submit: (token_object: token_prop) => void;
  toggleModal: () => void;
}

const CoinInput = (props: Props) => {
  const {colors} = useTheme();
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

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        props.toggleModal();
        return true;
      },
    );
    return () => backHandler.remove();
  }, []);

  const setCoin = (value: string) => {
    setTokenObj({...token_object, coin: value.toUpperCase()});
  };

  const setMarket = (value: string) => {
    setTokenObj({...token_object, market: value.toUpperCase()});
  };

  const tobj = token_object;
  return (
    <View
      style={{
        ...styles.mainContent,
        alignItems: 'stretch',
        backgroundColor: colors.background,
      }}>
      <View style={{alignSelf: 'flex-end', marginRight: 30, marginBottom: 10}}>
        <BorderlessButton onPress={props.toggleModal}>
          <Icon name="close" size={30} color={colors.accent} />
        </BorderlessButton>
      </View>

      <View style={{justifyContent: 'center'}}>
        <TextInput
          value={token_object.coin}
          placeholder="Coin: BTC"
          placeholderTextColor={colors.placeholder}
          selectionColor={colors.text}
          keyboardType="visible-password"
          onFocus={() => showCoins(true)}
          onChangeText={value => {
            setTokenObj({...token_object, coin: value});
          }}
          onEndEditing={() => showCoins(false)}
          style={{...styles.coinInput, color: colors.text}}
        />
        {coinsVisible && (
          <DropDownList
            value={token_object.coin}
            data={coins}
            setValue={setCoin}
          />
        )}
      </View>

      {!coinsVisible && (
        <View style={{justifyContent: 'center'}}>
          <TextInput
            value={token_object.market}
            placeholder="Market: USDT"
            placeholderTextColor={colors.placeholder}
            selectionColor={colors.text}
            keyboardType="visible-password"
            onFocus={() => showMarkets(true)}
            onChangeText={value => {
              setTokenObj({...token_object, market: value});
            }}
            onEndEditing={() => showMarkets(false)}
            style={{...styles.coinInput, color: colors.text}}
          />
          {marketsVisible && (
            <DropDownList
              value={token_object.market}
              data={markets}
              setValue={setMarket}
            />
          )}
        </View>
      )}

      {!coinsVisible && !marketsVisible && (
        <View>
          <TextInput
            placeholder="Amount: 0.0131"
            placeholderTextColor={colors.placeholder}
            selectionColor={colors.text}
            onChangeText={value => (tobj.amount = parseFloat(value))}
            onEndEditing={() =>
              setTokenObj({...token_object, amount: tobj.amount})
            }
            style={{...styles.coinInput, color: colors.text}}
            keyboardType="numeric"
          />

          <TextInput
            placeholder="Price: 7500"
            placeholderTextColor={colors.placeholder}
            selectionColor={colors.text}
            onChangeText={value => (tobj.price = parseFloat(value))}
            onEndEditing={() =>
              setTokenObj({...token_object, price: tobj.price})
            }
            style={{...styles.coinInput, color: colors.text}}
            keyboardType="numeric"
          />

          <View
            style={{
              alignSelf: 'center',
              marginTop: 15,
            }}>
            <RectButton
              underlayColor={colors.text}
              style={{backgroundColor: colors.accent, borderRadius: 3}}
              onPress={() => props.submit(tobj)}>
              <Text style={{...styles.submitText, color: colors.text}}>
                Submit
              </Text>
            </RectButton>
          </View>
        </View>
      )}
    </View>
  );
};

export default CoinInput;
