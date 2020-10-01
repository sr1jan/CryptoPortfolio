import {
  UPDATE_PRICES,
  ADD_COIN,
  CLEAR_PORT,
  ADD_PRICE_DATA,
  LOAD_DATA,
  SET_THEME,
  DELETE_COIN,
} from './types';
import {token_prop, totalPort} from '../types';

export const addCoin = (coinDetail: token_prop, counter: number) => ({
  type: ADD_COIN,
  coinDetail: coinDetail,
  counter: counter,
});

export const loadDataFromStorage = (
  coinDetailList: token_prop[],
  counter: number,
  portData: totalPort,
  marketData: object,
) => ({
  type: LOAD_DATA,
  coinDetailList: coinDetailList,
  storedCounter: counter,
  portData: portData,
  marketData: marketData,
});

export const updatePrices = (coinDetail: token_prop, idx: number) => ({
  type: UPDATE_PRICES,
  newCoinDetail: coinDetail,
  idx: idx,
});

export const addPriceData = (data: object) => ({
  type: ADD_PRICE_DATA,
  data: data,
});

export const deleteCoin = (index: number) => ({
  type: DELETE_COIN,
  index: index,
});

export const setTheme = (theme: string) => ({
  type: SET_THEME,
  theme: theme,
});

export const clearPort = () => ({
  type: CLEAR_PORT,
});
