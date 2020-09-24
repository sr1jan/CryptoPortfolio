import React, {useState, useEffect} from 'react';
import {View, Modal, Alert, ActivityIndicator} from 'react-native';
import {styles} from '../../styles/styles';
import {
  token_prop,
  theme_prop,
  app_state,
  addCoinType,
  updatePriceType,
  addPriceDataType,
  totalPort,
  loadDataType,
} from '../../types';

import {connect} from 'react-redux';
import {
  addCoin,
  updatePrices,
  addPriceData,
  loadDataFromStorage,
} from '../../actions/port';

import CoinInput from '../../components/coinInput';
import DisplayPL from '../../components/displayPL';
import NewCoin from '../../components/newCoin';
import {
  getCoinDetail,
  getCounter,
  storeCoinDetail,
  storeCounter,
  getTotalPort,
  storeTotalPort,
  storeMarketData,
  getMarketData,
} from '../../helpers/asyncStorage';

import {pairs} from '../../data/pairs';
const URL = 'https://api.wazirx.com/api/v2/tickers';

interface Props {
  theme: theme_prop;
  token: token_prop[];
  counter: number;
  inr: totalPort;
  priceData: object;
  addCoin: (coinDetail: token_prop, counter: number) => addCoinType;
  updatePrices: (coinDetail: token_prop, idx: number) => updatePriceType;
  priceDataUpdate: (data: object) => addPriceDataType;
  loadDataFromStorage: (
    coinDetailList: token_prop[],
    counter: number,
    portData: totalPort,
    marketData: object,
  ) => loadDataType;
}

const Portfolio = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const _interval = setInterval(async () => {
      let json: object;
      try {
        json = await fetchData();
      } catch (e) {
        console.log(e);
        return;
      }
      props.token.map(token_object => {
        const idx = token_object.id - 1;
        const name = token_object.coin + token_object.market;
        const curPrice = json[name].last;
        const curVal = curPrice * token_object.amount;
        const returns = curVal - token_object.boughtVal;
        if (returns.toFixed(2) === token_object.returns.toFixed(2)) return;
        const percent = (returns / token_object.boughtVal) * 100;
        token_object = {
          ...token_object,
          returns: returns,
          percent: percent,
        };
        props.updatePrices(token_object, idx);
        props.priceDataUpdate(json);
      });
      try {
        await storeCoinDetail(props.token);
        await storeTotalPort(props.inr);
        await storeMarketData(props.priceData);
      } catch (e) {
        console.log(e);
      }
    }, 10000);

    return () => {
      clearInterval(_interval);
    };
  }, [props.token.length]);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const fetchData = async () => {
    const response = await fetch(URL);
    const json = await response.json();
    return json;
  };

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
      setLoading(!loading);
      newCoin(token_object);
    }
  };

  const newCoin = async (token_object: token_prop) => {
    let json: object;
    try {
      json = await fetchData();
      props.priceDataUpdate(json);
    } catch (e) {
      setLoading(!loading);
      Alert.alert(
        'SERVER ERROR',
        'Failed to fetch data from the market, try again after sometime',
      );
      console.log('Could not fetch coin detail from the api', e);
      return;
    }
    const name = token_object.coin + token_object.market;
    const boughtVal = token_object.boughtVal;
    const curPrice = json[name].last;
    const curVal = curPrice * token_object.amount;
    const returns = curVal - boughtVal;
    const percent = (returns / boughtVal) * 100;
    token_object = {
      ...token_object,
      returns: returns,
      percent: percent,
    };
    props.addCoin(token_object, token_object.id);
    setLoading(!loading);
    try {
      await storeCounter(props.counter);
      await storeCoinDetail(props.token);
      await storeTotalPort(props.inr);
      await storeMarketData(props.priceData);
    } catch (e) {
      console.log('Could not store newCoin in local storage', e);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        {!loading && !props.counter && (
          <NewCoin theme={props.theme} toggleOverlay={toggleOverlay} />
        )}
        {props.counter > 0 && (
          <DisplayPL theme={props.theme} toggleOverlay={toggleOverlay} />
        )}
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
    loadDataFromStorage: (
      coinDetailList: token_prop[],
      counter: number,
      portData: totalPort,
      marketData: object,
    ) =>
      dispatch(
        loadDataFromStorage(coinDetailList, counter, portData, marketData),
      ),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Portfolio);
