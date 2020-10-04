import {Alert} from 'react-native';
import {token_prop} from '../types';
import {pairs} from '../data/pairs';
import {currencyConversion} from './currency';

export const fetchData = async () => {
  const URL = 'https://api.wazirx.com/api/v2/tickers';
  const response = await fetch(URL);
  const json = await response.json();
  return json;
};

interface AddCoinProps {
  token_object: token_prop;
  counter: number;
  setLoading: (boolean) => void;
  priceDataUpdate: (object) => void;
  addCoin: (token_prop, number) => void;
  toggleModal: () => void;
  priceData: object;
}

interface UpdateCoinProps {
  token: token_prop[];
  priceDataUpdate: (object) => void;
  updatePrices: (token_prop, number) => void;
}

export const AddNewCoin = async (props: AddCoinProps) => {
  let token_object = props.token_object;

  const submit = async () => {
    token_object.coin = token_object.coin.toLowerCase();
    token_object.market = token_object.market.toLowerCase();
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
      props.toggleModal();
      props.setLoading(true);
      await newCoin();
    }
  };

  const newCoin = async () => {
    let json: object;
    try {
      json = await fetchData();
    } catch (e) {
      if (Object.keys(props.priceData).length !== 0) {
        json = props.priceData;
      } else {
        props.setLoading(false);
        Alert.alert(
          'SERVER ERROR',
          'Failed to fetch data from the market, try again after sometime',
        );
        return;
      }
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

    props.priceDataUpdate(json);
    props.addCoin(token_object, token_object.id);
    props.setLoading(false);
  };

  submit();
};

export const UpdateCoins = async (props: UpdateCoinProps) => {
  let json: object;
  try {
    json = await fetchData();
  } catch (e) {
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
  });

  props.priceDataUpdate(json);
};
