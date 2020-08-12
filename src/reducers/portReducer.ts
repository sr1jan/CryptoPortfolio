import {ADD_COIN, UPDATE_PRICES, CLEAR_PORT} from '../actions/types';
import {
  port_state,
  actionTypes,
  addCoinType,
  updatePriceType,
  token_prop,
} from '../types';

const InitialState: port_state = {
  token: [],
  counter: 0,
};

const portReducer = (
  state: port_state = InitialState,
  action: actionTypes,
): port_state => {
  switch (action.type) {
    case ADD_COIN:
      const {coinDetailList, counter} = <addCoinType>action;
      return {
        ...state,
        token: state.token.concat(coinDetailList),
        counter: counter,
      };
    case UPDATE_PRICES:
      const {coinDetail, idx} = <updatePriceType>action;
      state.token[idx] = coinDetail;
      return {
        ...state,
        token: state.token,
      };
    case CLEAR_PORT:
      const empty: token_prop[] = [];
      return {
        token: empty,
        counter: 0,
      };
    default:
      return state;
  }
};

export default portReducer;
