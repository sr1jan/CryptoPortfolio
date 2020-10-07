import {
  port_state,
  portActionTypes,
  totalPort,
  token_prop,
  addPriceDataType,
  addCoinType,
  updatePriceType,
  deleteCoinType,
  setThemeType,
  setCurrencyType,
} from '../types';

const InitialState: port_state = {
  counter: 0,
  token: [],
  priceData: {},
  currency: 'inr',
  theme: 'dark',
  inr: {
    totalInvestment: 0,
    totalPortAmount: 0,
    totalPortPercent: 0,
  },
  usdt: {
    totalInvestment: 0,
    totalPortAmount: 0,
    totalPortPercent: 0,
  },
};

const portReducer = (
  state: port_state = InitialState,
  action: portActionTypes,
): port_state => {
  switch (action.type) {
    case 'ADD_COIN':
      const {coinDetail, counter} = <addCoinType>action;
      return {
        ...state,
        token: state.token.concat(coinDetail),
        counter: counter,
        inr: {
          ...state.inr,
          totalInvestment: state.inr.totalInvestment + coinDetail.inr.cap,
          totalPortAmount: state.inr.totalPortAmount + coinDetail.inr.returns,
          totalPortPercent:
            ((state.inr.totalPortAmount + coinDetail.inr.returns) /
              (state.inr.totalInvestment + coinDetail.inr.cap)) *
            100,
        },
        usdt: {
          ...state.usdt,
          totalInvestment: state.usdt.totalInvestment + coinDetail.usdt.cap,
          totalPortAmount: state.usdt.totalPortAmount + coinDetail.usdt.returns,
          totalPortPercent:
            ((state.usdt.totalPortAmount + coinDetail.usdt.returns) /
              (state.usdt.totalInvestment + coinDetail.usdt.cap)) *
            100,
        },
      };

    case 'UPDATE_PRICES':
      const {newCoinDetail, idx} = <updatePriceType>action;
      const inrDiff = Math.abs(
        Math.abs(newCoinDetail.inr.returns) -
          Math.abs(state.token[idx].inr.returns),
      );
      const usdtDiff = Math.abs(
        Math.abs(newCoinDetail.usdt.returns) -
          Math.abs(state.token[idx].usdt.returns),
      );
      let inrNewTotalReturns = 0;
      let usdtNewTotalReturns = 0;
      if (newCoinDetail.returns > state.token[idx].returns) {
        inrNewTotalReturns = state.inr.totalPortAmount + inrDiff;
        usdtNewTotalReturns = state.usdt.totalPortAmount + usdtDiff;
      } else {
        inrNewTotalReturns = state.inr.totalPortAmount - inrDiff;
        usdtNewTotalReturns = state.usdt.totalPortAmount - usdtDiff;
      }

      state.token[idx] = newCoinDetail;
      return {
        ...state,
        token: state.token,
        inr: {
          ...state.inr,
          totalPortAmount: inrNewTotalReturns,
          totalPortPercent:
            (inrNewTotalReturns / state.inr.totalInvestment) * 100,
        },
        usdt: {
          ...state.usdt,
          totalPortAmount: usdtNewTotalReturns,
          totalPortPercent:
            (usdtNewTotalReturns / state.usdt.totalInvestment) * 100,
        },
      };

    case 'ADD_PRICE_DATA':
      const {data} = <addPriceDataType>action;
      return {
        ...state,
        priceData: data,
      };

    case 'DELETE_COIN':
      const {index} = <deleteCoinType>action;
      const coin = state.token[index];
      const inrNewPort = state.inr.totalInvestment - coin.inr.cap;
      const inrNewPortReturns = state.inr.totalPortAmount - coin.inr.returns;
      const inrNewPortPercent = (inrNewPortReturns / inrNewPort) * 100;

      const usdtNewPort = state.usdt.totalInvestment - coin.usdt.cap;
      const usdtNewPortReturns = state.usdt.totalPortAmount - coin.usdt.returns;
      const usdtNewPortPercent = (usdtNewPortReturns / usdtNewPort) * 100;

      state.token.splice(index, 1);
      return {
        ...state,
        token: state.token,
        counter: state.counter - 1,
        inr: {
          ...state.inr,
          totalInvestment: inrNewPort,
          totalPortAmount: inrNewPortReturns,
          totalPortPercent: inrNewPortPercent,
        },
        usdt: {
          ...state.usdt,
          totalInvestment: usdtNewPort,
          totalPortAmount: usdtNewPortReturns,
          totalPortPercent: usdtNewPortPercent,
        },
      };

    case 'SET_THEME':
      const {theme} = <setThemeType>action;
      return {
        ...state,
        theme: theme,
      };

    case 'SET_CURRENCY':
      const {currency} = <setCurrencyType>action;
      return {
        ...state,
        currency: currency,
      };

    case 'CLEAR_PORT':
      const tokensEmpty: token_prop[] = [];
      const totalPortEmpty: totalPort = {
        totalInvestment: 0,
        totalPortAmount: 0,
        totalPortPercent: 0,
      };
      return {
        ...state,
        token: tokensEmpty,
        counter: 0,
        inr: totalPortEmpty,
        usdt: totalPortEmpty,
        priceData: {},
      };

    default:
      return state;
  }
};

export default portReducer;
