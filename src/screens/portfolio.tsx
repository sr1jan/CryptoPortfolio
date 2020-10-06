import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {connect, useDispatch} from 'react-redux';
import {useRoute} from '@react-navigation/native';

import {
  token_prop,
  app_state,
  addCoinType,
  updatePriceType,
  addPriceDataType,
  totalPort,
} from '../types';
import {styles} from '../styles/styles';

import {addCoin, updatePrices, addPriceData} from '../actions/port';

import Loading from '../components/loading';
import CoinInput from '../components/coinInput';
import DisplayPL from '../components/displayPL';
import NewCoin from '../components/newCoin';

import {AddNewCoin, UpdateCoins} from '../helpers/coinOperations';
import {CoinInputContext} from '../context/coinInputContext';

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
  const route = useRoute();
  const dispatch = useDispatch();
  const theme = useTheme();
  const {toggleModal, coinInputModal} = useContext(CoinInputContext);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (route.params !== undefined) {
      toggleModal();
    }
  }, [route.params]);

  useEffect(() => {
    if (props.counter < 1) return;
    const _interval = setInterval(async () => {
      await UpdateCoins({
        token: props.token,
        priceDataUpdate: props.priceDataUpdate,
        updatePrices: props.updatePrices,
      });
    }, 60000);

    return () => {
      clearInterval(_interval);
    };
  }, [props.counter]);

  useEffect(() => {
    if (props.counter > 0) return;
    dispatch({type: 'DELETE_RETURNS'});
    dispatch({type: 'CLEAR_PORT'});
  }, [props.counter]);

  const submit = async (token_object: token_prop) => {
    AddNewCoin({
      token_object: token_object,
      counter: props.counter,
      setLoading: setLoading,
      priceDataUpdate: props.priceDataUpdate,
      addCoin: props.addCoin,
      toggleModal: toggleModal,
      priceData: props.priceData,
    });
  };

  return (
    <View
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <View style={{flex: 1}}>
        {!loading && !props.counter && !coinInputModal && <NewCoin />}
        {props.counter > 0 && <DisplayPL token={props.token} />}
        {loading && <Loading />}
      </View>
      {coinInputModal && <CoinInput submit={submit} />}
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