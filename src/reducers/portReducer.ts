import {
  ADD_COIN,
  UPDATE_PRICES,
  CLEAR_PORT,
  ADD_PRICE_DATA,
  LOAD_DATA,
} from '../actions/types';
import {
  port_state,
  addPriceDataType,
  actionTypes,
  addCoinType,
  updatePriceType,
  token_prop,
  loadDataType,
  totalPort,
} from '../types';
import {currencyConversion} from '../helpers/currency';

const InitialState: port_state = {
  counter: 0,
  token: [],
  priceData: {},
  currency: 'inr',
  inr: {
    totalInvestment: 0,
    totalPortAmount: 0,
    totalPortPercent: 0,
  },
};

const portReducer = (
  state: port_state = InitialState,
  action: actionTypes,
): port_state => {
  switch (action.type) {
    case LOAD_DATA:
      const {coinDetailList, storedCounter, portData, marketData} = <
        loadDataType
      >action;
      return {
        ...state,
        token: state.token.concat(coinDetailList),
        counter: storedCounter,
        inr: portData,
        priceData: marketData,
      };
    case ADD_COIN:
      const {coinDetail, counter} = <addCoinType>action;
      const port = {cap: 0, returns: 0};
      if (coinDetail.market === 'inr') {
        port.cap = coinDetail.boughtVal;
        port.returns = coinDetail.returns;
      } else if (coinDetail.market === 'usdt') {
        port.cap = currencyConversion(
          coinDetail.boughtVal,
          'usdt',
          'inr',
          state.priceData,
        );
        port.returns = currencyConversion(
          coinDetail.returns,
          'usdt',
          'inr',
          state.priceData,
        );
      }
      return {
        ...state,
        token: state.token.concat(coinDetail),
        counter: counter,
        inr: {
          ...state.inr,
          totalInvestment: state.inr.totalInvestment + port.cap,
          totalPortAmount: state.inr.totalPortAmount + port.returns,
          totalPortPercent:
            ((state.inr.totalPortAmount + port.returns) /
              (state.inr.totalInvestment + port.cap)) *
            100,
        },
      };
    case UPDATE_PRICES:
      const {newCoinDetail, idx} = <updatePriceType>action;
      let newTotalReturns: number;
      const newReturns = newCoinDetail.returns;
      const oldReturns = state.token[idx].returns;
      const diff = Math.abs(Math.abs(newReturns) - Math.abs(oldReturns));
      if (newReturns > oldReturns) {
        if (newCoinDetail.market === 'inr') {
          newTotalReturns = state.inr.totalPortAmount + diff;
        } else if (newCoinDetail.market === 'usdt') {
          newTotalReturns =
            state.inr.totalPortAmount +
            currencyConversion(diff, 'usdt', 'inr', state.priceData);
        }
      } else {
        if (newCoinDetail.market === 'inr') {
          newTotalReturns = state.inr.totalPortAmount - diff;
        } else if (newCoinDetail.market === 'usdt') {
          newTotalReturns =
            state.inr.totalPortAmount -
            currencyConversion(diff, 'usdt', 'inr', state.priceData);
        }
      }
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
    case ADD_PRICE_DATA:
      const {data} = <addPriceDataType>action;
      return {
        ...state,
        priceData: data,
      };
    case CLEAR_PORT:
      const tokensEmpty: token_prop[] = [];
      const totalPortEmpty: totalPort = {
        totalInvestment: 0,
        totalPortAmount: 0,
        totalPortPercent: 0,
      };
      return {
        token: tokensEmpty,
        counter: 0,
        inr: totalPortEmpty,
        priceData: {},
        currency: '',
      };
    default:
      return state;
  }
};

export default portReducer;
