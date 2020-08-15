import AsyncStorage from '@react-native-community/async-storage';
import {totalPort, token_prop} from '../types';

export const getCounter = async () => {
  try {
    const value = await AsyncStorage.getItem('counter');
    return value != null ? parseInt(value) : null;
  } catch (e) {
    console.log('Could not retrieve the counter', e);
  }
};

export const storeCounter = async (num: number) => {
  try {
    const value = num.toString();
    await AsyncStorage.setItem('counter', value);
  } catch (e) {
    console.log('Could not store the counter', e);
  }
};

export const getCoinDetail = async () => {
  try {
    const detail = await AsyncStorage.getItem('coins');
    return JSON.parse(detail);
  } catch (e) {
    console.log('Could not get coin detail', e);
  }
};

export const storeCoinDetail = async (data: token_prop[]) => {
  try {
    const value = JSON.stringify(data);
    await AsyncStorage.setItem('coins', value);
  } catch (e) {
    console.log('Could not store the coin detail', e);
  }
};

export const storeMarketData = async (data: object) => {
  try {
    const value = JSON.stringify(data);
    await AsyncStorage.setItem('marketData', value);
  } catch (e) {
    console.log('Could not store the market data', e);
  }
};

export const getMarketData = async () => {
  try {
    const data = await AsyncStorage.getItem('marketData');
    return JSON.parse(data);
  } catch (e) {
    console.log('Could not retreive market data from local storage', e);
  }
};

export const storeTotalPort = async (portData: totalPort) => {
  try {
    const data = JSON.stringify(portData);
    await AsyncStorage.setItem('portData', data);
  } catch (e) {
    console.log('Could not store the total portData', e);
  }
};

export const getTotalPort = async () => {
  try {
    const data = await AsyncStorage.getItem('portData');
    return JSON.parse(data);
  } catch (e) {
    console.log('Could not retrieve total port values from local storage', e);
  }
};

export const deletePortfolio = async () => {
  const keys = ['counter', 'coins', 'portData', 'marketData'];
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log('Could not delete the portfolio', e);
  }
};
