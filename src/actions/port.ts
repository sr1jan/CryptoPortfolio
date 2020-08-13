import {UPDATE_PRICES, ADD_COIN, CLEAR_PORT, ADD_PRICE_DATA} from './types';
import {token_prop} from '../types';

export const addCoin = (coinDetail: token_prop[], counter: number) => ({
  type: ADD_COIN,
  coinDetailList: coinDetail,
  counter: counter,
});

export const updatePrices = (coinDetail: token_prop, idx: number) => ({
  type: UPDATE_PRICES,
  coinDetail: coinDetail,
  idx: idx,
});

export const clearPort = () => ({
  type: CLEAR_PORT,
});

export const addPriceData = (data: object) => ({
  type: ADD_PRICE_DATA,
  data: data,
});
