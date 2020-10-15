import {Alert} from 'react-native';
import {token_prop} from '../types';
import {pairs} from '../data/pairs';
import {currencyConversion} from './currency';
import {alertModalType} from '../types';
import RNFetchBlob from 'rn-fetch-blob';

export const fetchData = async () => {
  const URL = 'https://api.wazirx.com/api/v2/tickers';
  const response = await RNFetchBlob.fetch('GET', URL);
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
  callDialog: (alertModalType) => void;
}

interface UpdateCoinProps {
  token: token_prop[];
  priceDataUpdate: (object) => void;
  updatePrices: (token_prop, number) => void;
}

export const convertCurrency = (token_object: token_prop, json: object) => {
  let inr =
    token_object.market === 'inr'
      ? {cap: token_object.capital, returns: token_object.returns}
      : {
          cap: currencyConversion({
            amount: token_object.capital,
            from: token_object.market,
            to: 'inr',
            priceData: json,
          }),
          returns: currencyConversion({
            amount: token_object.returns,
            from: token_object.market,
            to: 'inr',
            priceData: json,
          }),
        };

  let usdt =
    token_object.market === 'usdt'
      ? {cap: token_object.capital, returns: token_object.returns}
      : {
          cap: currencyConversion({
            amount: token_object.capital,
            from: token_object.market,
            to: 'usdt',
            priceData: json,
          }),
          returns: currencyConversion({
            amount: token_object.returns,
            from: token_object.market,
            to: 'usdt',
            priceData: json,
          }),
        };

  return {inr, usdt};
};

export const AddNewCoin = async (props: AddCoinProps) => {
  let token_object = props.token_object;
  token_object.coin = token_object.coin.toLowerCase();
  token_object.market = token_object.market.toLowerCase();

  const submit = async () => {
    if (
      token_object.amount === 0 ||
      token_object.price === 0 ||
      token_object.coin === '' ||
      token_object.market === ''
    ) {
      const dialog = {
        title: 'Uh-Oh!',
        description: 'Please fill in all the required details',
        suppressText: 'OK',
        suppress: () => props.callDialog({visible: false}),
        visible: true,
      };
      props.callDialog(dialog);
    } else if (pairs.indexOf(token_object.coin + token_object.market) === -1) {
      const dialog = {
        title: 'Uh-Oh!',
        description:
          'Could not find coin/market pair. Please try something else.',
        suppressText: 'OK',
        suppress: () => props.callDialog({visible: false}),
        visible: true,
      };
      props.callDialog(dialog);
    } else {
      token_object.id = props.counter + 1;
      token_object.capital = token_object.amount * token_object.price;

      token_object.date = new Date().toString().slice(0, 15);
      props.toggleModal();
      props.setLoading(true);
      await newCoin();
    }
  };

  const newCoin = async () => {
    let json: object;

    if (Object.keys(props.priceData).length !== 0) {
      json = props.priceData;
    } else {
      try {
        json = await fetchData();
      } catch (e) {
        props.setLoading(false);
        const dialog = {
          title: 'Server Error',
          description:
            'Failed to fetch data from the market, try again after sometime',
          suppressText: 'OK',
          suppress: () => props.callDialog({visible: false}),
          visible: true,
        };
        props.callDialog(dialog);
        return;
      }
    }

    const name = token_object.coin + token_object.market;
    const capital = token_object.capital;
    const curPrice = json[name].last;
    const curVal = curPrice * token_object.amount;
    const returns = curVal - capital;
    const percent = (returns / capital) * 100;

    token_object.returns = returns;
    token_object.percent = percent;

    const {inr, usdt} = convertCurrency(token_object, json);
    token_object = {
      ...token_object,
      inr: inr,
      usdt: usdt,
    };

    props.priceDataUpdate(json);
    props.addCoin(token_object, token_object.id);
    props.setLoading(false);
  };

  submit();
};

export const UpdateCoins = async (props: UpdateCoinProps) => {
  if (props.token.length < 1) return;

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
    const returns = curVal - token_object.capital;
    if (returns.toFixed(2) === token_object.returns.toFixed(2)) return;
    const percent = (returns / token_object.capital) * 100;

    let inrReturns = 0;
    let usdtReturns = 0;

    inrReturns =
      token_object.market === 'inr'
        ? returns
        : currencyConversion({
            amount: returns,
            from: token_object.market,
            to: 'inr',
            priceData: json,
          });
    usdtReturns =
      token_object.market === 'usdt'
        ? returns
        : currencyConversion({
            amount: returns,
            from: token_object.market,
            to: 'usdt',
            priceData: json,
          });

    token_object = {
      ...token_object,
      returns: returns,
      percent: percent,
      inr: {...token_object.inr, returns: inrReturns},
      usdt: {...token_object.usdt, returns: usdtReturns},
    };
    props.updatePrices(token_object, idx);
  });

  props.priceDataUpdate(json);
};
