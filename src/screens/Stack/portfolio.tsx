import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import {Modal, Portal, useTheme, ActivityIndicator} from 'react-native-paper';

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
import {AddNewCoin, UpdateCoins} from '../../helpers/coinOperations';

import {CoinInputContext} from '../../context/coinInputContext';

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
  const theme = useTheme();
  const {toggleModal, coinInputModal} = useContext(CoinInputContext);
  const [loading, setLoading] = useState<boolean>(false);

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
      await UpdateCoins({
        token: props.token,
        priceDataUpdate: props.priceDataUpdate,
        updatePrices: props.updatePrices,
      });
    }, 10000);

    return () => {
      clearInterval(_interval);
    };
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
        {!loading && !props.counter && <NewCoin />}
        {props.counter > 0 && (
          <DisplayPL token={props.token} priceData={props.priceData} />
        )}
        {loading && (
          <View style={styles.loading}>
            <ActivityIndicator size="small" color={theme.colors.onSurface} />
          </View>
        )}
      </View>
      {coinInputModal && (
        <Portal>
          <Modal
            visible={coinInputModal}
            onDismiss={toggleModal}
            contentContainerStyle={{flex: 1}}>
            <CoinInput submit={submit} toggleModal={toggleModal} />
          </Modal>
        </Portal>
      )}
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
