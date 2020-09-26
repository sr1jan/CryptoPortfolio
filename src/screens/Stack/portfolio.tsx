import React, {useState, useEffect} from 'react';
import {View, Modal, Alert, ActivityIndicator} from 'react-native';
import {styles} from '../../styles/styles';
import {
  token_prop,
  app_state,
  addCoinType,
  updatePriceType,
  addPriceDataType,
  totalPort,
} from '../../types';

import {connect} from 'react-redux';
import {addCoin, updatePrices, addPriceData} from '../../actions/port';

import CoinInput from '../../components/coinInput';
import DisplayPL from '../../components/displayPL';
import NewCoin from '../../components/newCoin';
import {
  storeCoinDetail,
  storeCounter,
  storeTotalPort,
  storeMarketData,
} from '../../helpers/asyncStorage';

import {currencyConversion} from '../../helpers/currency';

import {pairs} from '../../data/pairs';
const URL = 'https://api.wazirx.com/api/v2/tickers';

interface Props {
  token: token_prop[];
  counter: number;
  inr: totalPort;
  priceData: object;
  addCoin: (coinDetail: token_prop, counter: number) => addCoinType;
  updatePrices: (coinDetail: token_prop, idx: number) => updatePriceType;
  priceDataUpdate: (data: object) => addPriceDataType;
}

const Portfolio = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const fetchData = async () => {
    const response = await fetch(URL);
    const json = await response.json();
    return json;
  };

  useEffect(() => {
    const storeData = async () => {
      await storeCounter(props.counter);
      await storeCoinDetail(props.token);
      await storeTotalPort(props.inr);
      await storeMarketData(props.priceData);
    };
    storeData();
  }, [props.counter]);

  useEffect(() => {
    if (props.counter < 1) return;
    const _interval = setInterval(async () => {
      let json: object;
      try {
        json = await fetchData();
      } catch (e) {
        console.log(e, 'location: useEffect portfolio');
        return;
      }
      props.token.map((token_object, idx) => {
        const name = token_object.coin + token_object.market;
        const curPrice = json[name].last;
        const curVal = curPrice * token_object.amount;
        const returns = curVal - token_object.boughtVal;
        if (returns.toFixed(2) === token_object.returns.toFixed(2)) return;
        const percent = (returns / token_object.boughtVal) * 100;
        let inrReturns = 0;
        if (token_object.market === 'inr') {
          inrReturns = returns;
        } else {
          inrReturns = currencyConversion({
            amount: returns,
            from: 'usdt',
            to: 'inr',
            priceData: json,
          });
        }
        token_object = {
          ...token_object,
          returns: returns,
          percent: percent,
          inr: {...token_object.inr, returns: inrReturns},
        };
        props.updatePrices(token_object, idx);
        props.priceDataUpdate(json);
      });
    }, 10000);

    return () => {
      clearInterval(_interval);
    };
  }, [props.counter]);

  const submit = async (token_object: token_prop) => {
    if (
      token_object.amount === 0 ||
      token_object.price === 0 ||
      token_object.coin === '' ||
      token_object.market === ''
    ) {
      Alert.alert('Error', 'Please fill in all the required details');
    } else if (pairs.indexOf(token_object.coin + token_object.market) === -1) {
      Alert.alert(
        'Error',
        'Could not find the specified coin/market. Please try something else.',
      );
    } else {
      token_object.id = props.counter + 1;
      token_object.boughtVal = token_object.amount * token_object.price;
      toggleOverlay();
      setLoading(true);
      await newCoin(token_object);
    }
  };

  const newCoin = async (token_object: token_prop) => {
    let json: object;
    try {
      json = await fetchData();
      props.priceDataUpdate(json);
    } catch (e) {
      setLoading(false);
      Alert.alert(
        'SERVER ERROR',
        'Failed to fetch data from the market, try again after sometime',
      );
      return;
    }
    const name = token_object.coin + token_object.market;
    const boughtVal = token_object.boughtVal;
    const curPrice = json[name].last;
    const curVal = curPrice * token_object.amount;
    const returns = curVal - boughtVal;
    const percent = (returns / boughtVal) * 100;
    const inr = {
      cap: 0,
      returns: 0,
    };
    if (token_object.market === 'inr') {
      inr.cap = boughtVal;
      inr.returns = returns;
    } else {
      inr.cap = currencyConversion({
        amount: boughtVal,
        from: token_object.market,
        to: 'inr',
        priceData: json,
      });
      inr.returns = currencyConversion({
        amount: returns,
        from: token_object.market,
        to: 'inr',
        priceData: json,
      });
    }
    token_object = {
      ...token_object,
      returns: returns,
      percent: percent,
      inr: inr,
    };
    props.addCoin(token_object, token_object.id);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {!loading && !props.counter && (
          <NewCoin toggleOverlay={toggleOverlay} />
        )}
        {props.counter > 0 && <DisplayPL toggleOverlay={toggleOverlay} />}
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </View>
      <Modal
        visible={visible}
        onRequestClose={toggleOverlay}
        animationType="slide"
        statusBarTranslucent={true}>
        {
          <CoinInput
            submit={submit}
            token={props.token}
            toggleOverlay={toggleOverlay}
          />
        }
      </Modal>
    </View>
  );
};

const mapStateToProps = (state: app_state) => {
  return {
    token: state.portReducer.token,
    counter: state.portReducer.counter,
    inr: state.portReducer.inr,
    priceData: state.portReducer.priceData,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    addCoin: (coinDetail: token_prop, counter: number) =>
      dispatch(addCoin(coinDetail, counter)),
    updatePrices: (coinDetail: token_prop, idx: number) =>
      dispatch(updatePrices(coinDetail, idx)),
    priceDataUpdate: (data: object) => dispatch(addPriceData(data)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Portfolio);
