import AsyncStorage from '@react-native-community/async-storage';

interface token_prop {
  id: number;
  coin: string;
  market: string;
  amount: number;
  price: number;
  boughtVal: number;
  profit: number;
  loss: number;
}

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
    return detail != null ? JSON.parse(detail) : null;
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

export const deletePortfolio = async () => {
  const keys = ['counter', 'coins'];
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    console.log('Could not delete the portfolio', e);
  }
};
