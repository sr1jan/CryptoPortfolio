import React, {useState, useEffect, useContext, useRef} from 'react';
import {
  View,
  Keyboard,
  Modal,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {useTheme, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {styles} from '../styles/styles';
import {token_prop} from '../types';
import {coins} from '../data/coins';
import {markets} from '../data/markets';
import DropDownList from './searchableList';
import {CoinInputContext} from '../context/coinInputContext';

interface Props {
  submit: (token_object: token_prop) => void;
}

const HEIGHT = Dimensions.get('window').height;

const CoinInput = (props: Props) => {
  const {toggleModal, coinInputModal} = useContext(CoinInputContext);
  const coinRef = useRef();
  const marketRef = useRef();
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
  const [topMarginFactor, setTopMarginFactor] = useState(8);

  const setCoin = (value: string) => {
    coinRef.current.blur();
    showCoins(false);
    setTokenObj({...token_object, coin: value.toUpperCase()});
  };

  const setMarket = (value: string) => {
    marketRef.current.blur();
    showMarkets(false);
    setTokenObj({...token_object, market: value.toUpperCase()});
  };

  const tobj = token_object;
  return (
    <Modal
      visible={coinInputModal}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}>
      <View
        style={{
          backgroundColor: colors.accent,
          marginTop: HEIGHT / topMarginFactor,
          marginHorizontal: 25,
          paddingVertical: 30,
          elevation: 5,
        }}>
        <View style={{alignSelf: 'flex-end', marginRight: 25}}>
          <TouchableOpacity onPress={toggleModal}>
            <Icon name="close" color={colors.placeholder} size={25} />
          </TouchableOpacity>
        </View>

        {!marketsVisible && (
          <View style={{justifyContent: 'center'}}>
            <TextInput
              ref={ref => (coinRef.current = ref)}
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
        )}

        {!coinsVisible && (
          <View style={{justifyContent: 'center'}}>
            <TextInput
              ref={ref => (marketRef.current = ref)}
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
              onFocus={() => {
                topMarginFactor !== 18 && setTopMarginFactor(18);
              }}
              onChangeText={value => (tobj.amount = parseFloat(value))}
              onEndEditing={() => {
                setTokenObj({...token_object, amount: tobj.amount});
              }}
              style={{...styles.coinInput, color: colors.text}}
              keyboardType="numeric"
            />

            <TextInput
              placeholder="Price: 7500"
              placeholderTextColor={colors.placeholder}
              selectionColor={colors.text}
              onFocus={() => {
                topMarginFactor !== 18 && setTopMarginFactor(18);
              }}
              onChangeText={value => (tobj.price = parseFloat(value))}
              onEndEditing={() => {
                setTokenObj({...token_object, price: tobj.price});
              }}
              style={{...styles.coinInput, color: colors.text}}
              keyboardType="numeric"
            />

            <View
              style={{
                alignSelf: 'center',
                marginTop: 15,
              }}>
              <TouchableOpacity
                activeOpacity={0.7}
                style={{backgroundColor: colors.background, borderRadius: 3}}
                onPress={() => {
                  Keyboard.dismiss();
                  props.submit(tobj);
                }}>
                <Text style={{...styles.submitText, color: colors.text}}>
                  Submit
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </Modal>
  );
};

export default CoinInput;
