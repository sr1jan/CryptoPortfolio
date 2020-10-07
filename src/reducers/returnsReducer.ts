import {returns_state, returnsActionTypes, addReturnsType} from '../types';

const InitialState: returns_state = {
  inr: {
    returns: [],
  },
  usdt: {
    returns: [],
  },
  time: [],
};

const returnsReducer = (
  state: returns_state = InitialState,
  action: returnsActionTypes,
): returns_state => {
  switch (action.type) {
    case 'ADD_RETURNS':
      const {value, time} = <addReturnsType>action;
      return {
        ...state,
        time: state.time.concat(time),
        inr: {
          returns: state.inr.returns.concat(value.inr),
        },
        usdt: {
          returns: state.usdt.returns.concat(value.usdt),
        },
      };

    case 'DELETE_RETURNS':
      return {
        time: [],
        inr: {
          returns: [],
        },
        usdt: {
          returns: [],
        },
      };

    default:
      return state;
  }
};

export default returnsReducer;
