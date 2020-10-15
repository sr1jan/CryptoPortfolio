import React, {useState, useContext, useRef} from 'react';
import {
  View,
  Text,
  TextInput,
  Keyboard,
  Modal,
  TouchableOpacity,
} from 'react-native';
import {material} from 'react-native-typography';
import {useTheme} from 'react-native-paper';
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

const CoinInput = (props: Props) => {
  const coinRef = useRef();
  const marketRef = useRef();
  const {colors} = useTheme();
  const {toggleModal, coinInputModal} = useContext(CoinInputContext);
  const [coinsVisible, showCoins] = useState<boolean>(false);
  const [marketsVisible, showMarkets] = useState<boolean>(false);
  const [token_object, setTokenObj] = useState<token_prop>({
    id: 0,
    coin: '',
    market: '',
    amount: 0,
    price: 0,
    capital: 0,
    returns: 0,
    percent: 0,
    inr: {cap: 0, returns: 0},
    usdt: {cap: 0, returns: 0},
    date: '',
  });

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
      animationType="fade"
      transparent={true}
      onRequestClose={toggleModal}>
      <View
        style={{
          flex: 1,
          alignItems: 'stretch',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.5)',
        }}>
        <View
          style={{
            backgroundColor: colors.background,
            marginHorizontal: 35,
            paddingTop: 20,
            paddingBottom: 30,
            elevation: 10,
          }}>
          <View
            style={{
              alignSelf: 'flex-end',
              marginRight: 20,
              padding: 10,
            }}>
            <TouchableOpacity onPress={toggleModal}>
              <Icon name="close" color={colors.placeholder} size={20} />
            </TouchableOpacity>
          </View>

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
                  style={{
                    borderWidth: 0.2,
                    borderColor: colors.placeholder,
                  }}
                  onPress={() => {
                    Keyboard.dismiss();
                    props.submit(tobj);
                  }}>
                  <Text
                    style={{
                      ...material.buttonObject,
                      color: colors.text,
                      fontSize: 14,
                      paddingHorizontal: 25,
                      paddingVertical: 7,
                      letterSpacing: 1.5,
                    }}>
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CoinInput;
