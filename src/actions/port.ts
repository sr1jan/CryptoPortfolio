import {token_prop, totalPort} from '../types';

export const addCoin = (coinDetail: token_prop, counter: number) => ({
  type: 'ADD_COIN',
  coinDetail: coinDetail,
  counter: counter,
});

export const updatePrices = (coinDetail: token_prop, idx: number) => ({
  type: 'UPDATE_PRICES',
  newCoinDetail: coinDetail,
  idx: idx,
});

export const addPriceData = (data: object) => ({
  type: 'ADD_PRICE_DATA',
  data: data,
});

export const deleteCoin = (index: number) => ({
  type: 'DELETE_COIN',
  index: index,
});

export const setTheme = (theme: string) => ({
  type: 'SET_THEME',
  theme: theme,
});

export const setCurrency = (currency: string) => ({
  type: 'SET_CURRENCY',
  currency: currency,
});

export const clearPort = () => ({
  type: 'CLEAR_PORT',
});
