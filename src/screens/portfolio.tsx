import React, {useState, useEffect, useContext} from 'react';
import {View} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useDispatch, useSelector, shallowEqual} from 'react-redux';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {token_prop, app_state} from '../types';
import {styles} from '../styles/styles';

import {addCoin, updatePrices, addPriceData} from '../actions/port';
import {alertModalType} from '../types';

import AlertModal from '../modals/alertModal';
import Loading from '../components/loading';
import CoinInput from '../components/coinInput';
import DisplayPL from '../components/displayPL';
import NewCoin from '../components/newCoin';

import {AddNewCoin, UpdateCoins} from '../helpers/coinOperations';
import {CoinInputContext} from '../context/coinInputContext';

const Portfolio = () => {
  const route = useRoute();
  const dispatch = useDispatch();
  const theme = useTheme();
  const {toggleModal, coinInputModal} = useContext(CoinInputContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [dialog, setDialog] = useState<alertModalType>({
    visible: false,
    title: '',
    description: '',
    actText: '',
    suppressText: '',
    act: () => {},
    suppress: () => {},
  });

  const token: token_prop[] = useSelector<app_state>(
    state => state.portReducer.token,
  );
  const counter: number = useSelector<app_state>(
    state => state.portReducer.counter,
  );
  const priceData: object = useSelector<app_state>(
    state => state.portReducer.priceData,
  );

  const callDialog = (values: alertModalType) => {
    setDialog(values);
  };

  const priceDataUpdate = (data: object) => {
    dispatch({type: 'ADD_PRICE_DATA', data: data});
  };

  const updatePrices = (coinDetail: token_prop, idx: number) => {
    dispatch({type: 'UPDATE_PRICES', newCoinDetail: coinDetail, idx: idx});
  };

  const addCoin = (coinDetail: token_prop, counter: number) => {
    dispatch({type: 'ADD_COIN', coinDetail: coinDetail, counter: counter});
  };

  useEffect(() => {
    if (route.params !== undefined) {
      toggleModal();
    }
  }, [route.params]);

  useEffect(() => {
    if (counter < 1) return;
    const _interval = setInterval(async () => {
      await UpdateCoins({
        token: token,
        priceDataUpdate: priceDataUpdate,
        updatePrices: updatePrices,
      });
    }, 60000);

    return () => {
      clearInterval(_interval);
    };
  }, [counter]);

  useEffect(() => {
    if (counter > 0) return;
    dispatch({type: 'DELETE_RETURNS'});
    dispatch({type: 'CLEAR_PORT'});
  }, [counter]);

  const submit = (token_object: token_prop) => {
    AddNewCoin({
      token_object: token_object,
      counter: counter,
      setLoading: setLoading,
      priceDataUpdate: priceDataUpdate,
      addCoin: addCoin,
      toggleModal: toggleModal,
      priceData: priceData,
      callDialog: callDialog,
    });
  };

  return (
    <View
      style={{...styles.container, backgroundColor: theme.colors.background}}>
      <View style={{flex: 1}}>
        {!loading && !counter && !coinInputModal && <NewCoin />}
        {counter > 0 && <DisplayPL token={token} />}
        {loading && <Loading />}
      </View>
      {coinInputModal && <CoinInput submit={submit} />}
      {dialog.visible && (
        <AlertModal
          title={dialog.title}
          description={dialog.description}
          act={dialog.act !== undefined ? dialog.act : () => {}}
          actText={dialog.actText !== undefined ? dialog.actText : ''}
          suppress={dialog.suppress}
          suppressText={dialog.suppressText}
          visible={dialog.visible}
        />
      )}
    </View>
  );
};

export default Portfolio;
