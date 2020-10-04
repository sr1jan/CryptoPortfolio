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
      };

    case 'UPDATE_PRICES':
      const {newCoinDetail, idx} = <updatePriceType>action;
      let newTotalReturns: number = state.inr.totalPortAmount;
      const newReturns = newCoinDetail.inr.returns;
      const oldReturns = state.token[idx].inr.returns;
      const diff = Math.abs(Math.abs(newReturns) - Math.abs(oldReturns));
      if (newReturns > oldReturns)
        newTotalReturns = state.inr.totalPortAmount + diff;
      else newTotalReturns = state.inr.totalPortAmount - diff;

      state.token[idx] = newCoinDetail;
      return {
        ...state,
        token: state.token,
        inr: {
          ...state.inr,
          totalPortAmount: newTotalReturns,
          totalPortPercent: (newTotalReturns / state.inr.totalInvestment) * 100,
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
      const inr = state.inr;
      const newPort = inr.totalInvestment - coin.inr.cap;
      const newPortReturns = inr.totalPortAmount - coin.inr.returns;
      const newPortPercent = (newPortReturns / newPort) * 100;
      state.token.splice(index, 1);
      return {
        ...state,
        token: state.token,
        counter: state.counter - 1,
        inr: {
          ...state.inr,
          totalInvestment: newPort,
          totalPortAmount: newPortReturns,
          totalPortPercent: newPortPercent,
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
        priceData: {},
      };

    default:
      return state;
  }
};

export default portReducer;
