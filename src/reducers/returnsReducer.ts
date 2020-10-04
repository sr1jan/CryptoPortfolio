import {returns_state, returnsActionTypes, addReturnsType} from '../types';

const InitialState: returns_state = {
  inr: {
    returns: [],
    time: [],
  },
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
        inr: {
          ...state.inr,
          returns: state.inr.returns.concat(value),
          time: state.inr.time.concat(time),
        },
      };

    case 'DELETE_RETURNS':
      return {
        inr: {
          returns: [],
          time: [],
        },
      };

    default:
      return state;
  }
};

export default returnsReducer;
